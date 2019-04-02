import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import config from './config';
import middleware from './middleware';

class HandleGenerator {
  login(req, res) {
    const { username, password } = req.body;
    const [mockusername, mockpassword] = ['admin', 'admin'];
    if (username && password) {
      if (username === mockusername && password === mockpassword) {
        const token = jwt.sign({ username }, config.secret, {
          expiresIn: '24h',
        });
        res.json({
          success: true,
          message: 'Authentication successful',
          token,
        });
      } else {
        res.send(401).json({
          success: false,
          message: 'Incorect username or password',
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Bad request',
      });
    }
  }

  index(req, res) {
    res.json({
      success: true,
      message: 'index',
    });
  }
}

function main() {
  const app = express();
  const handlers = new HandleGenerator();
  const port = process.env.PORT || 8000;
  app.use(morgan('tiny'));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.post('/login', handlers.login);
  app.get('/', middleware.checkToken, handlers.index);
  app.listen(port, () => console.log(`app is running on port ${port}...`));
}

main();
