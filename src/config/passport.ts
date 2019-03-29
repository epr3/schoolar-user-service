const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JWTStrategy(opts, async (jwt_payload: Object, done: Function) => {
    // const userObj = await user.findOne({
    //   where: { email: jwt_payload.context.email }
    // });
    const userObj = null;
    if (!userObj) done(null, false, { message: 'token is not valid' });
    done(null, userObj);
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email: string, password: string, done: Function) => {
      const userObj = null;
      if (!userObj)
        return done(null, false, {
          message: 'passwords do not match'
        });
      return done(null, userObj);
    }
  )
);

passport.serializeUser((user: Object, cb: Function) => {
  cb(null, user);
});

passport.deserializeUser((obj: Object, cb: Function) => {
  cb(null, obj);
});

export default passport;
