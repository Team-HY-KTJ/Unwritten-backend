import questRepository from "../repository/questRepository.js";

async function createUserQuest( userId, questId ) {
    try{
        await questRepository.createUserQuest(userId, questId);
        const result = await questRepository.readUserQuest(userId, questId);
        return result;
    }
    catch(err){
        throw new Error(err);
    }
}

async function readUserQuests(params) {
    
}

async function readUserQuest(params) {
    
}

async function updateUserQuest(params) {
    
}

async function deleteUserQuest(params) {
    
}

export default { createUserQuest, readUserQuest, readUserQuests, updateUserQuest, deleteUserQuest };