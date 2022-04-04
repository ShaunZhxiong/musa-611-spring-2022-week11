from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine

app = Flask(__name__)
CORS(app)

engine = create_engine(
    'postgresql://postgres:postgres@localhost:5432/pa_voter_export'
)


@app.route('/precinct/<int:precinct>.json')
def get_precinct(precinct):
    sql = f'''
        SELECT
            "ID Number", "Last Name", "First Name", "Middle Name", "DOB",
            "Voter Status", "Party Code", "House Number", "Street Name",
            "Apartment Number", "Address Line 2", "City", "State", "Zip",
            "Last Vote Date", "Precinct Code", "Precinct Split ID"
        FROM full_voter_export
        WHERE "District 1" = '{precinct}'
    '''

    rows = engine.execute(sql).fetchall()
    return jsonify([dict(row) for row in rows])


if __name__ == '__main__':
    port = 3000
    app.run(port=port)
