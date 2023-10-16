import './style.scss'

import { Spin, Alert } from 'antd'
import React from 'react'

import MovieCard from '../movieCard/MovieCard'

export default class App extends React.Component {
  state = {
    movieData: [],
    loading: true,
    error: false,
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
    fetch(
      'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1000',
      options
    )
      .then((response) => response.json())
      .then((data) => this.setState({ movieData: data.results, loading: false }))
      .catch((err) => {
        console.error(err)
        this.setState({ error: true, loading: true })
      })
  }

  render() {
    const { movieData, loading, error } = this.state
    if (error) {
      return (
        <div className="container">
          <Alert message="Error" description="Where have all the movies gone?!" type="error" showIcon />
        </div>
      )
    } else if (loading) {
      return (
        <div className="container">
          <Spin />
        </div>
      )
    } else {
      return (
        <div className="container">
          {movieData.map((movie) => (
            <MovieCard
              key={movie.id}
              backdropPath={movie.backdrop_path}
              title={movie.title}
              releaseDate={movie.release_date}
              genreIds={movie.genre_ids}
              overview={movie.overview}
            />
          ))}
        </div>
      )
    }
  }
}
