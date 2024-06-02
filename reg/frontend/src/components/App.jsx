import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import MovieList from "./movieList";
import Movie from "./movie";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

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
