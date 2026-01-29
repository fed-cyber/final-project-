function openMovie(title) {
    localStorage.setItem("currentMovie", title);
    window.location.href = "movie.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const movieTitle = document.getElementById("movieTitle");
    const reviewForm = document.getElementById("reviewForm");
    const reviewsDiv = document.getElementById("reviews");

    if (movieTitle) {
        const currentMovie = localStorage.getItem("currentMovie");
        movieTitle.textContent = currentMovie;
        loadReviews(currentMovie);
    }

    if (reviewForm) {
        reviewForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const rating = document.getElementById("rating").value;
            const review = document.getElementById("review").value;
            const movie = localStorage.getItem("currentMovie");

            const newReview = { name, rating, review };

            let allReviews = JSON.parse(localStorage.getItem("reviews")) || {};
            if (!allReviews[movie]) {
                allReviews[movie] = [];
            }

            allReviews[movie].push(newReview);
            localStorage.setItem("reviews", JSON.stringify(allReviews));

            reviewForm.reset();
            loadReviews(movie);
        });
    }

    function loadReviews(movie) {
        reviewsDiv.innerHTML = "";
        const allReviews = JSON.parse(localStorage.getItem("reviews")) || {};
        const movieReviews = allReviews[movie] || [];

        movieReviews.forEach(r => {
            const div = document.createElement("div");
            div.innerHTML = `<strong>${r.name}</strong> (${r.rating}/5)<br>${r.review}<hr>`;
            reviewsDiv.appendChild(div);
        });
    }
});
