import './style.scss'

import React from 'react'

import MovieCard from '../movieCard/MovieCard'

export default class App extends React.Component {
  state = {
    movieData: [],
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2JkNzUwYTNlOTEyYjgzNTI3NWVlYTYzYTRjMzVjYiIsInN1YiI6IjY1MmJjMmJjMWYzZTYwMDBmZjg2NGRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3EmFICgjR_WYb03bWFdO24Qrzz_4TWwfS-Xe7lG-R2U',
      },
    }
    fetch('https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1', options)
      .then((response) => response.json())
      .then((data) => this.setState({ movieData: data.results }))
      .catch((err) => console.error(err))
  }

  render() {
    const { movieData } = this.state
    return (
      <div className="container">
        {movieData.map((movie) => (
          <MovieCard
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            title={movie.title}
            release_date={movie.release_date}
            genre_ids={movie.genre_ids}
            overview={movie.overview}
          />
        ))}
      </div>
    )
  }
}
