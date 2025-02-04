const UserDetails = require("../model/userDetail");

exports.getByUserId = async (userId) => {
  let user = await UserDetails.findOne({ user: userId });
  return user;
};

exports.createDetail = async (payload) => {
  let userDetail = await UserDetails.create(payload);
  return userDetail;
};

exports.updateDetail = async (id, payload) => {
  let userDetail = await UserDetails.findByIdAndUpdate(id, payload,{new: true});
  return userDetail;
};
