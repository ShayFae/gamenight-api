// /////////// catsRoutes.js
// const router = require('express').Router();

// module.exports = () => {
//   // all routes will go here 
//   router.get('/', (req, res) => {
//     const cats = ['Rosey', 'Puma', 'Mr Buttons', 'Aya'];
//     res.json(cats);
//   });
  
//   return router;
// }

// -- routes/catRoutes.js
const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then(data => {
      res.json(data.rows);
    })
  });

  return router;
}