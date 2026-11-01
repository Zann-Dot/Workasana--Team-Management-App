import bcrypt from 'bcryptjs'
async function getHashedPassword(passwordText) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(passwordText, saltRounds);
    return hashedPassword
}

export default getHashedPassword