const User = require("../model/user.model")

exports.register = async (data) => {
    let user = await User.create(data)
    return user
}
 
exports.getByEmail = async (email) => { 
    let user = await User.findOne({ email })
    return user
}

exports.updateById = async (id, data) => {
    let user = await User.findByIdAndUpdate(id, data, { new: true })
    return user
}

exports.deleteById = async (id) => {
    let user = await User.findByIdAndDelete(id)
    return user
}

exports.getAll = async () => {
    let users = await User.find()
    return users
}

exports.getById = async (id) => { 
    let user = await User.findById(id)
    return user
}

exports.getByQuery = async (query) => { 
    let users = await User.find(query)
    return users
}