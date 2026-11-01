import bcrypt from 'bcrypt'
async function getHashedPassword(passwordText) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordText, salt);
    return hashedPassword
}

export default getHashedPassword