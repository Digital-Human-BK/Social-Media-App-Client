import Box from "@mui/material/Box";

function UserImage({ image, size = "60px" }) {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://good-puce-scorpion-kilt.cyclic.app/assets/${image}`}
      />
    </Box>
  );
}

export default UserImage;
