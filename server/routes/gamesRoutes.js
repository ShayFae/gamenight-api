const express = require('express');
const router = express.Router();

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

  router.get("/games/:room", (req, res) => {
    db.query(`SELECT * FROM games WHERE room_`)
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

  return router;
};