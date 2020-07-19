import "./style.scss";
import Post from "../post";
import { useState, useEffect } from "react";

// Constants
const APIBaseUrl = "https://web.talklife.co/api";

// Stub values for useEffect
const componentOnMount = [];

function loadInitPosts(setFeed) {
  const feedUrl = APIBaseUrl + "/feed?count=30";

  fetch(feedUrl, {
    headers: { "Access-Control-Allow-Origin": "*" },
  })
    .then((res) => res.json())
    .then((body) => setFeed(body))
    .catch((err) => {
      if (err instanceof err) console.error(err);
      else console.error(new Error(err));
    });
}

// Component itself
function component() {
  const [feed, setFeed] = useState([]);

  useEffect(() => loadInitPosts(setFeed), componentOnMount);

  return (
    <ul id="feed">
      {feed.map((data) => (
        <Post key={data.id} data={data} />
      ))}
    </ul>
  );
}

export default component;
