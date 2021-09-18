import { scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

class ManagePassword {
  static async toHash(password: string) {
    const buf = (await scryptAsync(
      password,
      process.env.SALT_KEY!,
      64
    )) as Buffer;

    return `${buf.toString('hex')}`;
  }

  static async match(storedPassword: string, suppliedPassword: string) {
    const buf = (await scryptAsync(
      suppliedPassword,
      process.env.SALT_KEY!,
      64
    )) as Buffer;

    return buf.toString('hex') === storedPassword;
  }
}

export { ManagePassword };
