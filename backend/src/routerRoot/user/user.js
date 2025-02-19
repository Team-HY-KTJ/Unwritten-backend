import express from 'express';
import db from '../../db.js';

const route = '/user';
const router = express.Router();
const { DB_TABLENAME } = process.env;

/*
    /user (post) : 신규 유저 등록

    입력 쿼리 = {
        userId : "00000000",
        nickname : "별명"
    }

    반환 쿼리 = {
        userId : "00000000",
        isSuccess : true
    }
*/
router.post('', (req, res) => {
    const { userId, nickname } = req.query;
    const response = { userId : userId, isSuccess : false };

    db.query('INSERT IGNORE INTO users (user_id, nickname) VALUES (?, ?)', [userId, nickname], (err) => {
        if (err) {
            console.error('데이터 삽입 오류:', err);
            res.json(response);
        }
        else {
            response.isSuccess = true;
            console.log(response);
            res.json(response);
        }
    });
});

/*
    /user (get) : 유저 등록 여부 확인

    입력 쿼리 = {
        userId : "00000000"
    }

    반환 쿼리 = {
        userId : "00000000",
        exists : true,
        accessLevel : 3
    }
*/
router.get('', async (req, res) => {
    const { userId } = req.query;
    const response = { userId : userId, exists : null, accessLevel : null };
    const [result] = await new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS count, access_level FROM users WHERE user_id = ?', [userId], (err, results) => {
            if(err) reject(err);
            resolve(results);
        });
    });
    response.accessLevel = result.access_level;

    if(result.count === 0){
        response.exists = false;
    }
    else {
        response.exists = true;
    }
    
    console.log(response);
    res.json(response);
});

export { route, router };
