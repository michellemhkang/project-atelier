LOAD DATA LOCAL INFILE '/Users/michellekang/Documents/CSV-data/product.csv' INTO TABLE products
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(product_id, @dummy, @dummy, @dummy, @dummy, @dummy);

LOAD DATA LOCAL INFILE '/Users/michellekang/Documents/CSV-data/questions.csv' INTO TABLE questions
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(question_id, product_id, body, date, name, email, reported, helpfulness);

LOAD DATA LOCAL INFILE '/Users/michellekang/Documents/CSV-data/answers.csv' INTO TABLE answers
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(answer_id, question_id, body, date, name, email, reported, helpfulness);

LOAD DATA LOCAL INFILE '/Users/michellekang/Documents/CSV-data/answers_photos.csv' INTO TABLE photos
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(photo_id, answer_id, url);
