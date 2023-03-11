//

import React from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { Box, Stack, Button } from "@mui/material";
// import { PATH_AUTH } from "../routes/paths";
// components
import Page from "../components/Page";
// mui
import { styled } from "@mui/material/styles";
// component
import { HomeMinimal, HomeAdvertisement } from "../sections/landing";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(() => ({
  height: "100%",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <Page title="The starting point for your next skill">
      <RootStyle>
        <ContentStyle>
          <HomeMinimal />

          <HomeAdvertisement />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
