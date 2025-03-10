import { Schema, Document, model } from 'mongoose';
import { UserData } from '../../types/index.js';

export interface UserDocument extends UserData, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, 'Min length for name path is 1'],
    maxLength: [15, 'Max length for name path is 15'],
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  avatarUrl: String,
  password: {
    type: String,
    required: true,
    minlength: [6, 'Min length for name path is 6'],
    maxLength: [12, 'Max length for name path is 12'],
  },
  isPro: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);

