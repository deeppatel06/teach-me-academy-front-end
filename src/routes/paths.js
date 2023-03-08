// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/app";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: "/",
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  verify: path(ROOTS_AUTH, "/verify"),
};

export const PATH_DASHBOARD = {
  root: "/",
  dashboard: path(ROOTS_DASHBOARD, "/dashboard"),
};
