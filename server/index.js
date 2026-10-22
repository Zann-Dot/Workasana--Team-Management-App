import connectDB from "./db/db.connect.js";
import e from "express";
const app = e();
app.use(e.json());
connectDB();
const PORT = 3000
app.get("/", (req, res) => {
    res.json({ message: "workasana server, search endpoints for data view" })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})