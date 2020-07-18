import "./style.scss";
import Post from "../post";
import { useState, useEffect } from "react";

export default () => {
  const [feed, setFeed] = useState([]);

  const APIBaseUrl = "https://web.talklife.co/api";
  const feedUrl = APIBaseUrl + "/feed?count=10";

  useEffect(() => {
    const main = async () => {
      const res = await fetch(feedUrl);
      const body = await res.json();

      setFeed(body);
    };

    main().catch((err) => console.error(err));
  }, []);

  return (
    <ul id="feed">
      {feed.map((data) => (
        <Post data={data} />
      ))}
    </ul>
  );
};
