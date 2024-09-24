import { getMovieReviewData } from "./data.js";

function init() {
  const movieReviewData = getMovieReviewData();
  paintStatistics(movieReviewData);
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

init();
