const userDetailService = require("../services/userDetails");
// exports.createUser = async (req, res) => {
//   try {
//     let userDetail = await userDetailService.createUserDetails(req.body);
//     res.send(userDetail);
//   } catch (error) {
//     res.send({ error: error });
//   }
// };

exports.createUser = async (req, res) => {
  try {
    // Check if req.user exists; if not, return an error
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Pass req.user.id to the service function
    let userDetail = await userDetailService.createUserDetails(req.body, req.user.id);
    res.send(userDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateUser = async (req, res) => {
  let { id } = req.params;
  try {
    let userDetail = await userDetailService.updateUserDetails(id, req.body);
    res.send({ userDetail: userDetail });
  } catch (error) {
    res.send({ error: error });
  }
};

exports.getUserDetailsByUserId = async (req, res) => {
  let { userId } = req.params;
  try {
    let userDetail = await userDetailService.getUserDetails(userId);
    res.send({ userDetail: userDetail });
  } catch (error) {
    res.send({ error: error });
  }
};
