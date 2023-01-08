import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { CTA1ButtonOn } from "../../components/common/Button";

export default function Signup(){
  const [page,setPage] = useState(0);
  const router = useRouter();

  const handleClick = () => {
    let num = page;
    setPage(++num);
  }

  const handleClickSugar = () => {
    router.push('/signup/survey');
  }

  useEffect(()=>{
    setTimeout(()=>{
      let num = page;
      setPage(++num);
    },2000) 
  },[])

  
  return(
    <div className="container">
      {
        page === 0 ?
        <>
        반갑습니다!<br/>
        프로필을 완성해봐요
        </>
        :
        page === 1 ?
        <>
        닉네임 설정해주세요
        </>
        :
        page === 2 ?
        <>
        활동 캐릭터를 설정해주세요.
        </>
        :
        <>
        당뇨인이신가요?
        <CTA1ButtonOn text="네, 당뇨인이에요" onClick={handleClickSugar}/>
        <CTA1ButtonOn text="아니요, 당뇨인 가족이에요" onClick={handleClick}/>
        </>
      }
      {
        page !== 0 && <CTA1ButtonOn text="다음" onClick={handleClick}/>
      }
      <style jsx>{`

        .container {
          width: 390px;
        }
      `}</style>
    </div>
  )
}