const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();
app.use(cors());

const engine = knex({
  client: 'pg',
  connection: 'postgresql://postgres:postgres@localhost:5432/pa_voter_export',
});


app.get('/precinct/:precinct(\\d{4}).json$', (req, res) => {
  const sql = `
      SELECT
          "ID Number", "Last Name", "First Name", "Middle Name", "DOB",
          "Voter Status", "Party Code", "House Number", "Street Name",
          "Apartment Number", "Address Line 2", "City", "State", "Zip",
          "Last Vote Date", "Precinct Code", "Precinct Split ID"
      FROM full_voter_export
      WHERE "District 1" = '${req.params.precinct}'
  `;

  engine.raw(sql).then(data => {
    res.send(JSON.stringify(data.rows));
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
