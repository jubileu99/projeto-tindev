const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        // req.params.devId -> pega o :devId lá do routes.js
        // req.headers.user -> pega o header chamado user na request via post

        const { devId } = req.params; // _id do usuario a dar like
        const { user } = req.headers; // _id do usuario logado

        const loggedDev = await Dev.findById(user); // cria uma instancia do usuario logado
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({ error : 'dev not exists'});
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log("Deu match")
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}