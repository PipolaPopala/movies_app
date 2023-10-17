import './style.scss'

import { Spin, Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'
// import { parseISO, format } from 'date-fns'
import React from 'react'

import MovieCard from '../movieCard/MovieCard'

// const dateStr = '2016-01-01'
// const date = parseISO(dateStr)
// const formattedDate = format(date, 'MMMM d, yyyy')
// console.log(formattedDate) // выведет "January 1, 2016"
// console.log(format(parseISO(dateStr), 'MMMM d, yyyy'))

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
    fetch('https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1', options)
      .then((response) => response.json())
      .then((data) => this.setState({ movieData: data.results, loading: false }))
      .catch((err) => {
        console.error(err)
        this.setState({ error: true, loading: true })
      })
  }

  render() {
    const { movieData, loading, error } = this.state
    return (
      <div className="container">
        <Offline>
          <Alert message="No Internet Connection" type="error" showIcon />
        </Offline>

        <Online>
          {error ? (
            <Alert message="Error" description="Where have all the movies gone?!" type="error" showIcon />
          ) : loading ? (
            <Spin />
          ) : (
            <>
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
            </>
          )}
        </Online>
      </div>
    )
  }
}
