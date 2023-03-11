//

// @mui
import { styled } from "@mui/material/styles";
import Page from "../components/Page";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export default function NewsLetter() {
  return (
    <Page>
      <RootStyle></RootStyle>
    </Page>
  );
}
