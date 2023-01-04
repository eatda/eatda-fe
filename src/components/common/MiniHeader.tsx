import {useRouter} from 'next/router'
import Link from 'next/link'
import colors from '../../../styles';

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
    <div className='container'>
      <div className='item'>
        <Link
          href={{
            pathname: left_url,
          }}
        >
          <div className='text'>
          {left}
          </div>
        </Link>
        <div className={router.pathname === left_url ? 'true' : 'false'}></div>
      </div>
      <div className='item'>
        <Link
          href={{
            pathname: right_url,
          }}
        >
          {right}
        </Link>
        <div className={router.pathname === right_url ? 'true' : 'false'}></div>
      </div>
    <style jsx>{`
      .container {
        display: flex;
        justify-content: center;
        margin-top: 25px;
      }
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .text {
        // color: white;
        text-decoration: none;
      }

      .true {
        height: 2px;
        background: ${colors.mainOrange};
        width: 178px;
      }
      .false {
        height: 2px;
        background: ${colors.graySubTitle2};
        width: 178px;
      }
    `}</style>
    </div>
  );
}