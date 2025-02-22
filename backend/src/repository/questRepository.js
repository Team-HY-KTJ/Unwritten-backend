import db from "../db.js";

async function createUserQuest( userId, questId )
{
    const query = `INSERT INTO user_quest (user_id, quest_id, progress) VALUES (?, ?, 0)`;
    const data = [ userId, questId ];

    try{
        const [rows] = await new Promise((resolve, reject) => db.query(query, data, (err, result, fields) => {
            if(err) reject(err);
            resolve(result); 
        }));

        return rows;
    }
    catch(err){
        throw new Error(err);
    }
}

async function readUserQuests( userId )
{
    const query = `
        SELECT *
        FROM user_quest
        LEFT JOIN quest ON user_quest.quest_id = quest.quest_id
        WHERE user_id = ?
    `;
    const data = [ userId ];

    try{
        const [rows] = await new Promise((resolve, reject) => db.query(query, data, (err, result, fields) => {
            if(err) reject(err);
            resolve(result); 
        }));

        return rows;
    }
    catch(err){
        throw new Error(err);
    }
}

async function readUserQuest( userId, questId )
{
    const query = `
        SELECT *
        FROM user_quest
        LEFT JOIN quest ON user_quest.quest_id = quest.quest_id
        WHERE user_quest.user_id = ? AND user_quest.quest_id = ?
    `;
    const data = [ userId, questId ];

    try{
        const [rows] = await new Promise((resolve, reject) => db.query(query, data, (err, result, fields) => {
            if(err) reject(err);
            resolve(result);
        }));

        return rows;
    }
    catch(err){
        throw new Error(err);
    }
}

async function updateUserQuest( userId, questId, progressChange ) {
    const query = `UPDATE user_quest SET progress = progress + ? WHERE user_id = ? AND quest_id = ?`;
    const data = [ userId, questId, progressChange ];

    try{
        const [rows] = await new Promise((resolve, reject) => db.query(query, data, (err, result, fields) => {
            if(err) reject(err);
            resolve(result);
        }));

        return rows;
    }
    catch(err){
        throw new Error(err);
    }
}

async function deleteUserQuest( userId, questId ) {
    const query = `DELETE FROM user_quest WHERE user_id = ? AND quest_id = ?`;
    const data = [ userId, questId ];

    try{
        const [rows] = await new Promise((resolve, reject) => db.query(query, data, (err, result, fields) => {
            if(err) reject(err);
            resolve(result); 
        }));

        return rows;
    }
    catch(err){
        throw new Error(err);
    }
}

export default { readUserQuests, readUserQuest, createUserQuest, deleteUserQuest };