import { movies } from "./movies.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Loaded movies:", movies); // Debugging: Ensure movies load properly

    const allMoviesTable = document.querySelector("#all-movies-container table");
    const pinnedMoviesTable = document.querySelector("#pinned-movies-container table");
    const allMoviesAlert = document.querySelector("#all-movies-container .alert");
    const pinnedMoviesAlert = document.querySelector("#pinned-movies-container .alert");

    let pinnedMovies = getPinnedMoviesFromStorage();
    console.log("Loaded pinned movies:", pinnedMovies); // Debugging: Ensure pinned movies load properly

    if (pinnedMovies.length === 0) {
        pinnedMoviesAlert.classList.remove("d-none");
        pinnedMoviesTable.classList.add("d-none");
    } else {
        pinnedMoviesAlert.classList.add("d-none");
        pinnedMoviesTable.classList.remove("d-none");
        insertMoviesIntoTable(pinnedMoviesTable, pinnedMovies);
    }

    insertMoviesIntoTable(allMoviesTable, movies.filter(movie => movie.genre !== "Drama"));
});

/**
 * Retrieve pinned movies from local storage.
 * @returns {Array} An array of pinned movies.
 */
function getPinnedMoviesFromStorage() {
    return JSON.parse(localStorage.getItem("pinnedMovies")) || [];
}

/**
 * Inserts movies into the given table and applies sorting, styling, and pinning logic.
 * @param {HTMLElement} eleTable - The table to populate.
 * @param {Array} movies - The list of movies to insert.
 */
function insertMoviesIntoTable(eleTable, movies) {
    const tbody = eleTable.querySelector("tbody");
    tbody.innerHTML = ""; // Clear previous content

    // Sort movies by rating (highest to lowest)
    movies.sort((a, b) => b.rating - a.rating);

    movies.forEach(movie => {
        const row = document.createElement("tr");

        // Apply row color based on rating
        if (movie.rating <= 2) row.classList.add("table-danger"); // Red
        else if (movie.rating <= 5) row.classList.add("table-warning"); // Orange
        else if (movie.rating <= 8) row.classList.add("table-primary"); // Blue
        else row.classList.add("table-success"); // Green

        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>${new Date(movie.release_date * 1000).toLocaleDateString()}</td>
            <td>${movie.director}</td>
            <td>${movie.rating}</td>
            <td><button class="btn ${isPinned(movie) ? "btn-danger" : "btn-primary"} pin-btn" data-title="${movie.title}">
                <i class="fa ${isPinned(movie) ? "fa-times" : "fa-pencil"}"></i>
            </button></td>
        `;

        tbody.appendChild(row);
    });

    // Add event listeners for pin buttons
    tbody.querySelectorAll(".pin-btn").forEach(button => {
        button.addEventListener("click", () => {
            togglePinMovie(button.getAttribute("data-title"));
        });
    });
}

/**
 * Checks if a movie is already pinned.
 * @param {Object} movie - The movie object to check.
 * @returns {boolean} - True if the movie is pinned, false otherwise.
 */
function isPinned(movie) {
    const pinnedMovies = getPinnedMoviesFromStorage();
    return pinnedMovies.some(m => m.title === movie.title);
}

/**
 * Toggles a movie's pin status.
 * @param {string} title - The movie title to pin/unpin.
 */
function togglePinMovie(title) {
    let pinnedMovies = getPinnedMoviesFromStorage();
    const movie = movies.find(m => m.title === title);

    if (!movie) return;

    if (isPinned(movie)) {
        pinnedMovies = pinnedMovies.filter(m => m.title !== title);
    } else {
        pinnedMovies.push(movie);
    }

    localStorage.setItem("pinnedMovies", JSON.stringify(pinnedMovies));
    location.reload(); // Refresh page to update UI
}
