import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({unique:true})
  name: string;

  @Prop()
  email: string;

  @Prop()
  mobile:string;

  @Prop()
  prifilePic:string;
}

export const UserSchema = SchemaFactory.createForClass(User);