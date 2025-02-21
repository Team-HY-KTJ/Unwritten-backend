import express from 'express';
import db from '../../db.js';

const route = '/user';
const router = express.Router();
const { DB_TABLENAME } = process.env;

/*
    /user (delete) : 유저 탈퇴퇴

    입력 쿼리 = {
        userId = "00000000"
    }

    반환 json = {
        userId = "00000000",
        isSuccess = true
    }
*/

router.delete('', async (req, res) => {
    const { userId } = req.query;
    const response = { userId : userId, isSuccess : false };
    try {
        await new Promise((resolve, reject) => {
            db.query('DELETE FROM users WHERE user_id = ?', [userId], (err, results) => {
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