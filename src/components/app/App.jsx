import './style.scss'

import React from 'react'
import { Spin, Alert, Pagination } from 'antd'
import { Offline, Online } from 'react-detect-offline'
import { debounce } from 'lodash'
// import { parseISO, format } from 'date-fns'

import MovieCard from '../movieCard/MovieCard'
import InputSearch from '../inputSearch/InputSearch'

// const date_str = '2016-11-28'
// console.log(format(parseISO(date_str), 'MMMM d, y'))
// console.log(format(new Date(date_str), 'MMMM d, y'))

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieData: [],
      loading: true,
      error: false,
      inputValue: '',
    }
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

  handlePagination = (e) => {
    const { inputValue } = this.state
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2JkNzUwYTNlOTEyYjgzNTI3NWVlYTYzYTRjMzVjYiIsInN1YiI6IjY1MmJjMmJjMWYzZTYwMDBmZjg2NGRhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3EmFICgjR_WYb03bWFdO24Qrzz_4TWwfS-Xe7lG-R2U',
      },
    }
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=${e}`,
      options
    )
      .then((response) => response.json())
      .then((data) => this.setState({ movieData: data.results, loading: false }))
      .catch((error) => {
        console.error(error)
        this.setState({ error: true, loading: true })
      })
  }

  handleTextOverflow = (text) => {
    const limit = 300
    if (text.length <= limit) {
      return text
    }
    const lastSpaceIndex = text.lastIndexOf(' ', limit)
    return text.substr(0, lastSpaceIndex) + '...'
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
                    backdropPath={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                        : 'https://cdn.pixabay.com/photo/2023/10/02/14/51/flowers-8289319_1280.png'
                    }
                    title={movie.title}
                    releaseDate={movie.release_date ? movie.release_date : '"no info about date, sorry"'}
                    genreIds={movie.genre_ids.length ? movie.genre_ids : '"no info about genre, sorry"'}
                    overview={
                      movie.overview ? this.handleTextOverflow(movie.overview) : '"no info about overview, sorry"'
                    }
                  />
                ))
              )}
            </div>
            <Pagination defaultCurrent={1} total={50} onChange={this.handlePagination} />
          </>
        </Online>
      </div>
    )
  }
}
