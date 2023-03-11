// @mui
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Card, Container, Typography } from "@mui/material";
// components
import { MotionInView, varFade } from "../../components/animate";
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: "material-symbols:school-outline-rounded",
    title: "Experienced faculty",
    description:
      "Learn from experienced and passionate instructors who are dedicated to your success.",
  },
  {
    icon: "map:art-gallery",
    title: "Diverse programs",
    description:
      "Choose from a range of programs in various art forms to find your artistic niche.",
  },
  {
    icon: "fluent:people-community-20-filled",
    title: "Supportive community",
    description:
      "Collaborate and receive constructive feedback in our inclusive and supportive artistic community.",
  },
];

const shadowIcon = (color) => `drop-shadow(4px 4px 4px ${alpha(color, 0.34)})`;

const RootStyle = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    minHeight: 440,
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(10, 5, 0),
    boxShadow: theme.customShadows.z12,
    [theme.breakpoints.up("md")]: {
      boxShadow: "none",
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    "&.cardLeft": {
      [theme.breakpoints.up("md")]: { marginTop: -40 },
    },
    "&.cardCenter": {
      [theme.breakpoints.up("md")]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        "&:before": {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: "auto",
          position: "absolute",
          width: "calc(100% - 40px)",
          height: "calc(100% - 40px)",
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle>
      <Container>
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 10, md: 25 },
          }}
        >
          <MotionInView variants={varFade().inUp}>
            <Typography
              component="div"
              variant="overline"
              sx={{ mb: 2, color: "text.disabled" }}
            >
              Art Station
            </Typography>
          </MotionInView>
          <MotionInView variants={varFade().inDown}>
            <Typography variant="h2">What We helps you?</Typography>
          </MotionInView>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 5, lg: 10 },
            gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
          }}
        >
          {CARDS.map((card, index) => (
            <MotionInView variants={varFade().inUp} key={card.title}>
              <CardStyle
                className={
                  (index === 0 && "cardLeft") ||
                  (index === 1 && "cardCenter") ||
                  ""
                }
              >
                <Iconify
                  icon={card.icon}
                  height={40}
                  width={40}
                  sx={{
                    mb: 10,
                    mx: "auto",
                    filter:
                      index === 0
                        ? shadowIcon(theme.palette.primary.main)
                        : index === 1
                        ? shadowIcon(theme.palette.info.main)
                        : index === 2
                        ? shadowIcon(theme.palette.error.main)
                        : null,
                  }}
                  color={
                    index === 0
                      ? theme.palette.primary.main
                      : index === 1
                      ? theme.palette.info.main
                      : index === 2
                      ? theme.palette.error.main
                      : null
                  }
                />
                <Typography variant="h5" paragraph>
                  {card.title}
                </Typography>
                <Typography
                  sx={{ color: isLight ? "text.secondary" : "common.white" }}
                >
                  {card.description}
                </Typography>
              </CardStyle>
            </MotionInView>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
