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

export default function MovieForm(props){
    const [ updatedMovie, setUpdatedMovie ] = useState(initial)

    const  {id}  = useParams();
    const { push } = useHistory();

    const handleChange = e =>  {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value,
            id:id
            }
        )
    }

    const handleStars = e => {
        setUpdatedMovie({
            ...updatedMovie,
            stars: e.target.value.split(",")
        })
    }

    const submitMovieEdit = e => {
        setUpdatedMovie({
            ...updatedMovie,
        });
        console.log(updatedMovie)
        e.preventDefault();
            axios
            .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then(res => push("/"))
            .then(res => props.getMovieList())
            .catch(err => console.error(err.message, err.response))
    }

    return(
        <FormHolder>
            <FormDiv >
                <input onChange={handleChange} name='title' value={updatedMovie.title} placeholder="Movie Title"/>
                <input onChange={handleChange} name='director' value={updatedMovie.director}placeholder="Director"/>
                <input onChange={handleChange} name='metascore' value={updatedMovie.metascore}placeholder="Metascore"/> 
                <input onChange={handleStars} name='stars' value={updatedMovie.stars}placeholder="Stars names separated by commas"/> 

                <button onClick={submitMovieEdit}>Submit Edit</button>
            </FormDiv>
        </FormHolder>
    )
}