const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter name'],
    trim: true,
    minLength: [5, 'Name must be minimum og 5 characters'],
    maxLength: [24, 'Name must be less than 25 character'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, 'Please provide valid email'],
  },
  employeeID: {
    type: String,
    required: true,
    unique: true,
  },
  employeeType: {
    type: String,
    required: [true, 'Please Enter Employee Type'],
    lowerCase: true,
  },
  employeeDOB: {
    //*Date ko format YYYY/MM/DD
    type: Date,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'manager'],
    default: 'user',
    lowerCase: true,
  },
  department: {
    type: String,
    required: [true, 'Please Provide Employee Department.'],
    lowerCase: true,
  },
  joiningDate: {
    type: Date,
    requred: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    unique: false,
    required: [true, 'Please confirm your password'],
    validate: {
      //works only on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    console.log(this.passwordChangedAt, JWTTimeStamp);
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  console.log({ resetToken });
  console.log('passwordResetToken', this.passwordResetToken);

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
