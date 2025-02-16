import express from 'express';
import db from '../../db.js';

const route = '/user';
const router = express.Router();
const { DB_TABLENAME } = process.env;

router.post('', (req, res) => {
    const {userId, nickname } = req.query;
    const response = { userId : userId, nickname : nickname };

    db.query('INSERT INTO users (user_id, nickname) VALUES (?, ?)', [userId, nickname], (err) => {
        if (err) {
            console.error('데이터 삽입 오류:', err);
            return res.status(500).send('서버 오류');
        }
        response.userId = userId;
        response.nickname = nickname;
        res.json(response);
    });
});

router.get('', async (req, res) => {
    const { userId } = req.query;
    const response = { exists : null };
    const count = await new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS count FROM users WHERE user_id = ?', [userId], (err, results) => {
            if(err) reject(err);
            resolve(results);
        });
    });

    console.log(count[0].count);

    if(count[0].count === 0){
        response.exists = false;
        console.log("not exist");
    }
    else {
        response.exists = true;
        console.log("exist");
    }
    res.json(response);
})

export { route, router };
