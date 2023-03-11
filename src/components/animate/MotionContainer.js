import PropTypes from "prop-types";
import { motion } from "framer-motion";
// @mui
import { Box } from "@mui/material";
//
import { varContainer } from "./variants";

// ----------------------------------------------------------------------

MotionContainer.propTypes = {
  action: PropTypes.bool,
  animate: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default function MotionContainer({
  animate,
  action = false,
  children,
  ...other
}) {
  if (action) {
    return (
      <Box
        component={motion.div}
        initial={false}
        animate={animate ? "animate" : "exit"}
        variants={varContainer()}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
