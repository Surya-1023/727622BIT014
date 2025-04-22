import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopUsers from "./pages/TopUsers";
import TrendingPosts from "./pages/TrendingPosts";

const App = () => (
  <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/trending-posts" element={<TrendingPosts />} />
        <Route path="*" element={<TopUsers />} />
      </Routes>
    </Router>
  </div>
);

export default App;