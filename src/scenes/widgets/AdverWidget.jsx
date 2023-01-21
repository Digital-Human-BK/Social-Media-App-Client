import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

function AdvertWidget() {
  const { palette } = useTheme();
  const { dark, main, medium } = palette.neutral;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://good-puce-scorpion-kilt.cyclic.app/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Mika Cosmetics</Typography>
        <Typography color={medium}>www.mikacomsetics.com</Typography>
      </FlexBetween>
      <Typography color={medium}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus,
        illum.
      </Typography>
    </WidgetWrapper>
  );
}

export default AdvertWidget;
