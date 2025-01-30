const userService = require('../services/user')

exports.signupUser = async (req, res) => { 
 try {
       let user = await userService.createUser(req.body)
       res.status(201).send(user)
 } catch (error) {
     res.status(400).send({ message: error.message }); 
 }
}