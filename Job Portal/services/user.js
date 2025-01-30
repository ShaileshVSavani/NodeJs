const userRepository = require('../repository/user')
const { hashPassword, generateToken } = require('../utils/helper')

exports.createUser = async (data) => { 
    const user = await userRepository.getByEmail(data.email)
    if (user) {
        throw new Error('Email already exists')
    }
    let hash = await hashPassword(data.password)
    data.password = hash
    user = await userRepository.register(data)

    let token = await generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
    })
    return { user, token }
}