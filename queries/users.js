const db = require("../db/dbConfig.js");


const createUser = async (user) => {
    const { email, password, serviceBranch, yearsOfService } = user;
    try {
        const newUser = await db.one("INSERT INTO users (email, password, service_branch, years_of_service) VALUES ($1, $2, $3, $4) RETURNING *", [email, password, serviceBranch, yearsOfService]);
        return newUser;
    } catch (error) {
        return error
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await db.oneOrNone("SELECT * FROM users WHERE email= $1", email);
        return user
    } catch (error) {
        return error;
    }
};


module.exports = {
    createUser,
    getUserByEmail,
}