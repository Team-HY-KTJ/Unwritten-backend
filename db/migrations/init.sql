CREATE DATABASE IF NOT EXISTS unwritten_db;
USE unwritten_db;

CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(50) NOT NULL PRIMARY KEY, -- 유저 고유 아이디
    nickname VARCHAR(50) NOT NULL, -- 유저 별명
    access_level INT NOT NULL -- 접근 가능성
);

CREATE TABLE IF NOT EXISTS user_quest (
    user_id VARCHAR(50) NOT NULL, -- 유저 고유 아이디
    quest_id INT NOT NULL, -- 퀘스트 아이디
    progress INT NOT NULL, -- 진척도
    UNIQUE(user_id, quest_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_achievement (
    user_id VARCHAR(50) NOT NULL, -- 유저 고유 아이디
    achievement_id INT NOT NULL, -- 도전과제 아이디디
    complete_time TIMESTAMP NOT NULL, -- 달성 시간
    progress INT NOT NULL, -- 진척도
    ranking INT, -- 달성 등수
    UNIQUE(user_id, achievement_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_inventory (
    user_id VARCHAR(50) NOT NULL, -- 유저 고유 아이디
    item_id INT NOT NULL, -- 아티팩트 아이디디
    count INT NOT NULL, -- 보유 아티팩트 개수
    is_collected TINYINT(1) NOT NULL, -- 보유 달성 여부
    UNIQUE(user_id, item_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS item_instance (
    item_id INT AUTO_INCREMENT PRIMARY KEY, -- 아티팩트discussion 고유 아이디
    item_name VARCHAR(255) NOT NULL, -- 아티팩트 이름
    user_id VARCHAR(50) NOT NULL, -- 유저 고유 아이디
    current_state TINYINT(1) NOT NULL, -- 현재 아티팩트 상태
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS achievement (
    achievement_id INT NOT NULL PRIMARY KEY, -- 도전과제 아이디
    achievement_name VARCHAR(255) NOT NULL, -- 도전과제 제목
    grade VARCHAR(50), -- 도전과제 정보 1 (등급)
    condition_information VARCHAR(255), -- 도전과제 정보 2 (달성조건)
    reward VARCHAR(50), -- 도전과제 정보 3 (보상)
    content VARCHAR(255), -- 도전과제 정보 4 (내용)
    clear_count BIGINT NOT NULL -- 달성자 수
);

CREATE TABLE IF NOT EXISTS item (
    item_id INT NOT NULL PRIMARY KEY, -- 아티팩트 고유 아이디
    item_name VARCHAR(255) NOT NULL, -- 아티팩트 이름
    grade VARCHAR(50) NOT NULL, -- 아티팩트 정보 1(등급)
    effect VARCHAR(255), -- 아티팩트 정보 2(효과)
    kind_of_effect VARCHAR(50), -- 아티팩트 정보 3(효과 종류)
    can_selling VARCHAR(15) NOT NULL, -- 아티팩트 정보 4(판매 가능 여부)
    condition_information VARCHAR(255), -- 아티팩트 정보 5(획득 조건)
    content VARCHAR(255) -- 아티팩트 정보 6(내용)
);

CREATE TABLE IF NOT EXISTS quest_combination (
    quest_combination_id INT AUTO_INCREMENT PRIMARY KEY, -- 퀘스트 조합 아이디
    combination VARCHAR(50) NOT NULL -- 조합된 요소들
);

CREATE TABLE IF NOT EXISTS quest (
    quest_id INT AUTO_INCREMENT PRIMARY KEY, -- 퀘스트 아이디
    quest_name VARCHAR(255) NOT NULL, -- 퀘스트 이름
    completed_progress INT NOT NULL, -- 퀘스트 완료 진척도
    grade VARCHAR(50) NOT NULL, -- 퀘스트 등급
    reward VARCHAR(50) NOT NULL, -- 퀘스트 보상
    content VARCHAR(50) NOT NULL -- 퀘스트 내용
);