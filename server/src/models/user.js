import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

// Define the model
const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  password: String,
  ethAddr: {
    type: String,
    unique: true,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
userSchema.methods.delete(function(cb) {
  if (this.isDeleted == true) {
    userSchema.remove({ username: this.username }, cb);
  } else {
    return cb(err);
  }
});

userSchema.methods.verifyEmail(function() {
  this.emailVerified = true;
});
userSchema.methods.getAddr(function(addr)
{
    this.ethAddr=addr;
});

userSchema.pre("save", function(next) {
  // get access to user model, then we can use user.email, user.password
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// Make use of methods for comparedPassword
userSchema.methods.comparedPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, good) {
    if (err) {
      return cb(err);
    }
    cb(null, good);
  });
};

// Export the model
export default mongoose.model("User", userSchema);
