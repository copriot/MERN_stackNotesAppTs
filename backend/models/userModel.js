const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");
const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signupUser = async function (email, password) {
  if (!email || !password) {
    throw Error("Fields cannot be empty!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email isnt suitable");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password isnt strong enough!");
  }

  const controlUser = await this.findOne({ email });
  if (controlUser) {
    throw Error("Email alredy used");
  }

  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: saltedPassword });
  return user;
};

userSchema.statics.loginUser = async function (email, password) {
  if (!email || !password) {
    throw new Error("Fields can not be empty!");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email could not find");
  }
  const passwordControl = await bcrypt.compare(password, user.password);

  if (!passwordControl) {
    throw Error("Wrong password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
