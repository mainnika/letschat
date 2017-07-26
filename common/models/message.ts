/* tslint:disable:variable-name align:"arguments" */
'use strict';

import { Document, model, Model, Schema, Types } from 'mongoose';

interface IMessage extends Document {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
}

const MessageSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId },
});

// MessageSchema.index({ owner: 'text' });

const Message: Model<IMessage> = model<IMessage>('ChatMessage', MessageSchema, 'messages');

export { Message, IMessage };
