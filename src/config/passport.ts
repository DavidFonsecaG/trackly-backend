import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User from "../models/User";

passport.use(new LocalStrategy({
    usernameField: "email",
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user || !user.password) return done(null, false, { message: "Invalid credentials" });

        if (!bcrypt.compare(password, user.password)) return done(null, false, { message: " Invalid credentials" });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/auth/google/callback",
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0].value;
        console.log(profile);
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await User.create({
                email,
                name: profile.displayName,
                googleId: profile.id,
                picture: profile.photos?.[0].value,
            });
        }
        return done(null, user);

    } catch (err) {
        return done(err);
    }
}));