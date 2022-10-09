import express, { Router } from 'express';
import { default as bodyParser } from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import { firebaseSignIn } from './firebase.mjs';

const { PORT = 1008 } = process.env;

const app = express();

app.use(cors());
app.use(session({
  secret: 'thisisatest',
}));
app.use(bodyParser.text());

const oauthRouter = Router();

oauthRouter.post(
  '/login/google',
  async (req, res) => {
    console.log('received', req.body);
    const credential = await firebaseSignIn(req.body);
    return res.send(credential);
  }
);

app.use(oauthRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
