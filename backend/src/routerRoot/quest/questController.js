import express from "express";
import questService from "../../service/questService.js";

const route = '/quest';
const router = express.Router();

router.post('', async (req, res) => {
    const { userId, questId } = req.body;

    try{
        const result = await questService.createUserQuest( userId, questId );
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json(err);
    }
});

export { route, router };