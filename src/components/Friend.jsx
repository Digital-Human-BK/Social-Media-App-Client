import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import { selectToken, selectUser, setFriends } from "../state";

import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";

function Friend({ friendId, name, subtitle, userPicturePath }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const { _id, friends } = useSelector(selectUser);

  const { palette } = useTheme();
  const { light, dark } = palette.primary;
  const { main, medium } = palette.neutral;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `https://good-puce-scorpion-kilt.cyclic.app/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: light, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlinedIcon sx={{ color: dark }} />
        ) : (
          <PersonAddAlt1OutlinedIcon sx={{ color: dark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
}

export default Friend;
