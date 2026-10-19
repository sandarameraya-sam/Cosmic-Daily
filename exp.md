# Space Information App

A simple web app that shows NASA's **Astronomy Picture of the Day (APOD)**. 
You can view today's picture or search for the picture from any past date.

Built for a school API project using Python Flask, HTML, CSS, and JavaScript.

## Features

- Shows today's Astronomy Picture of the Day (image or video, title, date, and explanation)
- Search for the picture of any date since June 16, 1995
- Plays video entries (like YouTube links) directly on the page
- Shows a clear error message if something goes wrong (for example, too many requests)

## How It Works

```
Browser (HTML/CSS/JS)  ->  Flask server (app.py)  ->  NASA APOD API
```

1. The browser loads the page from Flask.
2. The JavaScript asks our own Flask route `/api/apod` for a picture (optionally with `?date=YYYY-MM-DD`).
3. Flask sends the request to NASA's API using the API key, then passes the result back.
4. The JavaScript displays the result on the page.

The API key stays on the server, so it is never exposed in the browser.

## Project Structure

```
space-info-app/
├── app.py              # Flask server and NASA API request
├── requirements.txt    # Python packages needed
├── templates/
│   └── index.html      # Page structure
└── static/
    ├── style.css       # Styling
    └── script.js       # Date search and page updates
```

## How to Run

1. Install Python 3 if you don't have it.
2. Open a terminal in the project folder.
3. Install the packages:
   ```
   pip install -r requirements.txt
   ```
4. Get a free API key at https://api.nasa.gov and put it in `app.py`:
   ```python
   NASA_API_KEY = "YOUR_KEY_HERE"
   ```
   (`DEMO_KEY` also works, but it is limited to 30 requests per hour.)
5. Start the app:
   ```
   python app.py
   ```
6. Open http://127.0.0.1:5000 in your browser.

## API Used

- **NASA APOD API**: https://api.nasa.gov (endpoint: `/planetary/apod`)
- Optional parameter used: `date` (format `YYYY-MM-DD`)

## Technologies

- Python 3, Flask, Requests
- HTML, CSS, JavaScript (Fetch API)

## Author

Your Name Here