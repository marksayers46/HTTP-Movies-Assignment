import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { FormDiv, FormHolder } from '../Styled';
import axios from 'axios';

const initial = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
    }

export default function AddMovie(props){
    const [ newMovie, setnewMovie ] = useState(initial)

    const  {id}  = useParams();
    const { push } = useHistory();

    const handleChange = e =>  {
        setnewMovie({
            ...newMovie,
            [e.target.name]: e.target.value,
            id:id
            }
        )
    }

    const handleStars = e => {
        setnewMovie({
            ...newMovie,
            stars: e.target.value.split(",")
        })
    }

    const addMovie = e => {
        setnewMovie({
            ...newMovie,
        });
        e.preventDefault();
            axios
            .post(`http://localhost:5000/api/movies/`, newMovie)
            .then(res => push("/"))
            .then(res => props.getMovieList())
            .catch(err => console.error(err.message, err.response))
    }

    return(
        <FormHolder>
            <FormDiv >
                <input onChange={handleChange} name='title' value={newMovie.title} placeholder="Movie Title"/>
                <input onChange={handleChange} name='director' value={newMovie.director}placeholder="Director"/>
                <input onChange={handleChange} name='metascore' value={newMovie.metascore}placeholder="Metascore"/> 
                <input onChange={handleStars} name='stars' value={newMovie.stars}placeholder="Stars names separated by commas"/> 

                <button onClick={addMovie}>Add!</button>
            </FormDiv>
        </FormHolder>
    )
}