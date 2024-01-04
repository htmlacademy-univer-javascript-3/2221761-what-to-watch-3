export const getFilmRating = (rating: number) => {
  switch (true) {
    case rating < 3:
      return 'Bad';
    case rating < 5:
      return 'Normal';
    case rating < 8:
      return 'Good';
    case rating < 10:
      return 'Very Good';
    default:
      return 'Awesome';
  }
};
