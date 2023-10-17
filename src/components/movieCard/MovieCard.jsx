import './style.scss'

export default function MovieCard({ backdropPath, title, releaseDate, genreIds, overview }) {
  return (
    <div className={'movie-card'}>
      {/* <img src="" alt="" /> */}
      <div className="movie-card__img">backdrop_path: {backdropPath}</div>
      <div className="movie-card__info-wrapper">
        <p className="movie-card__title">title: {title}</p>
        <p className="movie-card__date">release_date: {releaseDate}</p>
        <p className="movie-card__genres">genre_ids: {genreIds}</p>
        <p className="movie-card__overview">overview: {overview}</p>
      </div>
    </div>
  )
}
