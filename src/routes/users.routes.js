import { Router } from 'express';
import { initPassport } from '../config/config.passport.js';
import passport from 'passport';
 
const router = Router();

initPassport();
router.use(passport.initialize());

router.get('/', (req,res)=>{
    
    return res.status(200).render(
        'index',
        {
            title: 'Usuarios',
            style: 'index.css'
        }
    )
});

router.get('/register', (req,res)=>{
    
    return res.status(200).render(
        'register',
        {
            title: 'Regístrese',
            style: 'index.css'
        }
    );
});

router.get('/login', (req,res)=>{
    
    if(req.signedCookies.currentUser){
        return res.status(303).redirect('/users/current') //No estoy seguro si el número de status correcto para el caso es ese
    }

    return res.status(200).render(
        'login',
        {
            title: 'Login',
            style: 'index.css'
        }
    );
});

router.get('/current', passport.authenticate("current", {session: false, failureRedirect: '/users/error' }), (req,res)=>{
    const {nombre, email} = req.user
    return res.status(200).render(
        'datos',
        {
            style: 'index.css',
            nombre,
            email
        }
    )
});

router.get('/error', (req, res) => {
    res.status(401).render(
        'errorUnauthorized',
        {
            style: 'index.css'
        }
    )
})

export default router;