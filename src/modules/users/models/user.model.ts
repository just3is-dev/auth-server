import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: false })
  isActivated: boolean;

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
