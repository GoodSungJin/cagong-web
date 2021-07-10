import DetailHeader from "./DetailHeader";

import TabViewHeader from "./TabView/header";
import TabViewInfo from "./TabView/info";
import TabViewMenu from "./TabView/menu";
import TabViewPhoto from "./TabView/photo";
import TabViewReview from "./TabView/review";

const CafeTabViewPages = {
  info: TabViewInfo,
  menu: TabViewMenu,
  photo: TabViewPhoto,
  review: TabViewReview,
}

export {
  DetailHeader as CafeDetailHeader,
  TabViewHeader as CafeTabViewHeader,
  CafeTabViewPages
}