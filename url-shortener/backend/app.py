from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
from random import choice
import string

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'url-shortener'

def get_conn():
    mysql = pymysql.connect(
    host = app.config['MYSQL_HOST'],
    user = app.config['MYSQL_USER'],
    password= app.config['MYSQL_PASSWORD'],
    db = app.config['MYSQL_DB']
    )
    return mysql



def get_url(url_id):
    connection = get_conn()
    cursor = connection.cursor()

    # Assuming you have a table named 'students' with columns 'student_id' and 'name'
    query = f"SELECT url FROM urls WHERE url_id = {url_id}"
    try:
        cursor.execute(query)
        result = cursor.fetchone()
    except Exception:
        return False


    cursor.close()
    connection.close()

    if result:
        return result[0]
    else:
        return None

@app.route('/insert_url', methods=['POST'])
def insert_url():
    try:
        # Get data from request
        data = request.json
        url = data['url']
        url_id = ''.join(choice(string.ascii_letters+string.digits) for _ in range(6))
        # Connect to MySQL
        connection = get_conn()
        cursor = connection.cursor()

        # Insert data into the table
        sql = "INSERT INTO urls (url_id, url) VALUES (%s, %s)"
        cursor.execute(sql, (url_id, url))

        # Commit the transaction
        connection.commit()

        # Close the cursor and connection
        cursor.close()
        connection.close()

        return jsonify({'status': 'success', 'message': 'Data inserted successfully', "url_id" : url_id})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

# Flask route to handle requests for getting student name
@app.route('/get_url', methods=['GET'])
def get_url_route():
    url_id = request.args.get('url_id')

    if not url_id:
        return jsonify({'error': 'URL ID is required'}), 400

    url  = get_url(url_id)


    if url:
        response = jsonify({'url': url})
    else:
        response = jsonify({'error': 'URL not found'})

    return response

@app.before_request
def before_request():
    if request.method == "OPTIONS":
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
        return ('', 204, headers)

if __name__ == '__main__':
    app.run(debug= True, port= 3000)
