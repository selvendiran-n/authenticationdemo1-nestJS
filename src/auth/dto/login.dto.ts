import { IsDefined, IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsDefined({ message: 'email is required' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: 'email must match a valid email format',
  })
  email: string;

  
  @IsDefined({ message: 'password is required' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, {
    message:
      'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one special character',
  })
  password: string;
}

export class LoginResponseDto {
  message: string;
  status:string
}
