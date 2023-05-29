from flask import Flask, render_template
import os

app = Flask(__name__, template_folder='static')

@app.route('/')
def index():
    # Render the index.html page from the "static" directory
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
