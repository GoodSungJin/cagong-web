import { useRouter } from 'next/router'

export default function ReviewPage() {
  const router = useRouter();
  const { cafeId } = router.query;
  return (
    <div> 
      리뷰 of {cafeId}
    </div>
  )
}