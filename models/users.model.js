const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null, required: true },
  last_name: { type: String, default: null, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
  created_at: { type: Date, default: Date.now },
});

//signUp ---
const signUp = async (data) => {
  try {
    const { first_name, last_name, email, password } = data;
    const oldUser = await usersModel.findOne({ email });
    if (oldUser) {
      return { error: "User Is Exists. Please Login" };
    }
    // Encrypting Password
    const encryptedPassword = await bcrypt.hash(password, 15);

    const user = await usersModel.create({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      created_at: new Date(),
    });
    // construct token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN,
    );
    // save token
    user.token = token;
    // new user
    return user;
  } catch (error) {
    console.log("Couldn't Create a New User", error);
  }
}

//signIn ---
const signIn = async () => {
  try {
    const { email, password } = data;
    const user = await usersModel.findOne({ email });
    if (!user) {
      return { error: "Join us :)" };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return { error: "Error Username or Password: Please Check them :)" };
    }
    // costruct a token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN,
    );
    // save token
    user.token = token;
    // logging user
    return user;
  } catch (error) {
    console.log("Sign In Error", error);
  }
}

module.exports = { userSchema, signIn, signUp }
