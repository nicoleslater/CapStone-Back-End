const db = require('../db/dbConfig');

const  getAllUsers = async () => {
    try {
        const allUsers = await db.any("SELECT * FROM users");
        return allUsers
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error
    }
};

module.exports = getAllUsers