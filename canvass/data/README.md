The PA Full Voter Export files come as header-less fixed-width data files, and are accompanied by a Word document describing the fields. Thus, some preprocessing is necessary.

Download of data is at https://storage.googleapis.com/mjumbewu-musa_coursework-downloads/musa-611-spring-2022/PA-Philadelphia-FullVoterExport-20220312.zip

If you've downloaded and unzipped the data into a folder named "full-voter-export", you can process the data for a single precinct by running:

```
cat "full-voter-export/PHILADELPHIA FVE 20220307.txt" \
  | python3 process_full_voter_export.py --precinct 3925 > precinct3925.json
```

For example, the above will export data for precinct 3925 and store it in a file named `precinct3925.json`.

Alternatively, it may be helpful to split each precinct into its own file. This will allow you to more quickly generate the JSON for each precinct separately.

```
cat "full-voter-export/PHILADELPHIA FVE 20220307.txt" \
  | python3 split_full_voter_export.py split-voter-exports/
```
