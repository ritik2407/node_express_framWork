import { Request, Response } from 'express';

class WebController {
    public showLoginPage(req: Request, res: Response): void {
        const token = req.cookies['sessionToken'];

        if (token) {
            res.redirect('/');
        } else {
            // res.sendFile('login.html', { root: './views' });
            res.render('home',)
        }
    }

    public showRegisterPage(req: Request, res: Response): void {
        const token = req.cookies['sessionToken'];

        if (token) {
            res.redirect('/');
        } else {
            res.sendFile('register.html', { root: './views' });
        }
    }

    public showHomePage(req: Request, res: Response): void {
        const token = req.cookies['sessionToken'];

        if (token) {
            res.sendFile('home.html', { root: './views' });
        } else {
            res.redirect('/login');
        }
    }
}

export const webController = new WebController();
