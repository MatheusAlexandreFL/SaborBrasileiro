const userService = require('../services/userServices');

async function login(req, res) {
    try {   
        const { email, senha } = req.body; 
        const token = await userService.login(email, senha); 
        
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    login,
}; 