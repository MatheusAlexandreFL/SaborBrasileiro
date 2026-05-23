const userService = require('../services/userServices');



async function login(req, res) {
    try {   
        const { email, password } = req.body; 
        
        const token = await userService.login(email, password); 
        
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    login,
}; 