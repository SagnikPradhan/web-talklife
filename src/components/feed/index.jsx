import "./style.scss";
import Post from "../post";
import { useState, useEffect } from "react";

// Constants
const APIBaseUrl = "https://web.talklife.co/api";

const getPayload = (url) =>
  fetch(url, {
    headers: { "Access-Control-Allow-Origin": "*" },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);
      else return res;
    })
    .then((res) => res.json())
    .catch((err) => {
      if (err instanceof Error) console.error(err);
      else console.error(new Error(err));
    });

// API Method
const Endpoints = {
  FEED: (count = 30) => APIBaseUrl + `/feed?count=${count}`,
  LATEST_FEED: (lastPostId) => APIBaseUrl + `/feed/latest?lastid=${lastPostId}`,
};

// Map data to posts
function mapPost(data) {
  // Calculate span length for grid
  // Based on content length
  function calcluateListSpanLen(textLen) {
    if (textLen >= 600) return 5;
    if (textLen >= 500) return 4;
    if (textLen >= 400) return 4;
    if (textLen >= 300) return 3;
    if (textLen >= 200) return 3;
    if (textLen >= 180) return 3;
    return 2;
  }

  const listGridSpanLen = calcluateListSpanLen(data.content.length);
  const style = { gridRow: `span ${listGridSpanLen}` };

  return (
    <li id={data.id} className="post" key={data.id} style={style}>
      <Post data={data} />
    </li>
  );
}

// Feed Component itself
function FeedComponent() {
  const [{ posts }, setState] = useState({
    posts: {},
  });

  // Intersection observer for infinite scroll and loading posts
  const observer = new IntersectionObserver((entry) => {
    const main = async () => {
      // If no posts have been loaded get new posts
      const postArr = Object.values(posts)
      const lastPost = postArr.find((p) => postArr.every(x => x.id < p.id))
      const response = lastPost
        ? await getPayload(Endpoints.LATEST_FEED(lastPost.id))
        : await getPayload(Endpoints.FEED())
 
      for (const post of response) posts[post.id] = post;
      setState({ posts });
    };

    if (entry[0].intersectionRatio > 0) main().catch(console.error);
  });

  return (
    <>
      <ul id="feed">{Object.values(posts).sort((a, b) => a.id - b.id).map(mapPost)}</ul>
      <h2
        id="loading-message"
        ref={(loadingRef) => loadingRef && observer.observe(loadingRef)}
      >
        Loading
      </h2>
    </>
  );
}

export default FeedComponent;
