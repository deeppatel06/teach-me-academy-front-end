//

import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, Alert, IconButton, InputAdornment, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// routes
import { PATH_AUTH } from "../../../routes/paths";
// hooks
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// components
import Iconify from "../../../components/Iconify";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { PATH_AFTER_LOGIN } from "../../../config";
import { RHFCheckbox } from "../../../components/hook-form";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login, isAuthenticated, isInitialized, loginSuccMsg, loginErrMsg } =
    useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (loginSuccMsg) {
      enqueueSnackbar(loginSuccMsg);
      if (isAuthenticated && isInitialized) {
        navigate(PATH_AFTER_LOGIN, { replace: true });
      }
    }
    if (loginErrMsg) {
      // reset();
      enqueueSnackbar(loginErrMsg, { variant: "error" });
    }
    // eslint-disable-next-line
  }, [loginErrMsg, loginSuccMsg]);

  useEffect(() => {
    // redirect to logged in routes if user already logged in
    if (isAuthenticated && isInitialized) {
      navigate(PATH_AFTER_LOGIN, { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    // reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  // eslint-disable-next-line
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
      // reset();
      if (isMountedRef.current) {
        setError("afterSubmit", error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name="email"
          label="Email address"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Iconify icon={"material-symbols:mail-outline-rounded"} />
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label="Remember me" />
        <Link
          component={RouterLink}
          variant="subtitle2"
          to={PATH_AUTH.resetPassword}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
