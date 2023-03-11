import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 512 512"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
        >
          <rect
            x="71.2969"
            y="347.777"
            width="340"
            height="70"
            rx="35"
            transform="rotate(-70 71.2969 347.777)"
            fill={PRIMARY_MAIN}
          />
          <rect
            x="229.52"
            y="28.2817"
            width="290"
            height="70"
            rx="35"
            transform="rotate(70 229.52 28.2817)"
            fill={PRIMARY_LIGHT}
          />
        </svg>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
