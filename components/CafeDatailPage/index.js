import axios from "axios";
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

const fetcher = (url) => axios.get(url).then((res) => res.data);

export {
  DetailHeader as CafeDetailHeader,
  TabViewHeader as CafeTabViewHeader,
  fetcher,
  CafeTabViewPages
}