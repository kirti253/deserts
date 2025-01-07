import { useState } from "react";
import { PostComponent } from "./post";
import { GoBellFill } from "react-icons/go";

function App() {
  const [posts, setposts] = useState([]);
  function addPosts() {
    setposts([
      ...posts,
      {
        name: "kirti",
        subtit: "2000 followers",
        time: "2m ago",
        image:
          "https://imgs.search.brave.com/F5OoHgfmJlOgbB00VWzyvvcxuQZk7JOPrCYV51JMmNU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI3/Mzc5NDUyL3Bob3Rv/L2tpdHR5LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz13UWcw/TXdTcXJxZkkzWHdN/WGREVjhkY2RZMlNH/WVh2YndPdE12cUxX/UWpJPQ",
        description: "whjsuhcuinhfbnioa",
      },
    ]);
  }
  const postComponents = posts.map((post) => (
    <PostComponent
      name={post.name}
      subtitle={post.subtitle}
      time={post.time}
      image={post.image}
      description={post.description}
    />
  ));
  return (
    <div style={{ background: "#dfe6e9", minHeight: "100vh" }}>
      <button
        onClick={addPosts}
        style={{ padding: 10, margin: 10, borderRadius: 5, cursor: "pointer" }}
      >
        Add Post
      </button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>{postComponents}</div>
      </div>
    </div>
  );
}
// const Counter = () => {
//   const [count, setCount] = useState(0);
//   return (
//     <div style={{ margin: "0px 10px" }}>
//       <h2>Count:{count}</h2>
//       <button onClick={() => setCount(count + 1)}>Increment </button>
//     </div>
//   );
// };
// const ToggleMessage = () => {
//   const [notification, notificationCount] = useState(0);
//   function toggle() {
//     notificationCount(notification + 1);
//   }
//   return (
//     <div>
//       {}
//       <button
//         onClick={toggle}
//         style={{ padding: 10, margin: 10, cursor: "pointer" }}
//       >
//         increase count
//       </button>

//       {notification}
//     </div>
//   );
// };

export default App;
