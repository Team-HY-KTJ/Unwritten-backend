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
    const response = { userId : userId, accessLevel : null, isSuccess : false };
    
    try {
        await new Promise((resolve, reject) => {
            db.query('UPDATE users SET access_level = ? WHERE user_id = ?', [accessLevel, userId], (err, results) => {
                if(err) reject(err);
                resolve(results);
            });
        });
        const [result] = await new Promise((resolve, reject) => {
            db.query('SELECT access_level FROM users WHERE user_id = ?', [userId], (err, results) => {
                if(err) reject(err);
                resolve(results);
            });
        });
        
        if(accessLevel != result.access_level){
            console.log(accessLevel, "!==", result.access_level);
            throw new Error('sql UPDATE ERROR');
        }

        response.accessLevel = result.access_level;
        response.isSuccess = true;
    }
    catch(e){
        console.log(e);
    }

    console.log(response);
    res.json(response);
});

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
        const [result] = await new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) AS count FROM users WHERE user_id = ?', [userId], (err, results) => {
                if(err) reject(err);
                resolve(results);
            });
        });
        if(result.count === 0) response.isSuccess = true;
    }
    catch(e){
        console.log(e);
    }

    console.log(response);
    res.json(response);
});

export { route, router };