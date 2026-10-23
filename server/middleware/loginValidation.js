import bcrypt from "bcryptjs"
async function validateLoginCredential(passwordText, hash) {
    const check = await bcrypt.compare(passwordText, hash);
    if (check) return { auth: true, message: "Login Validate" };
    else return { auth: false, message: "Invalid Credentials" }
}

export default validateLoginCredential