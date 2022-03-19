const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM appointments;`)
      .then(data => {
        const appointments = data.rows;
        res.json({ appointments });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  
  router.post("/new", (req, res) => {
    const queryString = `
    INSERT INTO appointments (title, description, image, category, game)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;
    const category = req.body.category;
    const game = req.body.game;


    const queryParams = [title, description, image, category, game];
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
  });

  router.get("/appointments/:room", (req, res) => {
    db.query(`SELECT * FROM appointments WHERE room_`)
      .then(data => {
        const appointments = data.rows;
        res.json({ appointments });

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};