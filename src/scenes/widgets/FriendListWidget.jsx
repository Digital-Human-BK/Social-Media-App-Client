import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";

import { setFriends, selectToken, selectUser } from "../../state";

function FriendListWidget({ userId }) {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const { friends } = useSelector(selectUser);

  const { palette } = useTheme();

  const getFriends = async () => {
    const response = await fetch(
      `https://good-puce-scorpion-kilt.cyclic.app/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const friendsLIst = await response.json();
    dispatch(setFriends({ friends: friendsLIst }));
  };

  useEffect(() => {
    getFriends();
  }, []);
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        varian="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}

export default FriendListWidget;
