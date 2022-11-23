const { default: mongoose, Schema } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true,
    // minLength: 4,
    // maxLength: 16,
    // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, 'password mush have capital, special, and number']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: [true, 'role is required'],
  },
  refresh_token: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
