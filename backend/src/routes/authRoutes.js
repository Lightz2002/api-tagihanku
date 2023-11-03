const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = require('../../app');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('../models/user');
const FederatedCredential = require('../models/federatedCredential');
const { connectionURI } = require('../util/db');

console.log(connectionURI);

// eslint-disable-next-line new-cap
const router = express.Router();
const MongoStore = require('connect-mongo');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.API_URL + '/oauth2/redirect/google',
      scope: ['profile'],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const cred = await FederatedCredential.findOne({
          provider: 'https://accounts.google.com',
          subject: profile.id,
        });

        if (!cred) {
          // Create a new user record and associate it with the Google account
          const newUser = new User({
            id: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          });
          await newUser.save();

          const newCred = new FederatedCredential({
            user: newUser,
            provider: 'https://accounts.google.com',
            subject: profile.id,
          });

          await newCred.save();

          return done(null, newUser);
        } else {
          // The account at Google has previously logged in to the app.
          // Get the user record associated with the Google account and log the user in.
          const user = await User.findById(cred.user);

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        }
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findOne({ id: id });
    if (user) {
      done(null, user);
    } else {
      done(null, false); // Handle the case when the user is not found
    }
  } catch (err) {
    done(err, null); // Handle any errors that occur during deserialization
  }
});

/* passport setup */
// app.use(cookieParser());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: connectionURI,
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.get('/login/google', passport.authenticate('google'));
app.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successRedirect: '/authenticated',
    failureRedirect: '/unauthenticated',
    failureMessage: true,
  }),
);

app.get('/unauthenticated', (req, res) => {
  res.json({ message: 'You are unauthenticated' });
});

app.get('/authenticated', (req, res) => {
  res.json({ message: 'You are authenticated' });
});

module.exports = router;
