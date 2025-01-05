import axios from "axios";
import { useEffect, useState } from "react";

export default function JokeList() {
  const [jokeResponse, setJokesResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJokes = async () => {
    try {
      const response = await axios.get("https://v2.jokeapi.dev/joke/dark");
      setJokesResponse(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <h1>this is a list of joke</h1>
          <h2>category:{jokeResponse.category}</h2>
          <h3>delivery:{jokeResponse.delivery}</h3>
        </div>
      )}
    </div>
  );
}
