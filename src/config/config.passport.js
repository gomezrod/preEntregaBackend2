import passport from "passport";
import local from "passport-local";
import passportJWT from "passport-jwt"
import userDBManager from "../dao/userDBManager.js";
import { cartDBManager } from "../dao/cartDBManager.js";
import { createHash, validateHash } from "../utils/cryptoUtil.js";
import { InputValidator } from "../utils/utils.js";

const extractor = (req) => {
    let token = null;

    if(req.signedCookies.currentUser){
        token=req.signedCookies.currentUser
    }
    
    return token;
}

export const initPassport = () => {

    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([extractor])

        },
        async(usuario, done) =>{
            try {
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("registro", new local.Strategy(
        {
            usernameField: "email",
            //passwordField: "customPassword" default en 'password'
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                let email = username;
                let { first_name, last_name, role='user', age} = req.body

                if (!first_name || !last_name || !email || !age || !password) {
                    return done(null, false, {message: 'Nombre, Apellido, Edad, Email y Contraseña son requeridos'})
                }

                if (!InputValidator.validateName(first_name) || !InputValidator.validateName(last_name)) {
                    return done(null, false, {message: 'Por favor, ingrese un nombre y apellido válidos.'})
                }

                if (!InputValidator.validateEmail(email)) {
                    return done(null, false, {message: 'Por favor, ingrese una dirección de email válida.'})
                }

                if (!InputValidator.validatePassword(password)) {
                    return done(null, false, {message: 'La contraseña debe tener al menos 8 caracteres e incluir al menos una letra minúsula, una mayúscula, un número y un caracter especial (@$!%*?&).'})
                }

                let existe = await userDBManager.getBy({ email })

                if (existe) {
                    return done(null, false, {message: `Ya existe un usuario con el email ingresado (${email})`})
                }

                password = createHash(password)
                let cartId = (await cartDBManager.createCart())._id;
                
                let nuevoUsuario = await userDBManager.create({ first_name, last_name, email, role, age, cart: cartId, password })

                return done(null, nuevoUsuario);

            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField: "email",
        },
        async (username, password, done) => {
            try {
                let user = await userDBManager.getBy({ email: username });

                if (user && validateHash(password, user.password)) {
                    delete user.password;
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Credenciales Inválidas'})
                }
            } catch (error) {
                return done(error)
            }

        }
    ))

    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id);
    });
    passport.deserializeUser(async (id, done) => {
        let usuario = await userDBManager.getBy({ _id: id });
        return done(null, usuario);
    })
}