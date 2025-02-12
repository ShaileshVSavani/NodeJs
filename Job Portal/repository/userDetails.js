const UserDetails = require("../model/userDetails");


exports.createDetail = async (payload) => {
  let userDetail = await UserDetails.create(payload);
  return userDetail;
};
exports.getByUserId = async (userId) => {
  let user = await UserDetails.findOne({ user: userId });
  return user;
};

exports.updateDetail = async (id, payload) => {
  let userDetail = await UserDetails.findByIdAndUpdate(id, payload,{new: true});
  return userDetail;
};
