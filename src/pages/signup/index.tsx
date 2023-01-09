import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { CTA1ButtonOn,CTA1ButtonOff,TextBoxOn } from "../../components/common/Button";
import Navigation from "../../components/common/Navigation";

export default function Signup(){
  const [page,setPage] = useState(0);
  const [name, setName] = useState('');
  const [character,setCharacter] = useState(0);
  const [sugar,setSugar] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    let num = page;
    setPage(++num);
    if(page>3){
      router.push('/signup/loading');
    }
  }

  const handleClickSugar = () => {
    setSugar(true)
    router.push('/signup/survey');
  }

  const handleClickCharacter = (e:React.MouseEvent<HTMLButtonElement>) => {
    setCharacter(Number(e.currentTarget.value))
  }


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name)
  }

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     let num = page;
  //     setPage(++num);
  //   },2000) 
  // },[])

  if (page === 0){
    setTimeout(()=>{
      let num = page;
      setPage(++num);
    },2000)
  }

  const characters = [
    {
      id: 1,

    },
    {
      id: 2,

    },
    {
      id: 3,

    },
    {
      id: 4,

    }
  ]

  
  return(
    <>
    <Navigation text="프로필 설정"/>
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
        <TextBoxOn text="맘스터치" onChange={handleChange} value={name}/>
        <br/><br/>
        </>
        :
        page === 2 ?
        <>
        활동 캐릭터를 설정해주세요.
        {
          characters.map((v,idx)=>{
            return(
              <div key = {idx}>
              <button onClick={handleClickCharacter} value={v.id}>
                {v.id}
              </button>
              </div>
            )
          })
        }
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
      {/* <CTA1ButtonOff text="다음"/> */}
      <style jsx>{`

        .container {
          width: 390px;
          padding-top: 60px;
        }
      `}</style>
    </div>
    </>
  )
}