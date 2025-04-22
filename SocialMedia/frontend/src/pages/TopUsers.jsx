import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const API_BASE = "http://20.244.56.144/evaluation-service";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ1MzA4MTg3LCJpYXQiOjE3NDUzMDc4ODcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjFmZWMyYTdjLTdhZjYtNGRlNS05MThiLWJlOWJiZDk5ZWFkZCIsInN1YiI6IjcyNzYyMmJpdDAxNEBtY2V0LmluIn0sImVtYWlsIjoiNzI3NjIyYml0MDE0QG1jZXQuaW4iLCJuYW1lIjoic3VyeWEgbiIsInJvbGxObyI6IjcyNzYyMmJpdDAxNCIsImFjY2Vzc0NvZGUiOiJqdEJ1enUiLCJjbGllbnRJRCI6IjFmZWMyYTdjLTdhZjYtNGRlNS05MThiLWJlOWJiZDk5ZWFkZCIsImNsaWVudFNlY3JldCI6IllVdWhxVW1WYkJuTUVVZ0sifQ.Dee1ycKr7Du7sYHPpryelMWnGe8GLRolo1_DeKzUNJ4"; 

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopUsers = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      };

      const response = await axios.get(`${API_BASE}/users`, { headers });
      const usersObject = response.data.users || response.data; 
      console.log("Fetched users:", usersObject); 

      const usersArray = Object.entries(usersObject).map(([id, name]) => ({
        id,
        name,
      }));

      console.log("Users Array:", usersArray); 

      const userStats = await Promise.all(
        usersArray.map(async (user) => {
          try {
            const { data: postsData } = await axios.get(
              `${API_BASE}/users/${user.id}/posts`,
              { headers }
            );
            const posts = postsData.posts || postsData;

            let commentCount = 0;
            for (let post of posts) {
              const { data: commentsData } = await axios.get(
                `${API_BASE}/posts/${post.id}/comments`,
                { headers }
              );
              commentCount += (commentsData.comments || []).length;
            }

            return { ...user, commentCount };
          } catch {
            return { ...user, commentCount: 0 };
          }
        })
      );

      console.log("User Stats:", userStats); 

      const sorted = userStats
        .sort((a, b) => b.commentCount - a.commentCount)
        .slice(0, 5);

      setTopUsers(sorted);
    } catch (err) {
      console.error("Failed to fetch top users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopUsers();
  }, []);

  const maxComments = Math.max(...topUsers.map((u) => u.commentCount), 1);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Top 5 Users by Comments</h2>
        <button
          onClick={fetchTopUsers}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <ul className="space-y-4">
          {topUsers.length === 0 ? (
            <p>No users available or failed to fetch data.</p>
          ) : (
            topUsers.map((user) => (
              <li
                key={user.id}
                className="p-4 bg-white dark:bg-gray-800 rounded shadow"
              >
                <p className="font-semibold mb-1">{user.name}</p>
                <p className="text-sm mb-2">Total Comments: {user.commentCount}</p>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded h-4">
                  <div
                    className="bg-blue-500 h-4 rounded"
                    style={{
                      width: `${(user.commentCount / maxComments) * 100}%`,
                    }}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default TopUsers;
