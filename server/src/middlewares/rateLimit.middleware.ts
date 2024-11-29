import rateLimit from 'express-rate-limit';
import { Request } from 'express';
import { User } from '@prisma/client'; // Import typu User, aby go wykorzystać do rzutowania

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  keyGenerator: (req: Request) => {
    const user = req.user as User;

    if (!user || !user.id) {
      throw new Error('Użytkownik nie jest zalogowany, a middleware limiter został wywołany.');
    }

    return user.id.toString();
  },
  message: {
    message: 'Przekroczono limit zapytań. Spróbuj ponownie później.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
