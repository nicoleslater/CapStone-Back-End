const db = require("../db/dbConfig");

const getOneSkill = async (id) => {
    try{
        const oneSkill = await db.one("SELECT * FROM skills WHERE id=$1", id);
        return oneSkill
    } catch(error){
        return error
    }
};

const getAllSkills = async () => {
    try{
        const allSkills = await db.any("SELECT * FROM skills");
        return allSkills
    } catch(error){
        return error
    }
};

module.exports = {
    getOneSkill, 
    getAllSkills
}