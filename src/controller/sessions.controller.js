import { procesaErrores } from "../utils/utils.js";
import jwt from "jsonwebtoken";

export class SessionsController{
    static async index(req, res){
        try {
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
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async register(req, res){
        try {
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({message: `Registro exitoso`, nuevoUsuario: req.user});
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async login(req, res){
        try {
            let token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: "1h" })
    
            res.cookie("currentUser", token, { httpOnly: true, signed: true });
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({
                usuarioLogueado: req.user
            });
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async logout(req, res){
        try {
            if(req.signedCookies.currentUser){
                res.clearCookie('currentUser')
            }
            return res.status(200).redirect('/login?loggedout=1');
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async current(req, res){
        try {
            return res.status(200).json(req.user)
        } catch (error) {
            procesaErrores(res, error)
        }
    }

    static async error(req, res){
        try {
            let {type} = req.query;
            res.setHeader('Content-Type','application/json');
            if(type == "auth"){
                return res.status(401).json({error: "Error de autorización."});
            } else if(type == "register"){
                return res.status(400).json({error: "Error al registrarse, revise los datos ingresados."});
            } else if(type == "login"){
                return res.status(400).json({error: "Error al loguearse, revise los datos ingresados."});
            } else {
                return res.status(400).json({error: "Error: Intente nuevamente."})
            }
        } catch (error) {
            procesaErrores(res, error)
        }
    }
}