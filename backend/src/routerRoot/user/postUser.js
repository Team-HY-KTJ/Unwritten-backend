import express from 'express';
import db from '../../db.js';

const route = '/user';
const router = express.Router();
const { DB_TABLENAME } = process.env;

/*
    /user (post) : 신규 유저 등록

    입력 쿼리 = {
        userId : "00000000",
        nickname : '홍길동'
    }

    반환 json = {
        userId : "00000000",
        isSuccess : true
    }
*/
router.post('', (req, res) => {
    const { userId, nickname } = req.query;
    const response = { userId : userId, isSuccess : false };
    
    if(!nickname){
        console.log(nickname, "은 올바르지 않은 형식입니다.");
        return res.json("올바르지 않은 닉네임 접근");
    }

    db.query('INSERT INTO users (user_id, nickname, access_level) VALUES (?, ?, 1)', [userId, nickname], (err) => {
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

export { route, router };