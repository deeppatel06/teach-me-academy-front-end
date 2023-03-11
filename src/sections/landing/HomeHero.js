import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Box, Link, Container, Typography, Stack } from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import TextIconLabel from "../../components/TextIconLabel";
import { MotionContainer, varFade } from "../../components/animate";

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    position: "fixed",
    alignItems: "center",
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: "auto",
    textAlign: "center",
    position: "relative",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("md")]: {
      margin: "unset",
      textAlign: "left",
    },
  })
);

// const HeroOverlayStyle = styled(motion.img)({
//   zIndex: 9,
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
//   position: "absolute",
// });

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: "100%",
  margin: "auto",
  position: "absolute",
  [theme.breakpoints.up("lg")]: {
    right: "8%",
    width: "auto",
    height: "48vh",
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <MotionContainer>
      <RootStyle>
        {/* <HeroOverlayStyle alt="overlay" src="https://minimals.cc/assets/overlay.svg" variants={varFade().in} /> */}

        <HeroImgStyle
          alt="hero"
          src="https://minimal-assets-api.vercel.app/assets/images/home/hero.png"
          variants={varFade().inUp}
        />

        <Container>
          <ContentStyle>
            <motion.div variants={varFade().inRight}>
              <Typography variant="h1" sx={{ color: "common.white" }}>
                Start a <br />
                new project <br /> with
                <Typography
                  component="span"
                  variant="h1"
                  sx={{ color: "primary.main" }}
                >
                  &nbsp;Minimal
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFade().inRight}>
              <Typography sx={{ color: "common.white" }}>
                The starting point for your next project based on
                easy-to-customize MUI helps you build apps faster and better.
              </Typography>
            </motion.div>

            <Stack
              spacing={2.5}
              alignItems="center"
              direction={{ xs: "column", md: "row" }}
            >
              <motion.div variants={varFade().inRight}>
                <TextIconLabel
                  icon={
                    <Image
                      alt="sketch icon"
                      src="https://minimal-assets-api.vercel.app/assets/images/home/ic_sketch_small.svg"
                      sx={{ width: 20, height: 20, mr: 1 }}
                    />
                  }
                  value={
                    <Link
                      href="https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0"
                      target="_blank"
                      rel="noopener"
                      color="common.white"
                      sx={{ typography: "body2" }}
                    >
                      Preview Sketch
                    </Link>
                  }
                />
              </motion.div>

              <motion.div variants={varFade().inRight}>
                <TextIconLabel
                  icon={
                    <Image
                      alt="sketch icon"
                      src="https://minimal-assets-api.vercel.app/assets/images/home/ic_figma_small.svg"
                      sx={{ width: 20, height: 20, mr: 1 }}
                    />
                  }
                  value={
                    <Link
                      href="https://www.figma.com/file/x7earqGD0VGFjFdk5v2DgZ/%5BPreview%5D-Minimal-Web?node-id=866%3A55474"
                      target="_blank"
                      rel="noopener"
                      color="common.white"
                      sx={{ typography: "body2" }}
                    >
                      Preview Figma
                    </Link>
                  }
                />
              </motion.div>
            </Stack>

            <motion.div variants={varFade().inRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                startIcon={
                  <Iconify icon={"eva:flash-fill"} width={20} height={20} />
                }
              >
                Live Preview
              </Button>
            </motion.div>

            <Stack spacing={2.5}>
              <motion.div variants={varFade().inRight}>
                <Typography variant="overline" sx={{ color: "primary.light" }}>
                  Available For
                </Typography>
              </motion.div>

              <Stack
                direction="row"
                spacing={1.5}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                {["ic_sketch", "ic_figma", "ic_js", "ic_ts", "ic_nextjs"].map(
                  (resource) => (
                    <motion.img
                      key={resource}
                      variants={varFade().inRight}
                      src={`https://minimal-assets-api.vercel.app/assets/images/home/${resource}.svg`}
                    />
                  )
                )}
              </Stack>
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: "100vh" } }} />
    </MotionContainer>
  );
}
