const app = require("./app.js");

require("dotenv").config();

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server is Ready on ${PORT}`)
});