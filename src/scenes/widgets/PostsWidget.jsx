import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPosts, selectToken, setPosts } from "../../state";

import PostWidget from "./PostWidget";

function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  console.log(posts);
  const token = useSelector(selectToken);

  const getPosts = async () => {
    const response = await fetch(
      "https://good-puce-scorpion-kilt.cyclic.app/posts",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://good-puce-scorpion-kilt.cyclic.app/posts/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId: uId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={uId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
}

export default PostsWidget;
