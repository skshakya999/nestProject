import { IsNotEmpty, IsPhoneNumber} from "class-validator"

export class UpdateUserDto {
   
    @IsNotEmpty()
    @IsPhoneNumber("IN")
    mobile: string;
    @IsNotEmpty()
    @IsPhoneNumber("IN")
    newMobile: string;
    
 }