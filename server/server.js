require('newrelic');
const express = require('express');
const db = require('../database/connection.js');

const app = express();
const port = 5000;
// const logger = (req, res, next) => {
//   console.log(req.url)
//   next()
// }
// app.use(logger)

app.use(express.json());

// app.use('/', routes.qAndA);

let createQuestion = ({ question_id, body, date, name, helpfulness, reported }) => {
  return {
    question_id: question_id,
    question_body: body,
    question_date: date,
    asker_name: name,
    question_helpfulness: helpfulness,
    reported: reported,
    answers: {}
  }
}

let createAnswer = ({ answer_id, body, date, name, helpfulness, reported }) => {
  return {
    id: answer_id,
    body: body,
    date: date,
    answerer_name: name,
    helpfulness: helpfulness,
    reported: reported,
    photos: []
  }
}

let createPhoto = ({ photo_id, url }) => {
  return {
    id: photo_id,
    url: url
  }
}

app.get('/qa/questions', (req, res) => {
  let { product_id } = req.query;

  let response = {
    product_id: product_id,
    results: []
  }

  // this works because getting access to questions, answers, and photos 
  const questionQuery = `SELECT * FROM questions INNER JOIN answers USING (question_id) INNER JOIN photos USING (answer_id) WHERE product_id=${product_id};`;
  // const questionQuery = `SELECT * FROM questions INNER JOIN answers ON questions.question_id=answers.question_id WHERE product_id=${product_id};`;
  // const photoQuery = `SELECT * FROM photos WHERE answer_id IN (SELECT answer_id FROM answers WHERE question_id IN (SELECT question_id FROM questions WHERE product_id=${product_id}));`;

  db.query(questionQuery, (error, data) => {
    if (error) {
      console.log(error);
      res.status(400);
    } else {
      // db.connection.query(photoQuery, (photoError, photoData) => {
      //   if (photoError) {
      //     console.log(photoError);
      //   } else {
      // res.status(201);
      // res.send(data);
      // an array of object questions 

      var questionResults = response.results;
      var question_id;
      var answer_id;
      var photo_id;
      var index = -1;

      data.forEach((question) => {
        // photoData.forEach((photo) => {

        // conditionals
        var questionDNE = question.question_id !== question_id;
        var answerDNE = question.answer_id !== answer_id;
        var photoDNE = question.photo_id !== photo_id;

        if (questionDNE) {
          // this may only be keeping track of one question at a time
          question_id = question.question_id;
          questionResults.push(createQuestion(question));
          index++;
        }

        if (answerDNE) {
          answer_id = question.answer_id;
          questionResults[index].answers[answer_id] = createAnswer(question);
        }

        if (photoDNE) {
          photo_id = question.photo_id;
          questionResults[index].answers[answer_id].photos.push(createPhoto(question));
        }

      })
      res.status(200).send(response);
      // })
      // }
      // })
    }
  })
})

app.get('/qa/questions/:question_id/answers', (req, res) => {
  let { question_id } = req.params;
  let { page, count } = req.query;

  let response = {
    question: question_id,
    page: page || 1,
    count: count || 5,
    results: []
  };

  const answerQuery = `SELECT * FROM answers INNER JOIN photos USING (answer_id) WHERE question_id=${question_id};`;
  db.query(answerQuery, (error, data) => {
    if (error) {
      console.log(error);
      res.status(400);
    } else {
      var answerResults = response.results;
      var answer_id;
      var photo_id;
      var index = -1;

      data.forEach((answer) => {

        var answerDNE = answer.answer_id !== answer_id;
        var photoDNE = answer.photo_id !== photo_id;

        if (answerDNE) {
          answer_id = answer.answer_id;
          answerResults.push(createAnswer(answer));
          index++;
        }

        if (photoDNE) {
          photo_id = answer.photo_id;
          answerResults[index].photos.push(createPhoto(answer));
        }

      })
      res.status(200).send(response);
    };
  })
});

app.post('/qa/questions', (req, res) => {
  let { body, name, email, product_id } = req.body;

  const postQQuery = `INSERT INTO questions (product_id, body, name, email) VALUES (${product_id}, '${body}', '${name}', '${email}');`;

  db.query(postQQuery, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log(results);
      res.sendStatus(201);
    }
  })
})

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let { question_id } = req.params;
  let { body, name, email, photos } = req.body;

  const postAQuery = `INSERT INTO answers (question_id, body, name, email) VALUES (${question_id}, '${body}', '${name}', '${email}');`;

  db.query(postAQuery, (error, results) => {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      if (photos) {
        let { insertId } = results;
        for (var i = 0; i < photos.length; i++) {
          const postPQuery = `INSERT INTO photos (answer_id, url) VALUES (${insertId}, ${photos});`;
          db.query(postPQuery, (error, results) => {
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
              console.log(results);
              res.sendStatus(201);
            }
          })
        }
      } else {
        console.log(results);
        res.sendStatus(201);
      }
    }
  })
})

app.put('/qa/questions/:question_id/report', (req, res) => {
  let { question_id } = req.params;
  db.query(`UPDATE question SET reported = reported + 1 WHERE question_id=${question_id};`, (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      console.log(results)
      res.sendStatus(200)
    }
  })
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let { question_id } = req.params
  db.query(`UPDATE question SET helpfulness = helpfulness + 1 WHERE question_id=${question_id}`, (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }  
  })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let { answer_id } = req.params;
  db.query(`UPDATE answer SET answer_helpfulness = answer_helpfulness + 1 WHERE answer_id=${answer_id}`, (err, results) => {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});