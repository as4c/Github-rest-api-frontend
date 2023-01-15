import React, { useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/${username}`
      );
      setUserData(response.data);
    } catch (err) {
      setError("Invalid GitHub username");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white justify-left p-6 rounded-lg "
      >
        <input
          className="bg-gray-500 p-2 rounded-lg"
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button
          className="bg-blue-500 text-white m-2 p-2 rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
      {isLoading && (
        <div className="text-center my-4">
          <p>Loading...</p>
        </div>
      )}
      <div className="bg-white border-gray-500 rounded-lg p-2 shadow shadow-emarald-300">
        {error && <div className="text-red-500">{error}</div>}
        {userData && (
          <div>
            <div className="flex items-center m-2 p-5 shadow shadow-emerald-500">
              <div className="flex-justify-left">
                <img
                  className=" w-32 h-32 rounded-full mr-4 "
                  src={userData.avatar_url}
                  alt={userData.name}
                />
                <div>
                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userData.html_url}
                  </a>
                </div>
              </div>
              <div className="justify-right m-5">
                <h2 className="text-xl font-medium block">
                  <strong>{userData.name}</strong>
                </h2>
                <p className="text-blue-700">
                  <i src="../public/location.png" className="w-2 h-2"></i>
                  {userData.location}
                </p>
                <p className="text-gray-700">{userData.bio}</p>
                <div className=" mb-4">
                  <div>
                    {userData.twitter_username && (
                      <a
                        className=""
                        href={userData.twitter_username}
                        rel="noopener noreferrer"
                      >
                        Twitter :
                      </a>
                    )}
                    {userData.email && <p>{userData.email}</p>}
                  </div>
                  <div className="">
                    <p className="inline ">
                      <strong>Following : {userData.following}</strong>
                    </p>
                    <p className="pl-3 inline">
                      <strong>Followers : {userData.followers}</strong>
                    </p>
                    <p>
                      <strong>public repos : </strong>
                      {userData.public_repos}
                    </p>
                    <p>
                      <strong>Account Created : </strong>
                      {userData.created_at}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Pagination userData={userData} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
