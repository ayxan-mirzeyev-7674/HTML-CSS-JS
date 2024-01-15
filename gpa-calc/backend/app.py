from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'gpa-calc'

def get_conn():
    mysql = pymysql.connect(
    host = app.config['MYSQL_HOST'],
    user = app.config['MYSQL_USER'],
    password= app.config['MYSQL_PASSWORD'],
    db = app.config['MYSQL_DB']
    )
    return mysql



def get_student_name(student_id, group):
    connection = get_conn()
    cursor = connection.cursor()

    # Assuming you have a table named 'students' with columns 'student_id' and 'name'
    query = f"SELECT name FROM {group.upper()} WHERE st_id = {student_id}"
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

# Flask route to handle requests for getting student name
@app.route('/get_student_name', methods=['GET'])
def get_student_name_route():
    student_id = request.args.get('st_id')
    group = request.args.get('group')

    if not student_id or not group:
        return jsonify({'error': 'Student ID and Group is required'}), 400

    student_name = get_student_name(student_id,group)


    if student_name:
        response = jsonify({'student_name': student_name})
    else:
        response = jsonify({'error': 'Student not found'})

    return response

if __name__ == '__main__':
    app.run(debug= True)
