// app.js or server.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
// const dotenv = require('dotenv');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Your User model

// dotenv.config();

const app = express();

// // Session configuration
// app.use(session({
//   secret: 'your-session-secret',
//   resave: false,
//   saveUninitialized: true,
// }));

// // Passport configuration
// app.use(passport.initialize());
// app.use(passport.session());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create user in the database
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
    }
    done(null, user);
  } catch (err) {
    console.error(err);
    done(err, null);
  }
}));

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Routes for Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
}), (req, res) => {
  // Redirect or send token after successful login
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`https://kisan-green.vercel.app/login/?token=${token}`); // Redirect to frontend with JWT token
});

// Protected route example
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json({ message: 'Welcome to the dashboard' });
});
