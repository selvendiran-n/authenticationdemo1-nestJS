import { IsDefined, IsEmail, Matches } from 'class-validator';

export class RegisterDto {
  @IsDefined({ message: 'fullName is required' })
  fullName: string;

  @IsDefined({ message: 'number is required' })
  @Matches(/^\d{10}$/, { message: 'number must be a 10-digit number' })
  number: string;

  @IsDefined({ message: 'email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsDefined({ message: 'password is required' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, {
    message: 'Password must be at least 8 characters, include uppercase, lowercase, and a special character',
  })
  password: string;

  @IsDefined({ message: 'confirmPassword is required' })
  confirmPassword: string;
}
