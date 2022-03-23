const express = require('express');
const router = express.Router();

const app = express()

app.use(express.json)

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM games;`)
      .then(data => {
        const games = data.rows;
        res.json({ games });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/new", (req, res) => {
    const queryString = `
    INSERT INTO games (name, image, category_id)
    VALUES ($1,$2,$3)
    RETURNING *
    `
    const name = req.body.game;
    const image = req.body.image;
    const category = req.body.category;
    let category_id = 0;
    if (category == 'Video Game') {
      category_id = 1;
    } else if (category == 'Card Game') {
      category_id = 2;
    } else {
      category_id = 3;
    }

    const queryParams = [name, image, category_id]
    return db
      .query(queryString, queryParams)
      .then((data) => {
        // console.log('this is data', data)
        const post = data.rows;
        res.json({ post });
      })
      .catch((error) => {
        console.log(error.message)
      })
  })
  return router;
};


// maybe need this for adding games into our database, leave it for now
// router.post("/register", (req, res) => {
//   const queryString = `
//   INSERT INTO users (name, email, password)
//   VALUES ($1, $2, $3)
//   RETURNING *`;
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;

//   const queryParams = [username, email, password];
//   return db
//     .query(queryString, queryParams)

//     .then((data) => {
//       // console.log('this is data', data)
//       const users = data.rows;
//       res.json({ users });
//     })
//     .catch((error) => {
//       console.log(error.message)
//     })
// });


// router.post("/login", (req, res) => {
//   const queryString = `
//     SELECT email, password FROM users
//     WHERE email = $1
//     AND password = $2`
//     ;
//   const email = req.body.email;
//   const password = req.body.password;

//   const queryParams = [email, password];
//   return db
//     .query(queryString, queryParams)

//     .then((data) => {
//       console.log('this is data', data)
//       const users = data.rows;
//       res.json({ users });
//     })
//     .catch((error) => {
//       console.log(error.message)
//     })
// });