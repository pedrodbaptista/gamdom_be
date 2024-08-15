import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();
const {JWT_SECRET} = process.env;

export async function encryptpass(password: string) {
  return bcrypt.hashSync(password, 12);
}
export function comparepassword(hashPassword: string, password: string) {
  return bcrypt.compareSync(password, hashPassword);
}

//@ts-ignore
export function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
}
