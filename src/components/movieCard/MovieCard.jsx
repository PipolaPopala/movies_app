import './style.scss'

export default function MovieCard({ backdropPath, title, releaseDate, genreIds, overview }) {
  return (
    <div className={'movie-card'}>
      <div className="movie-card__img-wrapper">
        <img className="movie-card__img" src={backdropPath} alt="movie image" />
      </div>
      <div className="movie-card__info-wrapper">
        <p className="movie-card__title">{title}</p>
        <p className="movie-card__date">{releaseDate}</p>
        <p className="movie-card__genres">{genreIds}</p>
        <p className="movie-card__overview">{overview}</p>
      </div>
    </div>
  )
}
