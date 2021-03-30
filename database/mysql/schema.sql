DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

USE questions_answers;

-- or include product_id in tables?
-- benefits of VARCHAR over TEXT
-- benefits of DATE over TIMESTAMP or DATETIME
-- DATE, TIMESTAMP, DATETIME all not working 
-- benefits of BOOLEAN over TINYINT(1) OR BINARY
-- counts too small?
-- not one letter nouns?
-- not null on everything?
-- what else needs to be unique?


DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id INT UNSIGNED NOT NULL PRIMARY KEY
);

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
    question_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id INT UNSIGNED NOT NULL,
    body VARCHAR(400) NOT NULL,
    date VARCHAR(40) NOT NULL DEFAULT '0000-00-00',
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    reported BOOLEAN NOT NULL DEFAULT 0,
    helpfulness TINYINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (question_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
    answer_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    question_id INT UNSIGNED NOT NULL,
    body VARCHAR(400) NOT NULL,
    date VARCHAR(40) NOT NULL DEFAULT '0000-00-00',
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    reported BOOLEAN NOT NULL DEFAULT 0,
    helpfulness TINYINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
    photo_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    answer_id INT UNSIGNED NOT NULL,
    url VARCHAR(255) NOT NULL,
    PRIMARY KEY (photo_id),
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id) ON DELETE CASCADE
);

-- ALTER TABLE questions ADD COLUMN new_date DATE;
-- UPDATE questions SET new_date = STR_TO_DATE(date, '%d-%m-%Y') WHERE substring(date,3,1) = '-';