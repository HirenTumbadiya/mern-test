// authController.ts
import { Request, Response } from 'express';
import { getDbClient } from '../db/db'
import { sendRegistrationEmail } from '../utils/mailer';

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  const client = getDbClient();

  try {
    const checkEmailQuery = 'SELECT * FROM users WHERE email = $1';
    const checkEmailResult = await client.query(checkEmailQuery, [email]);

    if (checkEmailResult.rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const query = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5)';
    const values = [firstName, lastName, email, password, role];

    await client.query(query, values);

    await sendRegistrationEmail(email, firstName, lastName);

    // console.log('User registered:', { firstName, lastName, email, role });

    return res.status(200).json({
      message: 'Registration successful',
      user: { firstName, lastName, email, role },
    });
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const client = getDbClient();

  try {
    const query = 'SELECT * FROM users WHERE email = $1 AND role = $2';
    const result = await client.query(query, [email, role]);

    // console.log('Login attempt:', { email, role });
    // console.log('Query result:', result);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email, password or role' });
    }

    const user = result.rows[0];

    // In production, use bcrypt to compare hashed passwords
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email, password or role' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Error logging in user:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
};

