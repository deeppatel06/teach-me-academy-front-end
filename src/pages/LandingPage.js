//

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Stack, Button } from "@mui/material";
import { PATH_AUTH } from "../routes/paths";

export default function LandingPage() {
  return (
    <Box sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_AUTH.login}
          >
            Login
          </Button>

          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_AUTH.register}
          >
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
