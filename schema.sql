DROP DATABASE IF EXISTS questions_answers;

CREATE DATABASE questions_answers;

USE questions_answers;

-- or include product_id in tables?
-- benefits of VARCHAR over TEXT
-- benefits of DATE over TIMESTAMP or DATETIME
-- benefits of BOOLEAN over TINYINT(1) OR BINARY
-- counts too small?
-- not one letter nouns?
-- not null on everything?
-- what else needs to be unique?


DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY
);

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
    question_id SERIAL,
    product_id SERIAL,
    body VARCHAR(400) NOT NULL,
    date DATE NOT NULL,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(60) NOT NULL,
    helpfulness TINYINT UNSIGNED NOT NULL DEFAULT 0,
    reported BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (question_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
    answer_id SERIAL,
    question_id SERIAL,
    body VARCHAR(400) NOT NULL,
    date DATE NOT NULL,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(60) NOT NULL,
    helpfulness TINYINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
    photo_id SERIAL,
    answer_id SERIAL,
    url VARCHAR(100) NOT NULL,
    PRIMARY KEY (photo_id),
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id) ON DELETE CASCADE
);
