from flask import Flask, jsonify
from flask_cors import CORS
from psycopg2 import connect as pg_connect
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)

conn = pg_connect(
    host='localhost', port=5432, dbname='pa_voter_export',
    user='postgres', password='postgres',
)


@app.route("/precinct/<int:precinct>.json")
def get_precinct(precinct):
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        sql = f'''
            SELECT
                "ID Number", "Last Name", "First Name", "Middle Name", "DOB",
                "Voter Status", "Party Code", "House Number", "Street Name",
                "Apartment Number", "Address Line 2", "City", "State", "Zip",
                "Last Vote Date", "Precinct Code", "Precinct Split ID"
            FROM full_voter_export
            WHERE "District 1" = '{precinct}'
        '''

        cursor.execute(sql)
        data = cursor.fetchall()
        return jsonify(data)


if __name__ == '__main__':
    port = 3000
    app.run(port=port)
