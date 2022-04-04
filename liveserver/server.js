const express = require('express')
var cors = require('cors')
const { Client } = require('pg')

const app = express()
app.use(cors())

const client = new Client({
  host: 'localhost', port: 5432, database: 'pa_voter_export',
  user: 'postgres', password: 'postgres',
})
client.connect()


app.get('/precinct/:precinct(\\d{4}).json$', (req, res) => {
  const sql = `
    SELECT
        "ID Number", "Last Name", "First Name", "Middle Name", "DOB",
        "Voter Status", "Party Code", "House Number", "Street Name",
        "Apartment Number", "Address Line 2", "City", "State", "Zip",
        "Last Vote Date", "Precinct Code", "Precinct Split ID"
    FROM full_voter_export
    WHERE "District 1" = '${req.params.precinct}'
  `

  client.query(sql, (err, query_res) => {
    const data = query_res.rows
    res.send(JSON.stringify(data))
  })
})


const port = 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
