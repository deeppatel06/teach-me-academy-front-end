//

// routes
// import { PATH_PAGE } from '../../routes/paths';
// components
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: "Home",
    icon: <Iconify icon={"eva:home-fill"} {...ICON_SIZE} />,
    path: "/",
  },
  {
    title: "News Letter",
    icon: <Iconify icon={"eva:book-open-fill"} {...ICON_SIZE} />,
    path: "news-letter",
  },
  {
    title: "More",
    path: "/more",
    icon: <Iconify icon={"eva:file-fill"} {...ICON_SIZE} />,
    children: [
      {
        subheader: "More",
        items: [
          { title: "Art classes", path: "/art-classes" },
          { title: "Community", path: "/community" },
          { title: "Gallery", path: "/gallery" },
          { title: "Contact us", path: "/contact-us" },
          { title: "Portfolio", path: "/portfolio" },
        ],
      },
    ],
  },
];

export default menuConfig;
