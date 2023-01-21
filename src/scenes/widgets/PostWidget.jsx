import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import { setPost, selectToken, selectUser } from "../../state";

import Friend from "../../components/Friend";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const dispatch = useDispatch();

  const [isComments, setIsComments] = useState(false);

  const token = useSelector(selectToken);
  const { _id: loggedInUserId } = useSelector(selectUser);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const { main } = palette.neutral;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `https://good-puce-scorpion-kilt.cyclic.app/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post img"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`https://good-puce-scorpion-kilt.cyclic.app/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteIcon sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlinedIcon sx={{ color: primary }} />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments((toggle) => !toggle)}>
              <ChatIcon />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlinedIcon />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}

export default PostWidget;
