import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.repository';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  async registerUser(registerDto: RegisterDto) {
    // Destructure values from DTO
    const { fullName, number, email, password, confirmPassword } = registerDto;

    // 1. Validate password match
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // 2. Check if user exists
    const existingUser = await this.authRepo.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists with this email');
    }

    // 3. Hash and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.authRepo.createUser(fullName, number, email, hashedPassword);

    return { message: 'Registration successful' };
  }

  async loginUser(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // 1. Find user by email
    const user = await this.authRepo.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    // 2. Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    // 3. Return login response
    return {
      message: 'Login successful',
      status: 'success',
    };
  }
}