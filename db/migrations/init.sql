CREATE DATABASE IF NOT EXISTS unwritten_db;
USE unwritten_db;

-- 행 구분 방법 : PRIMARY KEY OR UNIQUE

CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(50) NOT NULL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_quest (
    user_id VARCHAR(50) NOT NULL,
    quest_id VARCHAR(255) NOT NULL,
    progress FLOAT NOT NULL, -- 진척도
    UNIQUE(user_id, quest_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_achievement (
    user_id VARCHAR(50) NOT NULL,
    challenge_name VARCHAR(255) NOT NULL,
    complete_time TIMESTAMP NOT NULL,
    progress FLOAT NOT NULL,
    ranking BIGINT, -- 달성 등수
    UNIQUE(user_id, challenge_name),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_inventory (
    user_id VARCHAR(50) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    count BIGINT NOT NULL, -- 만약 가질 수 있는 아이템 개수에 제한을 줄 경우 TINYINT (0 ~ 255) 도 고려해볼만할 듯
    is_clear TINYINT(1) NOT NULL, -- 1 : 달성, 0 : 미달성, 실제로 bool로 저장하더라도 이렇게 생성된다고 함
    UNIQUE(user_id, item_name),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS item_instance (
    item_id VARCHAR(50) NOT NULL PRIMARY KEY, -- 아이템 고유 아이디(직접 설정해줄 예정? 랜덤으로 생성 예정? 고민해봐야될 듯듯)
    item_name VARCHAR(255) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    current_state TINYINT(1) NOT NULL, -- 1 : 활성화, 0 : 비활성화
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS achievement (
    challenge_name VARCHAR(255) NOT NULL PRIMARY KEY,
    grade VARCHAR(50), -- 도전과제 정보 1 (등급)
    condition_information VARCHAR(255), -- 도전과제 정보 2 (달성조건)
    content VARCHAR(255), -- 도전과제 정보 3 (내용)
    clear_count BIGINT NOT NULL -- 달성자 수
);

CREATE TABLE IF NOT EXISTS item (
    item_id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    item_name VARCHAR(255) NOT NULL,
    grade VARCHAR(50), -- 아이템 정보 1(등급)
    effect VARCHAR(255), -- 아이템 정보 2(효과)
    condition_information VARCHAR(255), -- 아이템 정보 3(획득 조건)
    content VARCHAR(255) -- 아이템 정보 4(내용)
);

CREATE TABLE IF NOT EXISTS quest_combination (
    quest_combination_id INT AUTO_INCREMENT PRIMARY KEY,
    combination VARCHAR(50) NOT NULL
);