import { CafeDetailHeader, CafeTabViewHeader, CafeTabViewPages} from '@/components/CafeDatailPage';
import TopNavBar from '@/components/common/TopNavBar';
import { useRouter } from 'next/router'
import React, { useMemo } from 'react';

function Loading() {
  return (
    <div>
      loading...
    </div>
  );
}

export default function CafePage() {
  const router = useRouter();
  const { cafeId, nowTab } = router.query
  const selectedTab = useMemo(() => {
    if(!nowTab && !router.isReady) return nowTab;
    return Object.keys(CafeTabViewPages).includes(nowTab && nowTab[0]) ? nowTab[0] : "info";
  }, [nowTab, router.isReady]);
  const SelectedTabComponent = useMemo(() => {
    if(!selectedTab && !router.isReady) return Loading;
    return CafeTabViewPages[selectedTab];
  }, [selectedTab, router.isReady]) ;
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