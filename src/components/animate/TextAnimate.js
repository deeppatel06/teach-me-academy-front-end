import PropTypes from "prop-types";
import { motion } from "framer-motion";
// @mui
import { Box } from "@mui/material";
//
import { varFade } from "./variants";

// ----------------------------------------------------------------------

TextAnimate.propTypes = {
  text: PropTypes.string.isRequired,
  variants: PropTypes.object,
  sx: PropTypes.object,
};

export default function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={motion.h1}
      sx={{
        typography: "h1",
        overflow: "hidden",
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      {text.split("").map((letter, index) => (
        <motion.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </motion.span>
      ))}
    </Box>
  );
}
