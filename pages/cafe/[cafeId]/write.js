import { useRouter } from 'next/router'

export default function WriteReviewPage() {
  const router = useRouter();
  const { cafeId } = router.query;
  return (
    <div> 
      Write review of {cafeId}
    </div>
  )
}