import { Router } from "express"
import cookieParser from 'cookie-parser';
import passport from 'passport';
import jwt from "jsonwebtoken";

export const router=Router()

router.use(cookieParser(process.env.COOKIES_SECRET))

router.get('/', (req, res) => {
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({
        payload: {
            title: 'Sessions API endpoint',
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
                },
                {
                    route: '/current',
                    method: 'GET',
                    description: `Endpoint que devuelve los datos del usuario logueado.`
                }
            ]
        }
    });
})


router.post(
    '/register',
    passport.authenticate("registro", {session: false, failureRedirect: "/api/sessions/error?type=register"}),
    (req, res) => {
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message: `Registro exitoso`, nuevoUsuario: req.user});
    }
)

router.post(
    '/login',
    passport.authenticate("login", {session: false, failureRedirect: "/api/sessions/error?type=login"}),
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
    
    if(req.signedCookies.currentUser){
        res.clearCookie('currentUser')
    }
    
    return res.status(200).redirect('/login?loggedout=1');
});

router.get('/current', passport.authenticate("current", {session: false, failureRedirect: '/api/sessions/error?type=auth' }), (req,res)=>{
    return res.status(200).json(req.user)
});

router.get("/error", (req, res) => {
    let {type} = req.query;
    res.setHeader('Content-Type','application/json');
    if(type == "auth"){
        return res.status(401).json({error: "Error de autorización."});
    } else if(type == "register"){
        return res.status(400).json({error: "Error al registrarse, revise elementos del body."});
    } else if(type == "login"){
         return res.status(400).json({error: "Error al loguearse, revise elementos del body."});
    } else {
        return res.status(400).json({error: "Error: Intente nuevamente."})
    }
    
})

export default router