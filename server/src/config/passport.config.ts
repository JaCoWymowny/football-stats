import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { prisma } from '../db/prisma';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload: { id: number }, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: jwtPayload.id } });
      return done(null, user || false);
    } catch (error) {
      console.error('Error finding user:', error);
      return done(error, false);
    }
  })
);

export default passport;
