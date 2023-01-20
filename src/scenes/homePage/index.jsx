import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

import Navbar from "../navbar";
import { selectUser } from "../../state";
import UserWidget from "../widgets/UserWidget";

function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector(selectUser);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          Main
        </Box>

        {isNonMobileScreens && <Box flexBasis="26%">Friends List</Box>}
      </Box>
    </Box>
  );
}
export default HomePage;
