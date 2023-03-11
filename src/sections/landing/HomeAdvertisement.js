import { motion } from "framer-motion";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Box, Container, Typography } from "@mui/material";
// components
import Image from "../../components/Image";
import { MotionInView, varFade } from "../../components/animate";
// route
import { PATH_AUTH } from "../../routes/paths";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 456,
  margin: "auto",
  overflow: "hidden",
  paddingBottom: theme.spacing(10),
  marginTop: theme.spacing(4),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up("md")]: {
    display: "flex",
    maxWidth: "100%",
    paddingBottom: 0,
    alignItems: "center",
  },
}));

// ----------------------------------------------------------------------

export default function HomeAdvertisement() {
  return (
    <Container>
      <ContentStyle>
        <MotionInView
          variants={varFade().inUp}
          sx={{
            mb: { xs: 3, md: 0 },
          }}
        >
          <motion.div
            animate={{ y: [-20, 0, -20] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Image
              visibleByDefault
              alt="rocket"
              src="https://minimal-assets-api.vercel.app/assets/images/home/rocket.png"
              disabledEffect
              sx={{ maxWidth: 460 }}
            />
          </motion.div>
        </MotionInView>

        <Box
          sx={{
            pl: { md: 10 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <MotionInView
            variants={varFade().inDown}
            sx={{ color: "common.white", mb: 5 }}
          >
            <Typography variant="h2">
              Get started with
              <br /> Art station today
            </Typography>
          </MotionInView>
          <MotionInView variants={varFade().inDown}>
            <Button
              size="large"
              variant="contained"
              href={PATH_AUTH.register}
              sx={{
                whiteSpace: "nowrap",
                boxShadow: (theme) => theme.customShadows.z8,
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.common.white),
                bgcolor: "common.white",
                "&:hover": { bgcolor: "grey.300" },
              }}
            >
              Sign Up Now
            </Button>
          </MotionInView>
        </Box>
      </ContentStyle>
    </Container>
  );
}
