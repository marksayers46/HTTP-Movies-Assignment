import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import MovieForm from './Movies/MovieForm';
import AddMovie from './Movies/AddMovie'
import{ useHistory } from 'react-router-dom'
import styled from 'styled-components';

const MovieDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Button = styled.button`
  width: 100px;
  background-color: lightcoral;
`

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const { push } = useHistory()

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  },[]);

  return (
    <MovieDiv>
      <SavedList list={savedList} />
      <Button onClick={()=> { push("/add-movie") }}>Add A Movie</Button>

      <Route exact path="/">
        <MovieList getMovieList={getMovieList} movies={movieList} />
      </Route>
      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList} />
      </Route>
      <Route path='/update-movie/:id'>
        <MovieForm  getMovieList={getMovieList} movieList={movieList} setMovieList={movieList}/>
      </Route>
      <Route path="/add-movie">
        <AddMovie getMovieList={getMovieList}/>
      </Route>
    </MovieDiv>
  );
};

export default App;
