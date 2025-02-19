import express from 'express';
import db from '../../db.js';
import { rejects } from 'assert';
import { resolve } from 'path';
import { userInfo } from 'os';

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
    
    // 닉네임을 따로 설정하지 않은 상태로 쿼리를 보내도 정상작동이 되고 있는 상태 (유저 초기 등록 시 닉네임 기입을 바로 한다면 입력조건 부여 필요)
    
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

    반환 json = {
        userId : "00000000",
        exists : true,
        accessLevel : 1,
        nickname : '홍길동'
    }
*/
router.get('', async (req, res) => {
    const { userId } = req.query;
    const response = { userId : userId, exists : null, accessLevel : null, nickname : null };
    try {
        const [result] = await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS count, access_level, nickname FROM users WHERE user_id = ?', [userId], (err, results) => {
                if(err) reject(err);
                resolve(results);
            });
        });

        response.accessLevel = result.access_level;
        response.nickname = result.nickname;
    
        if(result.count === 0){
            response.exists = false;
        }
        else {
            response.exists = true;
        }
    }
    catch(e){
        console.log(e);
    }
    
    console.log(response);
    res.json(response);
});

export { route, router };