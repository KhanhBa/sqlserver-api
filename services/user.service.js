const userRepo = require('../repositories/user.repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.getUserWithMusics = async(userId) => {
  const user = await userRepo.findUserWithMusics(userId);
  return user;
}
exports.CreateMusic = async(music) => {
  const user = await userRepo.GetUserById(music.userId);
  if(!user) throw new Error("User not found");
  const result = await userRepo.createMusic(music);
  return result;
}
exports.Login = async(LoginModel) => {
  const user = await userRepo.Login(LoginModel);
  if(!user) throw new Error("Login fail");
  const key = process.env.JWT_SECRET_KEY;
   const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  const token = jwt.sign(payload, key, {
    expiresIn: '1h' 
  });

  return {
    message: "Login successful",
    token: token,
    user: {
      id: user.id,
      username: user.username,
      Avatar: user.Avatar
    }
  };
}