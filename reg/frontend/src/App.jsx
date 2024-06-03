import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import MovieList from "./components/movieList";
import Movie from "./components/movie";
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={() => <><Header /><Home /></>} />} />
          <Route path="/movie/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={() => <><Header /><Movie /></>} />} />
          <Route path="/movies/:type" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={() => <><Header /><MovieList /></>} />} />
          <Route path="/*" element={<h1>Error Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
