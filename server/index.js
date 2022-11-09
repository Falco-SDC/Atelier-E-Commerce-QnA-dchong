const express = require('express');
const app = express();
const db = require('../database/index.js');
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/qa/questions', db.getQuestions);
app.get('/qa/questions/:question_id/answers', db.getAnswers);
app.post('/qa/questions', db.addQuestion);
app.post('/qa/questions/:question_id/answers', db.addAnswer);
app.put('/qa/questions/:question_id/helpful', db.qhelpful);
app.put('/qa/questions/:question_id/report', db.qreport);
app.put('/qa/answers/:answer_id/helpful', db.ahelpful);
app.put('/qa/answers/:answer_id/report', db.areport);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})