import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateUserDto {
   @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    mobile: string;
 }