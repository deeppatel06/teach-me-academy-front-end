import PropTypes from "prop-types";
// @mui
// import { styled } from "@mui/material/styles";
// import { Box } from "@mui/material";
//
// import Logo from "./Logo";
import ProgressBar from "./ProgressBar";

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
  isDashboard: PropTypes.bool,
};

export default function LoadingScreen({ isDashboard, ...other }) {
  return (
    <>
      <ProgressBar />
    </>
  );
}
