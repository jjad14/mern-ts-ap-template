import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import User from './User';
import { IMongoDBUser } from './types';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

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

/*
  In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

  Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.

  Serialize and deserialize are complex topics, where we are literally creating a serialization of information in a session.

  Serialize user is taking the entire user object we get from the authentication method, and storing it into a session (via cookie).
*/
passport.serializeUser((user: IMongoDBUser, done: any) => {
  return done(null, user._id);
});

/*
  The deserialize user is taking the entire user object from the session and attaching it to the req.user object, which we can access.

  This is bad practice, we only want to store a user ID in a session.
*/
passport.deserializeUser((id: string, done: any) => {
  User.findById(id, (err: Error, doc: IMongoDBUser) => {
    // Whatever we return goes to the client and binds to the req.user property
    return done(null, doc);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    // called on a successful authentication
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      // insert into database
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });

      /* 
    Whenever you use the callback in passport, in this case its "cb()", it tells passport to move on and go to the next step. We pass this callback some params for the next step as well
    */
      console.log(profile);
      cb(null, profile);
    }
  )
);

// { scope: ['profile'] } is to specify how much data to give to the person to give to the backend
// profile == basic profile info
/*
  The sessionID is stored into a cookie, so if we make requests to the backend with our client, they can see our session ID, and get our information, from the session and run the deserialize user function
*/
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

// whether authentication succeded or failed determines the redirect
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/getuser', (req, res) => {
  res.send(req.user);
});

app.get('/auth/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send('done');
  }
});

app.listen(4000, () => {
  console.log('Server Started');
});
