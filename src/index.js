//

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// @mui
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// redux
import { store, persistor } from "./redux/store";
// contexts
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext";

// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version

import { AuthProvider } from "./contexts/JWTContext";

//
import App from "./App";

// ----------------------------------------------------------------------

ReactDOM.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          <CollapseDrawerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CollapseDrawerProvider>
          {/* </LocalizationProvider> */}
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>,
  document.getElementById("root")
);
