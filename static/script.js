// Step 3: handle images vs. videos, and small UX polish.

const container = document.getElementById("apod-container");
const form = document.getElementById("date-form");
const dateInput = document.getElementById("date-input");
const todayBtn = document.getElementById("today-btn");
const searchBtn = form.querySelector("button[type='submit']");

function setLoading(isLoading) {
    searchBtn.disabled = isLoading;
    todayBtn.disabled = isLoading;
}

async function loadApod(date) {
    setLoading(true);
    container.innerHTML = "<p>Loading...</p>";

    let url = "/api/apod";
    if (date) {
        url += `?date=${date}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            const message = data.msg || data.error?.message || "Could not load that date.";
            container.innerHTML = `<p class="error-message">Error: ${message}</p>`;
            return;
        }

        // Build the media element depending on whether it's an image or a video.
        let mediaHtml;
        if (data.media_type === "video") {
            // Most APOD videos are YouTube links, which can be embedded directly in an iframe.
            mediaHtml = `<iframe src="${data.url}" allowfullscreen title="${data.title}"></iframe>`;
        } else {
            // Use hdurl (higher resolution) if available, otherwise the normal url.
            const imageSrc = data.hdurl || data.url;
            mediaHtml = `<img src="${imageSrc}" alt="${data.title}">`;
        }

        container.innerHTML = `
            <h2>${data.title}</h2>
            <p class="date-label"><em>${data.date}</em></p>
            ${mediaHtml}
            <p class="explanation">${data.explanation}</p>
        `;
    } catch (error) {
        container.innerHTML = "<p class='error-message'>Something went wrong loading the picture.</p>";
        console.error(error);
    } finally {
        setLoading(false);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const chosenDate = dateInput.value;
    if (chosenDate) {
        loadApod(chosenDate);
    }
});

todayBtn.addEventListener("click", () => {
    dateInput.value = "";
    loadApod();
});

loadApod();