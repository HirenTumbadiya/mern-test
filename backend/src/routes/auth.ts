import { Router, Request, Response } from 'express';
import { loginUser, registerUser } from '../controllers/authController';

const router = Router();

router.post('/register', (req: Request, res: Response) => {
  registerUser(req, res);
});
router.post('/login', (req: Request, res: Response) => {
  loginUser(req, res);
});

export default router;
