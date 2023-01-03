import {useRouter} from 'next/router'
import Link from 'next/link'

interface MiniHeaderType{
  left: string;
  right: string;
  left_url: string;
  right_url: string;
}

// 필터 부분 추가해야 함
export default function MiniHeader({left,right,left_url,right_url}:MiniHeaderType) {
  const router = useRouter();
  return (
    <>
    <Link
      href={{
        pathname: left_url,
      }}
    >
      {left}
    </Link>
    <Link
      href={{
        pathname: right_url,
      }}
    >
      {right}
    </Link>
    </>
  );
}