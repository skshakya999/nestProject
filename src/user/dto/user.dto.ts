import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreateUserDto {
   @IsNotEmpty()
   name: string;
   @IsNotEmpty()
   @IsString()
   @IsEmail()
   email: string;
   password:string;
   @IsNotEmpty()
   dist: string
   @IsNotEmpty()
   state: string
   @IsNotEmpty()
   pincode: number
   @IsNotEmpty()
   mobile: string;

}