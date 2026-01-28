import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {

    // let {user, password} = req.query

    // if(user!="admin" && password!="1234"){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(401).json({error:`Auth failed`})
    // }

    // if(!req.user){
    //     return res.status(401).render(
    //         'error',
    //         {
    //             style: 'index.css'
    //         }
    //     )
    // }

    // if(!req.headers.authorization){
    if(!req.cookies.CookieToken){
    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Error de autenticación`});
    }

    // let token = req.headers.authorization.split(" ")[1];
    let token = req.cookies.CookieToken;
    
    try {
        let usuario = jwt.verify(token, process.env.JWT_SECRET);
        console.log(usuario);
        req.user = usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Auntenticación fallida`})
    }

    next()
}