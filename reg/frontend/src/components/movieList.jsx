import React, { useEffect, useState, useCallback } from "react";
import "./movieList.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Cards from "./card";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const { type } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get("query");

    const getData = useCallback(() => {
        let url = `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
        if (query) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${query}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => setMovieList(data.results));
    }, [type, query]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleSearch = () => {
        if (searchInput.trim()) {
            navigate(`?query=${searchInput}`);
        }
    };

    return (
        <center>
        <div className="header-list">
            
            <header>
                <div id="search-container">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search for a movie..."
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </header>
            <h2 className="list__title">{(type ? type : query ? `Search results for "${query}"` : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {movieList.map((movie) => (
                    <Cards key={movie.id} movie={movie} />
                ))}
                
            </div>
        </div>
        </center>
    );
};

export default MovieList;
