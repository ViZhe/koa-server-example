
import { Document, model, Schema } from 'mongoose';


interface IUserModel extends Document {
  createdAt: Date;
  email: string;
  password: string;
}

const userSchema:Schema = new Schema(
  {
    createdAt: {
      default: Date.now(),
      required: true,
      type: Date,
    },
    email: {
      index: true,
      lowercase: true,
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);


export default model<IUserModel>('User', userSchema);
