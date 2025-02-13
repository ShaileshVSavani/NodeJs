const userRepository = require('../repository/user')
const { hashPassword, generateToken, comparePassword, decodeToken } = require('../utils/helper')
const sendMail = require("../utils/mail");
const userDetailService = require("./userDetails");

let map = new Map();
exports.createUser = async (data) => {
  let user = await userRepository.getByEmail(data.email);
  if (user) {
    throw new Error("User already exists");
  }
  let hash = await hashPassword(data.password);
  data.password = hash;
  user = await userRepository.register(data);

  let token = await generateToken({
    email: user.email,
    id: user.id,
    role: user.role,
    name: user.name,
  });
  let otp = Math.round(Math.random() * 10000);
  map.set(token, otp);
  let url = `<div> <a href=http://localhost:8090/api/v1/users/verify/${token}/${otp} > Click To Verify </a> </div>`;
  await sendMail(user.email, "verify", url);
  console.log("Token:", token);
  console.log("User:", user);
  console.log("OTP'`:", otp);
  return token;
   // return { user, token }
  
};


exports.login = async (data) => { 
  let user = await userRepository.getByEmail(data.email);
  console.log("User from Service:", user);
  if (!user) {
      throw new Error('Invalid email');
  }
  // Note: The hashed password (from the database) should be the first argument.
  let isMatch = await comparePassword(user.password, data.password);
  if (!isMatch) {
      throw new Error('Invalid password');
  }
  let token = await generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
  });
console.log("Token from Service:" , token)
  return token;
}


exports.updateUser = async (id, data) => { 
    let user = await userRepository.getById(id)
    if (!user) {
        throw new Error('User not found')
    }
    user = await userRepository.updateById(id, data)
    return user
}

exports.deleteUser = async (id) => { 
    let user = await userRepository.getById(id)
    if (!user) {
        throw new Error('User not found')
    }
  user = await userRepository.deleteById(id)
  console.log("User deleted")
    return user
}

exports.getAllUsers = async () => { 
    let users = await userRepository.getAll()
    return users
}

exports.getUserById = async (id) => { 
    let user = await userRepository.getById(id)
    let details = await userDetailService.getUserDetails(id);
    if (!user) {
        throw new Error('User not found')
    }
    return user
}

exports.getUserByQuery = async (query) => { 
    let users = await userRepository.getByQuery(query)
    return users
}



exports.verifyEmail = async (token, otp) => {
  let userOtp = map.get(token);
  if (userOtp == otp) {
    try {
      // Try to decode the token; if it's expired, jwt.verify will throw an error.
      let user = await decodeToken(token);
      // Update the user as verified.
      user = await userRepository.updateById(user.id, { isVerified: true });
      return user;
    } catch (error) {
      throw new Error("Could not decode token: " + error.message);
    }
  } else {
    throw new Error("Invalid otp");
  }
};
