import { IsDateString, IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly gender: string

  @IsDateString()
  @IsNotEmpty()
  readonly dateOfBirth: string

  @IsNotEmpty()
  readonly phoneNumber: string

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  userPassword: string
}
