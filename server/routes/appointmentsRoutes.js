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