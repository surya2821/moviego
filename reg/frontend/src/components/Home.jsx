import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "./movieList";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [userMovies, setUserMovies] = useState([]);
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newMovieImage, setNewMovieImage] = useState("");

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
            .then(res => res.json())
            .then(data => setPopularMovies(data.results));

        fetch("/api/movies/getMovieLists")
            .then(res => res.json())
            .then(data => setUserMovies(data.lists[0]?.movies || []));
    }, []);

   const handleAddMovie = (e) => {
    e.preventDefault();

    const movie = {
        media_id: newMovieId  // TMDb API expects a media_id to add an item to a list
    };

      const handleAddMovie = (e) => {
        e.preventDefault();

        const movie = { title: newMovieTitle, imageUrl: newMovieImage };

        fetch("https://api.themoviedb.org/3/list/{list_id}/add_item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setUserMovies([...userMovies, movie]);
                setNewMovieTitle("");
                setNewMovieImage("");
            } else {
                alert("Error adding movie");
            }
        })
        .catch(error => console.error("Error:", error));
    };
    
    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {popularMovies.map(movie => (
                        <Link key={movie.id} style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`}>
                            <div className="posterImage">
                                <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.original_title} />
                            </div>
                            <div className="posterImage__overlay">
                                <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                                <div className="posterImage__runtime">
                                    {movie ? movie.release_date : ""}
                                    <span className="posterImage__rating">
                                        {movie ? movie.vote_average : ""}
                                        <i className="fas fa-star" />{" "}
                                    </span>
                                </div>
                                <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                            </div>
                        </Link>
                    ))}
                </Carousel>
                <MovieList />
            </div>

            <div className="add-movie-form">
                <form onSubmit={handleAddMovie}>
                    <input
                        type="text"
                        value={newMovieTitle}
                        onChange={(e) => setNewMovieTitle(e.target.value)}
                        placeholder="Movie Title"
                        required
                    />
                    <input
                        type="text"
                        value={newMovieImage}
                        onChange={(e) => setNewMovieImage(e.target.value)}
                        placeholder="Image URL"
                        required
                    />
                    <button type="submit">Add Movie</button>
                </form>
            </div>

            <div className="user-movie-lists">
                <h2>Your Movie List</h2>
                <div className="movie-list">
                    {userMovies.map((movie, index) => (
                        <div key={index} className="movie">
                            <img src={movie.imageUrl} alt={movie.title} />
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
