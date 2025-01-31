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
    // return { user, token }
    return token
}

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
    if (!user) {
        throw new Error('User not found')
    }
    return user
}

exports.getUserByQuery = async (query) => { 
    let users = await userRepository.getByQuery(query)
    return users
}