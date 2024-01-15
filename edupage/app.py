from flask import Flask, render_template, request
from edupage_api import Edupage, BadCredentialsException, LoginDataParsingException, EduDate,EduTime,EduLength
 
 
# Create the Flask instance and pass the Flask 
# constructor the path of the correct module
app = Flask(__name__)
edupage = Edupage("ufaz", "AykhanMirzayev", "Ayxanbel11")
 
# The URL  'localhost:5000/square' is mapped to
# view function 'squarenumber'
# The GET request will display the user to enter 
# a number (coming from squarenum.html page)
 
 
@app.route('/', methods=['GET'])
def daily():
    if request.method == 'GET':
        try:
            edupage.login()
            timetable = edupage.get_timetable(EduDate.today())

        # Get current time
            current_time = EduTime.now()

            current_lesson = timetable.get(current_lesson)

            return str(current_lesson)
        except BadCredentialsException:
            print("Wrong username or password!")
        except LoginDataParsingException:
            print("Try again or open an issue!")

# Start with flask web app with debug as
# True only if this is the starting page
if(__name__ == "__main__"):
    app.run(debug=True)






