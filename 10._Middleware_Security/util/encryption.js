import bcrypt, { hash } from 'bcryptjs'

const password = "hunter123"
const saltRounds = 14;

// /register /forgotpassword
const hashedPassword = await bcrypt.hash(password, saltRounds)


const savedHashesPassword = "$2b$14$FYPFs6ZU8RORAcoLBabahe4Em5n8IuHJ7k.ZDs1tPLR4W1Kk0zLi2"
const comparePassword = "hunter123"


// login
const isSame = await bcrypt.compare(comparePassword, savedHashesPassword)
console.log(isSame)


console.log(hashedPassword)
