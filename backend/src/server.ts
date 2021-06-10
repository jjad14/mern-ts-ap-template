import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

dotenv.config();

const app = express();

mongoose.connect(
  `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to mongoose successfully');
  }
);

// middleware
app.use(express.json());

// Cross Origin Resource
app.use(
  cors({
    origin: 'https://gallant-hodgkin-fb9c52.netlify.app',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_CODE,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(4000, () => {
  console.log('Server Started');
});
