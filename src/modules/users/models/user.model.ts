import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty()
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @ApiProperty()
  @Prop({ default: false })
  isActivated: boolean;

  @ApiProperty()
  @Prop({ unique: true })
  activationKey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.withoutPassword = (
  user: User,
): Omit<User, 'passwordHash'> => {
  const { passwordHash, ...rest } = user;
  return rest;
};
