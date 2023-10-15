import './style.scss'

export default function MovieCard({ backdrop_path, title, release_date, genre_ids, overview }) {
  return (
    <div className={'movie-card'}>
      {/* <img src="" alt="" /> */}
      <span>backdrop_path: {backdrop_path}</span>
      <div>
        <span>title: {title}</span>
        <span>release_date: {release_date}</span>
        <span>genre_ids: {genre_ids}</span>
        <span>overview: {overview}</span>
      </div>
    </div>
  )
}
