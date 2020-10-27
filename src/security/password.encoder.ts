import * as bcrypt from "bcrypt";

export class PasswordEncoder {
  static async cryptPassword(password): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static comparePassword(plainPass, hashword): Promise<boolean> {
    return bcrypt.compare(plainPass, hashword);
  }
}
