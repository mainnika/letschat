/* tslint:disable:variable-name align:"arguments" */
'use strict';

import { Document, model, Model, Schema, Types } from 'mongoose';

interface IUserDocument extends Document {
  _id: Types.ObjectId;
  nickname: string;
}

const UserSchema: Schema = new Schema({
  nickname: { type: Schema.Types.String },
});

UserSchema.index({ nickname: 'text' });

const User: Model<IUserDocument> = model<IUserDocument>('User', UserSchema, 'users');

export { User, IUserDocument };
