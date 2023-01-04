import {useRouter} from 'next/router'
import Link from 'next/link'
import colors from '../../../styles';

interface MiniHeaderType{
  left: string;
  right: string;
  leftURL: string;
  rightURL: string;
  button?: string;
  buttonURL?: string;
}

// 필터 부분 추가해야 함
export default function MiniHeader({left,right,leftURL,rightURL,button,buttonURL}:MiniHeaderType) {
  const router = useRouter();

  const handleClick = () => {
    if (buttonURL){
      router.push(buttonURL)
    }
  }

  return (
    <>
      <div className='container'>
        <div className='item'>
          <Link
            href={{
              pathname: leftURL,
            }}
          >
            <div className='text'>
            {left}
            </div>
          </Link>
          <div className={router.pathname === leftURL ? 'true' : 'false'}></div>
        </div>
        <div className='item'>
          <Link
            href={{
              pathname: rightURL,
            }}
          >
            {right}
          </Link>
          <div className={router.pathname === rightURL ? 'true' : 'false'}></div>
        </div>
      </div>
      {
        button?
        <button className='buttonStyle' onClick={handleClick}>{button}</button>
        :
        null
      }
      <br/>
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

        .buttonStyle {
          width: 350px;
          height: 34px;
          background: ${colors.grayWhite};
          margin-left: 20px;
          margin-right: 20px;
          margin-top: 12px;
          margin-bottom: 8px;
          border: none;
          border-radius: 20px;
        }
      `}</style>
    </>
  );
}