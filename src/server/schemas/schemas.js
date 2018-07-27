import mongoose, { Schema } from 'mongoose';

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

const userSchema = new Schema({
  common_info: Schema.Types.Mixed,
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    default: ''
  },
  passwordResetToken: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  stripe_account: {
    type: String,
    default: ''
  },
  plan: {
    type: String,
    default: ''
  },
  subscription: {
    type: String,
    default: ''
  }
}, { timestamps: true });

userSchema.set('toObject', { getters: true });
userSchema.set('toJSON', { getters: true });

export const User = mongoose.model('Users', userSchema);
