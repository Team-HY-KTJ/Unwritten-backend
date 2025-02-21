import express from 'express';
import db from '../../db.js';

const route = '/user';
const router = express.Router();
const { DB_TABLENAME } = process.env;

/*
    /user (patch) : 유저 접근 가능도 변경

    입력 쿼리 = {
        userId = "00000000",
        accessLevel = 3,
    }

    반환 json = {
        userId = "00000000",
        accessLevel = 3,
        isSuccess = true
    }
*/
router.patch('', async (req,res) => {
    const { userId, accessLevel } = req.query;
    const response = { userId : userId, accessLevel : accessLevel, isSuccess : false };
    
    try {
        await new Promise((resolve, reject) => {
            db.query('UPDATE users SET access_level = ? WHERE user_id = ?', [accessLevel, userId], (err, results) => {
                if(err) reject(err);
                resolve(results);
            });
        });
        response.isSuccess = true;
    }
    catch(e){
        console.log(e);
    }

    console.log(response);
    res.json(response);
});

export { route, router };