import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validatePasswordChange } from '../helpers/validationHelper';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
const TOKEN_EXPIRATION = '1h';
const REFRESH_TOKEN_EXPIRATION = '7d';

const generateToken = (user: { id: number; username: string }) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
};

const generateRefreshToken = (user: { id: number; username: string }) => {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};

export async function httpRegisterUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({ message: 'Nazwa użytkownika, hasło oraz email są wymagane.' });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      res.status(400).json({
        fields: {
          ...(existingUser.username === username && {
            username: 'Nazwa użytkownika już istnieje.',
          }),
          ...(existingUser.email === email && { email: 'Email już istnieje.' }),
        },
        message: 'Wystąpiły błędy walidacyjne.',
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role: 'user',
      },
    });

    const token = generateToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.status(201).json({
      message: 'Rejestracja zakończona sukcesem.',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Błąd podczas tworzenia użytkownika:', error);
    res
      .status(500)
      .json({ message: 'Wystąpił błąd serwera podczas rejestracji. Spróbuj ponownie później.' });
  }
}

export async function httpLoginUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Nazwa użytkownika i hasło są wymagane.' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(401).json({
        fields: { username: 'Nieprawidłowa nazwa użytkownika lub hasło.' },
        message: 'Nieprawidłowa nazwa użytkownika lub hasło.',
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        fields: { password: 'Nieprawidłowa nazwa użytkownika lub hasło.' },
        message: 'Nieprawidłowa nazwa użytkownika lub hasło.',
      });
      return;
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: 'Logowanie zakończone sukcesem.',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Błąd podczas logowania:', error);
    res
      .status(500)
      .json({ message: 'Wystąpił błąd serwera podczas logowania. Spróbuj ponownie później.' });
  }
}

export async function httpRefreshToken(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: 'Token odświeżenia jest wymagany.' });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as { id: number; username: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.status(403).json({ message: 'Nieprawidłowy token odświeżenia.' });
      return;
    }

    const newAccessToken = generateToken(user);

    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error('Błąd podczas odświeżania tokena:', error);
    res.status(403).json({ message: 'Token odświeżenia jest nieprawidłowy lub wygasł.' });
  }
}

export async function httpGetUserById(req: Request, res: Response): Promise<void> {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ message: 'ID użytkownika jest nieprawidłowe.' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: 'Nie znaleziono użytkownika.' });
      return;
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Błąd podczas pobierania użytkownika:', error);
    res
      .status(500)
      .json({ message: 'Wystąpił błąd serwera podczas pobierania danych użytkownika.' });
  }
}

export async function httpGetAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Database connection error' });
  }
}

export async function httpGetCurrentUser(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Database connection error' });
  }
}

export async function httpUpdateUserEmail(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: 'Użytkownik nie jest uwierzytelniony.' });
      return;
    }
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Email jest wymagany.' });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        message: 'Podany email jest już zajęty.',
        fields: { email: 'Podany email jest już zajęty.' },
      });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { email },
    });

    res.status(200).json({ message: 'Email został zaktualizowany pomyślnie.' });
  } catch (error) {
    console.error('Błąd podczas aktualizacji emaila:', error);
    res.status(500).json({ message: 'Wystąpił błąd serwera podczas aktualizacji emaila.' });
  }
}

export async function httpUpdateUserPassword(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: 'Użytkownik nie jest uwierzytelniony.' });
      return;
    }
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        message: 'Obecne hasło i nowe hasło są wymagane.',
        fields: {
          ...(currentPassword ? {} : { currentPassword: 'Obecne hasło jest wymagane.' }),
          ...(newPassword ? {} : { newPassword: 'Nowe hasło jest wymagane.' }),
        },
      });
      return;
    }

    const validationError = validatePasswordChange({ currentPassword, newPassword });
    if (validationError) {
      res.status(400).json({
        message: validationError,
        fields: { newPassword: validationError },
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      res.status(403).json({
        message: 'Obecne hasło jest nieprawidłowe.',
        fields: { currentPassword: 'Obecne hasło jest nieprawidłowe.' },
      });
      return;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({ message: 'Hasło zostało zaktualizowane pomyślnie.' });
  } catch (error) {
    console.error('Błąd podczas aktualizacji hasła:', error);
    res.status(500).json({ message: 'Wystąpił błąd serwera podczas aktualizacji hasła.' });
  }
}
