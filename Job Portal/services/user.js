const userRepository = require('../repository/user')
const { hashPassword, generateToken } = require('../utils/helper')
const sendMail = require("../utils/mail");
const userDetailService = require("./userDetails");
// exports.createUser = async (data) => {
//     const user = await userRepository.getByEmail(data.email)
//     if (user) {
//         throw new Error('Email already exists')
//     }
//     let hash = await hashPassword(data.password)
//     data.password = hash
//     user = await userRepository.register(data)

//     let token = await generateToken({
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         name: user.name
//     })
//     // return { user, token }
//     return token
// }


let map = new Map();
exports.createUser = async (data) => {
  let user = await userRepository.getByEmail(data.email);
  if (user) {
    throw new Error("User already exists");
  }
  let hash = await hashPassword(data.password);
  data.password = hash;
  user = await userRepository.register(data);

  let token = await genereateToken({
    email: user.email,
    id: user.id,
    role: user.role,
    name: user.name,
  });
  let otp = Math.round(Math.random() * 10000);
  map.set(token, otp);
  let url = `<div> <a href=http://localhost:8090/api/v1/users/verify/${token}/${otp} > click to verify </a> </div>`;
  await sendMail(user.email, "verify", url);
  return token;
};


exports.login = async (data) => { 
    let user = await userRepository.getByEmail(data.email)
    if (!user) {
        throw new Error('Invalid email')
    }
    let isMatch = await comparePassword(data.password, user.password)
    if (!isMatch) {
        throw new Error('Invalid password')
    }
    let token = await generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
    })
    return token
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
        let user = await decodeToken(token);
        user = await userRepository.updateUser(user.id, { isVerified: true });
        return user;
      } catch (error) {
        throw new Error("Could not decode token");
      }
    } else {
      throw new Error("Invalid otp");
    }
  };