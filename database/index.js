const dotenv = require("dotenv");
dotenv.config();

const {Pool} = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const getQuestions = (req, res) => {
  return pool.query(`
    select json_build_object(
      'product_id', '${req.query.product_id}',
      'results', (
        select
          json_agg(row_to_json(question))
        from
          (select
            question_id,
            question_body,
            (select to_char(to_timestamp(question_date/1000),'YYYY-MM-DDThh:mm:ss.ff3Z')) as question_date,
            asker_name,
            question_helpfulness,
            reported,
            (select coalesce(
              json_object_agg(
                answer_id,
                (select
                  row_to_json(result)
                from
                  (select
                    answer_id as id,
                    body,
                    (select to_char(to_timestamp(date/1000),'YYYY-MM-DDThh:mm:ss.ff3Z')) as date,
                    answerer_name,
                    helpfulness,
                    (select coalesce(json_agg(row_to_json(images)), '[]'::json) from (select id, url from answers_photo where answer_id=answers.answer_id) as images) as photos
                  from answers
                  where question_id = questions.question_id
                  order by helpfulness desc, answer_id asc) as result
                where id=answer_id)
              ),
              '{}'::json
            ) from answers where question_id = questions.question_id) as answers
          from questions
          where product_id = ${req.query.product_id}
          limit ${req.query.page * req.query.count}
          ) as question)
    );`)
    .then((response) => {
      res.json(response.rows[0].json_build_object);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAnswers = (req, res) => {
  return pool.query(`
    select json_build_object(
      'question', ${req.params.question_id},
      'page', ${req.query.page},
      'count', ${req.query.count},
      'results', (select json_agg(row_to_json(result)) from (select answer_id, body, (select to_char(to_timestamp(date/1000),'YYYY-MM-DDThh:mm:ss.ff3Z')) as date, answerer_name, helpfulness, (select coalesce(json_agg(row_to_json(images)), '[]'::json) from (select id, url from answers_photo where answer_id=answers.answer_id) as images) as photos from answers where question_id = ${req.params.question_id} order by helpfulness desc, answer_id asc limit ${req.query.count * req.query.page}) as result));`)
    .then((response) => {
      res.json(response.rows[0].json_build_object);
    })
    .catch((error) => {
      console.log(error);
    });
};

const addQuestion = (req, res) => {
  return pool.query(`insert into questions (question_id, product_id, question_body, asker_name, asker_email) values ((select MAX(question_id) from questions)+1, ${Number(req.body.product_id)}, '${req.body.body}', '${req.body.name}', '${req.body.email}');`)
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
    });
};

const addAnswer = (req, res) => {
  return pool.query(`
    insert into answers (answer_id, question_id, body, answerer_name, answerer_email)
    values ((select MAX(answer_id) from answers)+1, ${req.params.question_id}, '${req.body.body}', '${req.body.name}', '${req.body.email}')
    returning answer_id;
  `)
    .then((response) => {
      var answer_id = response.rows[0].answer_id;
      req.body.photos.forEach((url) => {
        pool.query(`
          insert into answers_photo (id, answer_id, url) values ((select MAX(id) from answers_photo)+1, ${answer_id}, '${url}')
          returning id;
        `)
          .catch((error) => {console.log(error)});
      })
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
    });
};

const qhelpful = (req, res) => {
  return pool.query(`update questions set question_helpfulness = (select question_helpfulness from questions where question_id = ${req.params.question_id})+1 where question_id = ${req.params.question_id};`)
  .then((response) => {
    res.sendStatus(204);
  })
  .catch((error) => {
    console.log(error);
  });
};

const qreport = (req, res) => {
  return pool.query(`update questions set reported = true where question_id = ${req.params.question_id};`)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
    });
};

const ahelpful = (req, res) => {
  return pool.query(`update answers set helpfulness = (select helpfulness from answers where answer_id = ${req.params.answer_id})+1 where answer_id = ${req.params.answer_id};`)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
    });
};

const areport = (req, res) => {
  return pool.query(`update answers set reported = true where answer_id = ${req.params.answer_id};`)
    .then((response) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  qhelpful,
  qreport,
  ahelpful,
  areport
}