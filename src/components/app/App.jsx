import './style.scss'

import React from 'react'
import { Spin, Alert, Pagination } from 'antd'
import { Offline, Online } from 'react-detect-offline'
import { debounce } from 'lodash'
// import { parseISO, format } from 'date-fns'

import MovieCard from '../movieCard/MovieCard'
import InputSearch from '../inputSearch/InputSearch'

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
    inputValue: '',
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
    this.debouncedSearchMovie(e.target.value)
  }

  debouncedSearchMovie = debounce((value) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2JkNzUwYTNlOTEyYjgzNTI3NWVlYTYzYTRjMzVjYiIsInN1YiI6IjY1MmJjMmJjMWYzZTYwMDBmZjg2NGRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3EmFICgjR_WYb03bWFdO24Qrzz_4TWwfS-Xe7lG-R2U',
      },
    }
    this.setState({ loading: true })
    fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`, options)
      .then((response) => response.json())
      .then((data) => this.setState({ movieData: data.results, loading: false }))
      .catch((error) => {
        console.error(error)
        this.setState({ error: true, loading: true })
      })
  }, 800)

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
      .catch((error) => {
        console.error(error)
        this.setState({ error: true, loading: true })
      })
  }

  render() {
    const { movieData, loading, error } = this.state
    return (
      <div className="body-wrapper">
        <Offline>
          <Alert message="No Internet Connection 😵‍💫" type="error" showIcon />
        </Offline>
        <Online>
          <>
            <InputSearch value={this.state.inputValue} onInputChange={this.handleInputChange} />
            <div className="container">
              {error ? (
                <Alert message="Error" description="Where have all the movies gone?! 🤯" type="error" showIcon />
              ) : loading ? (
                <Spin size="large" />
              ) : movieData.length === 0 ? (
                <Alert message="I didn't find a movie with that name 😭" type="info" showIcon />
              ) : (
                movieData.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    backdropPath={movie.backdrop_path}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    genreIds={movie.genre_ids}
                    overview={movie.overview}
                  />
                ))
              )}
            </div>
            <Pagination defaultCurrent={1} total={10} pageSize={6} />
          </>
        </Online>
      </div>
    )
  }
}
