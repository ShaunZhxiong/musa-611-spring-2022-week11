const express = require('express')
const { parse } = require('@fast-csv/parse');
const fs = require('fs')

const app = express()
const port = 3000

const headers = [
  "ID Number", "Title", "Last Name", "First Name", "Middle Name", "Suffix",
  "Gender", "DOB", "Registration Date", "Voter Status", "Status Change Date",
  "Party Code", "House Number", "House Number Suffix", "Street Name",
  "Apartment Number", "Address Line 2", "City", "State", "Zip",
  "Mail Address 1", "Mail Address 2", "Mail City", "Mail State", "Mail Zip",
  "Last Vote Date", "Precinct Code", "Precinct Split ID", "Date Last Changed",
  "Custom Data 1", "District 1", "District 2", "District 3", "District 4",
  "District 5", "District 6", "District 7", "District 8", "District 9",
  "District 10", "District 11", "District 12", "District 13", "District 14",
  "District 15", "District 16", "District 17", "District 18", "District 19",
  "District 20", "District 21", "District 22", "District 23", "District 24",
  "District 25", "District 26", "District 27", "District 28", "District 29",
  "District 30", "District 31", "District 32", "District 33", "District 34",
  "District 35", "District 36", "District 37", "District 38", "District 39",
  "District 40", "Election 1 Vote Method", "Election 1 Party",
  "Election 2 Vote Method", "Election 2 Party", "Election 3 Vote Method",
  "Election 3 Party", "Election 4 Vote Method", "Election 4 Party",
  "Election 5 Vote Method", "Election 5 Party", "Election 6 Vote Method",
  "Election 6 Party", "Election 7 Vote Method", "Election 7 Party",
  "Election 8 Vote Method", "Election 8 Party", "Election 9 Vote Method",
  "Election 9 Party", "Election 10 Vote Method", "Election 10 Party",
  "Election 11 Vote Method", "Election 11 Party", "Election 12 Vote Method",
  "Election 12 Party", "Election 13 Vote Method", "Election 13 Party",
  "Election 14 Vote Method", "Election 14 Party", "Election 15 Vote Method",
  "Election 15 Party", "Election 16 Vote Method", "Election 16 Party",
  "Election 17 Vote Method", "Election 17 Party", "Election 18 Vote Method",
  "Election 18 Party", "Election 19 Vote Method", "Election 19 Party",
  "Election 20 Vote Method", "Election 20 Party", "Election 21 Vote Method",
  "Election 21 Party", "Election 22 Vote Method", "Election 22 Party",
  "Election 23 Vote Method", "Election 23 Party", "Election 24 Vote Method",
  "Election 24 Party", "Election 25 Vote Method", "Election 25 Party",
  "Election 26 Vote Method", "Election 26 Party", "Election 27 Vote Method",
  "Election 27 Party", "Election 28 Vote Method", "Election 28 Party",
  "Election 29 Vote Method", "Election 29 Party", "Election 30 Vote Method",
  "Election 30 Party", "Election 31 Vote Method", "Election 31 Party",
  "Election 32 Vote Method", "Election 32 Party", "Election 33 Vote Method",
  "Election 33 Party", "Election 34 Vote Method", "Election 34 Party",
  "Election 35 Vote Method", "Election 35 Party", "Election 36 Vote Method",
  "Election 36 Party", "Election 37 Vote Method", "Election 37 Party",
  "Election 38 Vote Method", "Election 38 Party", "Election 39 Vote Method",
  "Election 39 Party", "Election 40 Vote Method", "Election 40 Party",
  "Home Phone", "County", "Mail Country"
]

app.get('/', (req, res) => {
  res.send('Hello, this is the root')
})

app.get('/precinct/:precinct(\\d{4}).json', (req, res) => {
  const voters = [];

  console.log('creating a parser')
  const parser = parse({ headers: headers, delimiter: '\t' })
    .on('data', row => {
      if (row['District 1'] === req.params.precinct) {
        voters.push(row)
      }
    })

  const reader = fs.createReadStream(__dirname + '/../data/full-voter-export/PHILADELPHIA FVE 20220307.txt')

  reader.on('data', function (chunk) {
    parser.write(chunk.toString());
  });

  reader.on('end', function (chunk) {
    parser.end()
    res.send(JSON.stringify(voters))
  });

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
