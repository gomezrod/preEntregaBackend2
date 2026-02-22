import { Router } from "express"
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { SessionsController } from "../controller/sessions.controller.js";

export const router=Router()

router.use(cookieParser(process.env.COOKIES_SECRET))

router.get('/', SessionsController.index);
router.post(
    '/register',
    passport.authenticate("registro", {session: false, failureRedirect: "/api/sessions/error?type=register"}),
    SessionsController.register
);
router.post(
    '/login',
    passport.authenticate("login", {session: false, failureRedirect: "/api/sessions/error?type=login"}),
    SessionsController.login
);
router.get('/logout', SessionsController.logout);
router.get(
    '/current',
    passport.authenticate("current", {session: false, failureRedirect: '/api/sessions/error?type=auth' }),
    SessionsController.current
);
router.get("/error", SessionsController.error)

export default router