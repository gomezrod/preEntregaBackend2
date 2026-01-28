import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const passportCall = strategy => {
    return function(req, res, next) {
        passport.authenticate(strategy, function(err, user, info, status){
            if(err) {return next(err)};
            if(!user) {
                return res.status(401).json({
                    error: info.message ? info.message : info.toString()
                })
            };
            req.user = user;
            next();
        }) (res, req, next);
    }
}

export class InputValidator{

    static validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
    }

    static validateName = (name) => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
    return nameRegex.test(name.trim());
    }

    static validatePassword = (password) => {
    // Largo mínimo 8 caracteres, al menos una mayúscula, al menos una minúscula, al menos un número, al menos un caracter especial (@$!%*?&)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
    }

}