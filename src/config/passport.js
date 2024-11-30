const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const oauthConfig = require('./oauth');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: oauthConfig.google.clientID,
    clientSecret: oauthConfig.google.clientSecret,
    callbackURL: oauthConfig.google.callbackURL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { googleId: profile.id },
                    { email: profile.emails[0].value }
                ]
            }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    googleId: profile.id,
                    avatar: profile.photos[0]?.value
                }
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.use(new GitHubStrategy({
    clientID: oauthConfig.github.clientID,
    clientSecret: oauthConfig.github.clientSecret,
    callbackURL: oauthConfig.github.callbackURL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { githubId: profile.id },
                    { email: profile.emails?.[0]?.value }
                ]
            }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
                    name: profile.displayName || profile.username,
                    githubId: profile.id.toString(),
                    avatar: profile.photos[0]?.value
                }
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));
