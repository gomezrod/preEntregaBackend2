import { Router } from "express"
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import jwt from "jsonwebtoken";   

export const router=Router()

router.use(cookieParser(process.env.COOKIES_SECRET))
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        dbName: process.env.DB_NAME,
        ttl: 60*10,
        collectionName: "sessions"
    })
}))

router.get('/', (req, res) => {
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({
        payload: {
            title: 'Users Service API endpoint',
            description: 'En este endpoint se encontrarán los métodos necesarios para registrar, loguear y desloguear usuarios',
            endpoints: [
                {
                    route: '/register',
                    method: 'POST',
                    description: `Endpoint que permite registrar usuarios, recibe los siguientes elementos desde body: first_name, last_name, email, role(opcional, por default 'user'), password.`
                },
                {
                    route: '/login',
                    method: 'POST',
                    description: `Endpoint que permite loguear usuarios, recibe los siguientes elementos desde body: email, password.`
                },
                {
                    route: '/logout',
                    method: 'GET',
                    description: `Endpoint que permite desloguear usuarios.`
                }
            ]
        }
    });
})


router.post(
    '/register',
    passport.authenticate("registro", {failureRedirect: "/api/users/error", failureMessage: true}),
    (req, res) => {
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message: `Registro exitoso`, nuevoUsuario: req.user});
    }
)

router.post(
    '/login',
    passport.authenticate("login", {failureRedirect: "/api/users/error", failureMessage: true}),
    (req, res) => {
        let token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.cookie("currentUser", token, { httpOnly: true, signed: true });
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({
            usuarioLogueado: req.user
        });
    }
)

router.get('/logout', (req,res)=>{
    
    if(req.cookies.cookieToken){
        res.clearCookie('cookieToken')
    }
    req.session.destroy(error=>{
        if(error){
            console.log(error);
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
        }
    })
    res.status(200).render(
        'login',
        {
            message: 'Logout exitoso',
            style: 'index.css'
        }
    );
});

router.get("/error", (req, res) => {
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error: req.session.messages})
})

export default router