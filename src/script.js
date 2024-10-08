import { getMovieReviewData } from "./data.js";
let sortDesc = false;

function init() {
  const movieReviewData = getMovieReviewData();
  paintStatistics(movieReviewData);
  paintMovieData(movieReviewData);
  buttonHandler(movieReviewData);
}

function paintStatistics(movieReviewData) {
  const flatMovieReviewData = movieReviewData.flat();
  const totalMovies = movieReviewData.length;
  console.log(totalMovies);
  const totalReview = flatMovieReviewData.length;
  console.log(totalReview);

  const totalRating = flatMovieReviewData.reduce((acc, item) => {
    return acc + item.rating;
  }, 0);
  console.log(totalRating);
  const avarageRating = (totalRating / totalReview).toFixed(2);
  console.log(avarageRating);

  // dom manupulation

  const totalMovie = document.getElementById("totalMoviesId");
  addStat(totalMovie, totalMovies);

  const totalAvgRating = document.getElementById("totalAvgRatingId");
  addStat(totalAvgRating, avarageRating);
  const totalReviews = document.getElementById("totalReviwId");
  addStat(totalReviews, totalReview);
}

function addStat(element, value) {
  const spanElement = document.createElement("span");
  spanElement.innerText = value;
  element.appendChild(spanElement);
}

function paintMovieData(movieReviewData) {
  const flatReviewData = movieReviewData.flat();
  const sortedMovie = flatReviewData.toSorted((a, b) => a.on - b.on);
  const movielistEl = document.querySelector("#moviesListId UL");
  addMovieReviewData(movielistEl, sortedMovie);
}
function buttonHandler(movieReviewData) {
  const sortingHandleButton = document.getElementById("sortBtnId");
  sortingHandleButton.addEventListener("click", () =>
    sortByReview(movieReviewData)
  );
}

function sortByReview(movieReviewData) {
  sortDesc = !sortDesc;
  const movielistEl = document.querySelector("#moviesListId UL");
  const flatReviewData = movieReviewData.flat();

  const sortReviewData = sortDesc
    ? flatReviewData.toSorted((a, b) => b.rating - a.rating)
    : flatReviewData.toSorted((a, b) => a.rating - b.rating);
  removeAllChildNodes(movielistEl);
  addMovieReviewData(movielistEl, sortReviewData);
}

function addMovieReviewData(movielistEl, sortedMovie) {
  sortedMovie.map((movie) => {
    const liElem = document.createElement("li");
    liElem.classList.add("card", "my-2", "p-2");

    const titleElem = document.createElement("p");
    titleElem.classList.add("text-xl", "mb-2");
    titleElem.innerText = `${movie.title} - ${movie.rating}`;
    liElem.appendChild(titleElem);

    const reviewElem = document.createElement("p");
    reviewElem.classList.add("text-xl", "mb-2");
    reviewElem.innerText = `${movie.content}`;
    liElem.appendChild(reviewElem);

    const byElem = document.createElement("p");
    byElem.classList.add("text-xl", "mb-2");
    byElem.innerText = `${movie.by} on ${new Intl.DateTimeFormat(
      "en-BD"
    ).format(movie.on)} `;
    liElem.appendChild(byElem);

    movielistEl.appendChild(liElem);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
init();
