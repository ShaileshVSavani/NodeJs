const userService = require('../services/user')

exports.signupUser = async (req, res) => { 
 try {
       let user = await userService.createUser(req.body)
     //    res.status(201).send(user)
     return res.status(201).send({ token: user });
 } catch (error) {
    return res.status(400).send({ message: error.message }); 
 }
}

exports.loginUser = async (req, res) => { 
    try {
        let user = await userService.login(req.body)
        return res.status(200).send({ token: user });
    } catch (error) {
        return res.status(401).send({ message: error.message });
    }
}

exports.updateUser = async (req, res) => { 
    let { userId } = req.params;
    try {
        let user = await userService.updateUser(userId, req.body)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

exports.deleteUser = async (req, res) => { 
    let { userId } = req.params;
    try {
        let user = await userService.deleteUser(userId)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}

exports.getAllUsers = async (req, res) => { 
    try {
        let users = await userService.getAllUsers()
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.getUserById = async (req, res) => { 
    let { userId } = req.params;
    try {
        let user = await userService.getUserById(userId)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
}

exports.getUserByQuery = async (req, res) => {
    let query = req.query;
    try {
        let users = await userService.getUserByQuery(query)
        return res.status(200).send(users);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
}


exports.verifyEmail = async (req, res) => {
    let { token, otp } = req.params;
    try {
      let User = await userService.verifyEmail(token, otp);
      return res.send({ message:"Verified email"});
    } catch (error) {
      return res.status(404).send({ message: error.message });
    }
  
  };