SELECT * FROM questions WHERE product_id=14931;

SELECT * FROM answers WHERE question_id IN (SELECT question_id FROM questions WHERE product_id=14931);

SELECT * FROM photos WHERE answer_id IN (SELECT answer_id FROM answers WHERE question_id IN (SELECT question_id FROM questions WHERE product_id=14931));

SELECT * FROM questions INNER JOIN answers ON questions.question_id=answers.question_id WHERE product_id=14931;

SELECT * FROM questions INNER JOIN answers USING (question_id) INNER JOIN photos USING (answer_id) WHERE product_id=14923;