import bcrypt from 'bcryptjs'
async function getHashedPassword(passwordText) {
    const saltRounds = 16;
    const hashedPassword = await bcrypt.hash(passwordText, saltRounds);
    return hashedPassword
}

export default getHashedPassword