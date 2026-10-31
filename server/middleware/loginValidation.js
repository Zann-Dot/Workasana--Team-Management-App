import bcrypt from "bcryptjs"
async function validateLoginCredential(passwordText, hash) {
    const check = await bcrypt.compare(passwordText, hash);
    if (check) return { auth: true, message: "Password Validated" };
    else return { auth: false, message: "Invalid password" }
}

export default validateLoginCredential