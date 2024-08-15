import {Request, Response} from 'express';
import {AppDataSource} from '../data-source';
import {encryptpass, comparepassword, generateToken} from '../helpers/helper';
import User, {UserResponse} from '../models/User';

export async function login(req: Request, res: Response) {
  try {
    const {email, password} = req.body as unknown as {
      email: string;
      password: string;
    };
    if (!email || !password) {
      return res.status(500).json({message: 'Email and password required'});
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where: {email}});

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    const isPasswordValid = comparepassword(user.password, password);
    if (!user || !isPasswordValid) {
      return res.status(404).json({message: 'User not found'});
    }
    const token = generateToken({id: user.id});

    return res.status(200).json({message: 'success', user, token});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal server error'});
  }
}

export async function signup(req: Request, res: Response) {
  const {name, email, password} = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const hasUser = await userRepository.findOne({where: {email}});
  if (hasUser) {
    console.log('user found', hasUser);
    return res.status(500).json({message: 'User already exist'});
  }
  const encryptedPassword = await encryptpass(password);
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = encryptedPassword;
  user.role = 'user';

  await userRepository.save(user);
  
  const userDataSent = new UserResponse();
  userDataSent.name = user.name;
  userDataSent.email = user.email;
  userDataSent.role = user.role;

  const token = generateToken({id: user.id});

  return res.status(200).json({message: 'success', token, userDataSent});
}
