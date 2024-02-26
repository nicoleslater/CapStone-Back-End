import dotenv from "dotenv";
dotenv.config();
// console.log(process.env)
import app from "./app.js";

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server is ready on port ${PORT}`);
});
