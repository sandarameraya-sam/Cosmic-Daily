from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

# NASA's shared demo key works with no signup, but it's rate-limited
# (30 requests/hour, 50/day) and shared by everyone using it.
# Get your own free key in 30 seconds at https://api.nasa.gov
# then replace the string below.
NASA_API_KEY = "AreHYYtAg1qAUoses5Y38sOz8C3fpC3joPCwVfWr"

NASA_APOD_URL = "https://api.nasa.gov/planetary/apod"


@app.route("/")
def home():
    """Serves the main page."""
    return render_template("index.html")


@app.route("/api/apod")
def get_apod():
    """
    Fetches the Astronomy Picture of the Day from NASA.
    Optional query param: ?date=YYYY-MM-DD
    If no date is given, NASA returns today's picture.
    """
    date = request.args.get("date")  # None if not provided

    params = {"api_key": NASA_API_KEY}
    if date:
        params["date"] = date

    response = requests.get(NASA_APOD_URL, params=params)

    # Pass NASA's response (and status code) straight back to the browser.
    return jsonify(response.json()), response.status_code


if __name__ == "__main__":
    app.run(debug=True)