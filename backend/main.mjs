import express, { Router } from 'express';
import session from 'express-session';

const app = express();

app.use(session());

const oauthRouter = Router();

oauthRouter.post(
  '/login/google',
  (req, res) => {
    req.log.info('Received login');
    return res.redirect('/');
  }
);

app.use(oauthRouter);
