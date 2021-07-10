import { CafeDetailHeader } from '@/components/CafeDatailPage';
import TopNavBar from '@/components/common/TopNavBar';
import { useRouter } from 'next/router'

export default function CafePage() {
  const router = useRouter();
  const { cafeId } = router.query
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
      상세페이지 of {cafeId}
    </>
  )
}