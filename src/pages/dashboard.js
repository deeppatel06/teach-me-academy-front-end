//

import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Stack,
} from "@mui/material";
import { SeoIllustration } from "../assets";
import useAuth from "../hooks/useAuth";

// ----------------------------------------------------------------------

const RootWelcomeStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up("md")]: {
    // height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const RootContent = styled(Card)(({ theme }) => ({
  marginInline: "2rem",
  [theme.breakpoints.up("md")]: {
    marginInline: "4rem",
  },
}));

// ----------------------------------------------------------------------

export default function Dashboard({ displayName }) {
  const { user } = useAuth();

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <Stack direction="row" spacing={3} sx={{ display: "inline-block" }}>
          <Button>Dashboard</Button>
          <Button>My Class</Button>
          <Button>Courses</Button>
          <Button>My Course</Button>
          <Button>Profile</Button>
        </Stack>
      </Box>

      <RootContent>
        <RootWelcomeStyle>
          <CardContent
            sx={{
              p: { md: 0 },
              pl: { md: 5 },
              color: "grey.800",
            }}
          >
            <Typography gutterBottom variant="h4">
              Welcome back,
              <br /> {user?.username ? user.username : "..."}!
            </Typography>

            <Typography
              variant="body2"
              sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: "auto" }}
            >
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything
            </Typography>

            <Button variant="contained" to="#" component={RouterLink}>
              Go Now
            </Button>
          </CardContent>

          <SeoIllustration
            sx={{
              p: 3,
              width: 360,
              margin: { xs: "auto", md: "inherit" },
            }}
          />
        </RootWelcomeStyle>
      </RootContent>
    </Box>
  );
}
