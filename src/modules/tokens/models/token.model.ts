import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
