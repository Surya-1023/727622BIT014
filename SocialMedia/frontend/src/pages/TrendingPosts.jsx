import React, { useEffect, useState } from "react";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://20.244.56.144/evaluation-service/users/2/posts", {
        headers: {
          
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ1MzA4MTg3LCJpYXQiOjE3NDUzMDc4ODcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjFmZWMyYTdjLTdhZjYtNGRlNS05MThiLWJlOWJiZDk5ZWFkZCIsInN1YiI6IjcyNzYyMmJpdDAxNEBtY2V0LmluIn0sImVtYWlsIjoiNzI3NjIyYml0MDE0QG1jZXQuaW4iLCJuYW1lIjoic3VyeWEgbiIsInJvbGxObyI6IjcyNzYyMmJpdDAxNCIsImFjY2Vzc0NvZGUiOiJqdEJ1enUiLCJjbGllbnRJRCI6IjFmZWMyYTdjLTdhZjYtNGRlNS05MThiLWJlOWJiZDk5ZWFkZCIsImNsaWVudFNlY3JldCI6IllVdWhxVW1WYkJuTUVVZ0sifQ.Dee1ycKr7Du7sYHPpryelMWnGe8GLRolo1_DeKzUNJ4",
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();
      console.log("API response:", json);


      const posts = Array.isArray(json) ? json : json.posts;

      if (!Array.isArray(posts)) {
        console.error("Expected array but got:", posts);
        return;
      }

      const sortedPosts = posts
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 10);

      setTrendingPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching trending posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Trending Posts</h1>
      <button
        onClick={fetchTrendingPosts}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-500 transition"
      >
        Refresh
      </button>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <ul className="space-y-4">
          {trendingPosts.map((post, index) => (
            <li
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <p className="font-semibold">{post.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {post.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendingPosts;
