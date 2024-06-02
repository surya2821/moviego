import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    }

    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://media.istockphoto.com/id/1207316492/vector/print.jpg?s=612x612&w=0&k=20&c=m1Ezv7Fef-aq8CEp9UptA069TZNgGOJNb2VbQnsZpA0=" alt="Logo" /></Link>
                <Link to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Upcoming</span></Link>
            </div>
        </div>
    )
}

export default Header;
