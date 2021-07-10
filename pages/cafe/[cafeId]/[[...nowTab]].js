import { css } from '@emotion/react';
import { CafeDetailHeader, CafeTabViewHeader, CafeTabViewPages, fetcher } from '@/components/CafeDatailPage';
import SharedButton from '@/components/common/SharedButton';
import TopNavBar from '@/components/common/TopNavBar';
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react';
import useSWR from 'swr';

function Loading() {
  return (
    <div>
      loading...
    </div>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
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

  const { data: baseData, error: baseError } = useSWR(`/cafes/${cafeId}`, fetcher, {
    isPaused: () => !cafeId,
  });

  const { data, error } = useSWR(`/cafes/${cafeId}/${API_ROUTE_MAP[selectedTab]}`, fetcher, {
    isPaused: () => !(cafeId && selectedTab)
  });

  const routeToReview = useCallback(() => {
    router.push({pathname: 'write', query: {
      cafeId, title: baseData?.data?.name,
    }})
  }, [router, cafeId, baseData]);

  const generateTag = ({noise, lighting, seat}) => {
    const tags = [];
    if (noise > 3) tags.push("소음 심함");
    if (noise < 3) tags.push("소음 낮음");
    if (lighting > 3) tags.push("조명 밝음");
    if (lighting < 3) tags.push("조명 어두움");
    if (seat > 3) tags.push("좌석 편함");
    if (seat < 3) tags.push("좌석 불편함")
    if (tags.length === 0) tags.push("무난함")
    shuffleArray(tags);
    return tags;
  }

  const cafeInfo = {
    headerImage: baseData?.data?.thumbnail ?? "/assets/defaults/cafeHeader.png",
    title: baseData?.data?.name ?? "로딩중입니다",
    cagongIndex: baseData?.data?.avg_star ?? "4.41",
    reviewCount: baseData?.data?.cnt_review ?? 0,
    tags: generateTag({ noise: baseData?.data?.avg_noise, lighting: baseData?.data?.avg_light, seat: baseData?.data?.avg_chair})
  }

  return (
    <>
      <TopNavBar />
      <CafeDetailHeader 
        cafeId={cafeId}
        headerImage={cafeInfo.headerImage}
        title={cafeInfo.title}
        cagongIndex={cafeInfo.cagongIndex}
        reviewCount={cafeInfo.reviewCount}
        tags={cafeInfo.tags}
      />
      <CafeTabViewHeader cafeId={cafeId} nowTab={selectedTab}/>
      {data && <SelectedTabComponent cafeId={cafeId} data={data?.data}/>}
      <div css={css`padding: 1rem;`}>
        <SharedButton onClick={routeToReview}>
          이 카페에 후기 작성하기
        </SharedButton>
      </div>
    </>
  )
}