import express, { Router } from 'express';
import { default as bodyParser } from 'body-parser';
import session from 'express-session';
import cors from 'cors';
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
  (req, res) => {
    console.log('received', req.body);
    return res.send(req.body);
  }
);

app.use(oauthRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
