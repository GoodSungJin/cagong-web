import { CafeDetailHeader, CafeTabViewHeader, CafeTabViewPages} from '@/components/CafeDatailPage';
import TopNavBar from '@/components/common/TopNavBar';
import { useRouter } from 'next/router'
import React, { useMemo } from 'react';

function Loading() {
  return null;
}

export default function CafePage() {
  const router = useRouter();
  const { cafeId, nowTab } = router.query
  const selectedTab = useMemo(() => {
    if(!nowTab) return nowTab;
    return Object.keys(CafeTabViewPages).includes(nowTab && nowTab[0]) ? nowTab[0] : "info";
  }, [nowTab]);
  const SelectedTabComponent = !nowTab ? Loading : CafeTabViewPages[selectedTab];
  // TODO: fetch
  const tmpCafeInfo = {
    headerImage: "/assets/defaults/cafeHeader.png",
    title: "12조 짱짱카페",
    cagongIndex: "4.41",
    reviewCount: 13,
    tags: ["소음 낮음", "조명 밝음", "좌석 불편"]
  }
  return (
    <>
      <TopNavBar />
      <CafeDetailHeader 
        headerImage={tmpCafeInfo.headerImage}
        title={tmpCafeInfo.title}
        cagongIndex={tmpCafeInfo.cagongIndex}
        reviewCount={tmpCafeInfo.reviewCount}
        tags={tmpCafeInfo.tags}
      />
      <CafeTabViewHeader cafeId={cafeId} nowTab={selectedTab}/>
      <SelectedTabComponent cafeId={cafeId}/>
    </>
  )
}