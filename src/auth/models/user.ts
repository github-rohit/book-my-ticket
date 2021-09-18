import mongoose from 'mongoose';
import { ManagePassword } from '../services';

// An interface that describes the properties
// that are requried to create a new User
export interface UserAttrs {
  name: string;
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document, UserAttrs {}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 24
    }
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await ManagePassword.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
