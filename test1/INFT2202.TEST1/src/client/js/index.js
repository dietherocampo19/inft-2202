import { movies } from '../data/movies.js';

console.log('Movies loaded:', movies);

const allMoviesContainer = document.getElementById('all-movies-container');
const pinnedMoviesContainer = document.getElementById('pinned-movies-container');
const allMoviesTable = allMoviesContainer.querySelector('table');
const pinnedMoviesTable = pinnedMoviesContainer.querySelector('table');
const pinnedMoviesCheck = pinnedMoviesContainer.querySelector('.check');

allMoviesTable.classList.remove('d-none');
insertMoviesIntoTable(allMoviesTable, movies);

const pinnedMovies = getPinnedMoviesFromStorage();
console.log('Pinned movies:', pinnedMovies);

if (pinnedMovies.length === 0) {
    pinnedMoviesCheck.classList.remove('d-none');
} else {
    pinnedMoviesTable.classList.remove('d-none');
    insertMoviesIntoTable(pinnedMoviesTable, pinnedMovies, true);
}


function getPinnedMoviesFromStorage() {
    const pinnedMoviesJSON = localStorage.getItem('pinnedMovies');
    
    if (!pinnedMoviesJSON) {
        return [];
    }
    
    return JSON.parse(pinnedMoviesJSON);
}

function insertMoviesIntoTable(eleTable, moviesArray, isPinnedTable = false) {
    const tableBody = eleTable.querySelector('tbody');
    tableBody.innerHTML = '';
    
    const pinnedMovies = getPinnedMoviesFromStorage();
    const pinnedMovieTitles = new Set(pinnedMovies.map(movie => movie.title));
    
    const filteredMovies = isPinnedTable ? 
        moviesArray : 
        moviesArray.filter(movie => movie.genre !== 'Drama');
    
    filteredMovies.sort((a, b) => b.rating - a.rating);
    
    filteredMovies.forEach(movie => {
        const row = document.createElement('tr');
        
        if (movie.rating > 8) {
            row.classList.add('table-success'); // Good rating
        } else if (movie.rating > 5) {
            row.classList.add('table-primary'); // Okay rating
        } else if (movie.rating > 2) {
            row.classList.add('table-warning'); // Somewhat okay rating
        } else {
            row.classList.add('table-danger'); // Low rating
        }
        
        
        // Title
        const titleCell = document.createElement('td');
        titleCell.textContent = movie.title;
        row.appendChild(titleCell);
        
        // Genre
        const genreCell = document.createElement('td');
        genreCell.textContent = movie.genre;
        row.appendChild(genreCell);
        
        // Release Date 
        const releaseDateCell = document.createElement('td');
        const releaseDate = new Date(movie.release_date * 1000);
        releaseDateCell.textContent = releaseDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        row.appendChild(releaseDateCell);
        
        // Director
        const directorCell = document.createElement('td');
        directorCell.textContent = movie.director;
        row.appendChild(directorCell);
        
        // Rating
        const ratingCell = document.createElement('td');
        ratingCell.textContent = movie.rating;
        row.appendChild(ratingCell);
        
        // Action button
        const actionCell = document.createElement('td');
        const actionButton = document.createElement('button');
        
        if (isPinnedTable) {
            // Unpin button
            actionButton.classList.add('btn', 'btn-danger', 'btn-sm');
            actionButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // X icon
            
            actionButton.addEventListener('click', () => {
                // Remove pinnedMovies
                const updatedPinnedMovies = pinnedMovies.filter(
                    pinnedMovie => pinnedMovie.title !== movie.title
                );
                localStorage.setItem('pinnedMovies', JSON.stringify(updatedPinnedMovies));

                window.location.reload();
            });
        } else {
            // Pin button
            const isPinned = pinnedMovieTitles.has(movie.title);
            
            if (isPinned) {
                actionButton.classList.add('btn', 'btn-danger', 'btn-sm');
                actionButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'; // X icon
            } else {
                actionButton.classList.add('btn', 'btn-primary', 'btn-sm');
                actionButton.innerHTML = '<i class="fa-solid fa-thumbtack"></i>'; // Pin icon
            }
            
            actionButton.addEventListener('click', () => {
                if (isPinned) {
                    // Remove pinnedMovies
                    const updatedPinnedMovies = pinnedMovies.filter(
                        pinnedMovie => pinnedMovie.title !== movie.title
                    );
                    localStorage.setItem('pinnedMovies', JSON.stringify(updatedPinnedMovies));
                } else {
                    // Add pinnedMovies
                    pinnedMovies.push(movie);
                    localStorage.setItem('pinnedMovies', JSON.stringify(pinnedMovies));
                }
                
                window.location.reload();
            });
        }
        
        actionCell.appendChild(actionButton);
        row.appendChild(actionCell);
        
        tableBody.appendChild(row);
    });
}