import { CafeDetailHeader, CafeTabViewHeader, CafeTabViewPages, fetcher } from '@/components/CafeDatailPage';
import TopNavBar from '@/components/common/TopNavBar';
import { useRouter } from 'next/router'
import React, { useMemo } from 'react';
import useSWR from 'swr';

function Loading() {
  return (
    <div>
      loading...
    </div>
  );
}

const API_ROUTE_MAP = {
  info: "info",
  review: "reviews",
  photo: "images",
  menu: "info",
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
  }, [selectedTab, router.isReady]);

  // const { basicData, basicError } = useSWR(`/cafes/${cafeId}/info`, fetcher, {
  //   isPaused: () => !(cafeId && selectedTab)
  // });

  const { data, error } = useSWR(`/cafes/${cafeId}/${API_ROUTE_MAP[selectedTab]}`, fetcher, {
    isPaused: () => !(cafeId && selectedTab)
  });

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
        cafeId={cafeId}
        headerImage={tmpCafeInfo.headerImage}
        title={tmpCafeInfo.title}
        cagongIndex={tmpCafeInfo.cagongIndex}
        reviewCount={tmpCafeInfo.reviewCount}
        tags={tmpCafeInfo.tags}
      />
      <CafeTabViewHeader cafeId={cafeId} nowTab={selectedTab}/>
      <SelectedTabComponent cafeId={cafeId} data={data?.data}/>
    </>
  )
}