const checkName = (req, res, next) => {
    if(req.body.name){
        console.log("Name is OK")
        next()
    } else{
        res.status(404).json({ error: "Name is required!" })
    }
}

const checkBoolean = (req, res, next) => {
    if( req.body.boolean === true || req.body.boolean === false){
        next()
    } else{
        res.status(404).json({ error: "Boolean value ONLY!"})
    }
}

module.exports = {
    checkName, 
    checkBoolean
}