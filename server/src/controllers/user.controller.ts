import { Request, Response } from 'express';
import { PrismaClient, User } from '@prisma/client';
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
      res.status(400).json({ message: 'Username, password, and email are required' });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      const message =
        existingUser.username === username ? 'Username already exists' : 'Email already exists';
      res.status(400).json({ message });
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
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function httpLoginUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function httpRefreshToken(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: 'Refresh token is required' });
    return;
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as { id: number; username: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.status(403).json({ message: 'Invalid refresh token' });
      return;
    }

    const newAccessToken = generateToken(user);

    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
}

export async function httpGetUserById(req: Request, res: Response): Promise<void> {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

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
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function httpGetAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function httpGetCurrentUser(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user as User;

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
    res.status(500).json({ message: 'Server error' });
  }
}

export async function httpUpdateUserEmail(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user as User;
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Email is already taken' });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { email },
    });

    res.status(200).json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function httpUpdateUserPassword(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user as User;
    const { currentPassword, newPassword } = req.body;

    const validationError = validatePasswordChange({ currentPassword, newPassword });
    if (validationError) {
      res.status(400).json({ message: validationError });
      return;
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      res.status(403).json({ message: 'Incorrect current password' });
      return;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
