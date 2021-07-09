import { useRouter } from 'next/router'

export default function CafePage() {
  const router = useRouter();
  const { cafeId } = router.query
  return (
    <div>
      상세페이지 of {cafeId}
    </div>
  )
}