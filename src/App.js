// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import { ProgressBarStyle } from "./components/ProgressBar";
import NotistackProvider from "./components/NotistackProvider";
import ThemeColorPresets from "./components/ThemeColorPresets";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <NotistackProvider>
          <ProgressBarStyle />
          <Router />
        </NotistackProvider>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
