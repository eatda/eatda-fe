import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react"
import { CTA1Button, TextBox2, CTA1ButtonSelect } from "../../components/common/Button";
import Navigation from "../../components/common/Navigation";


export default function Signup(){
  const [page,setPage] = useState(0);
  const [name, setName] = useState('');
  const [character,setCharacter] = useState(0);
  const [sugar,setSugar] = useState<boolean | null>(null);
  const router = useRouter();
  
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

  const handleClickNext = () => {
    setPage(prevNumber => prevNumber + 1);
    if(page>=3){
      sugar ?
      router.replace('/signup/survey')
      :
      router.replace('/signup/loading');
    }
  }

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    switch(page){
      case 0 :
        break;
      case 1 :
        break;
      case 2 :
        setCharacter(Number(e.currentTarget.value));
        break;
      case 3 :
        const value = e.currentTarget.value === 'true' ? true : false;
        setSugar(value);
        break;
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  }

  if (page === 0){
    setTimeout(()=>{
      setPage(prevNumber => prevNumber + 1);
    },2000)
  }

  const getPage =(current:number) => {
    switch(current){
      case 0 :
        return (
          <>
          반갑습니다!<br/>
          프로필을 완성해봐요
          </>
        )
      case 1 :
        return (
          <>
          닉네임 설정해주세요
          <TextBox2 text="맘스터치" onChange={handleChange} value={name}/>
          <br/><br/>
          </>
        )
      case 2 :
        return (
          <>
          활동 캐릭터를 설정해주세요.
          {
            characters.map((v,idx)=>{
              return(
                <div key = {idx}>
                <button onClick={handleClick} value={v.id}>
                  {v.id}
                </button>
                </div>
              )
            })
          }
          </>
        )
      case 3 :
        return(
          <>
          당뇨인이신가요?
          <CTA1ButtonSelect active={sugar === null ? false : sugar} value="true" text="네, 당뇨인이에요" onClick={handleClick}/>
          <CTA1ButtonSelect active={sugar === null ? false : !sugar} value="false" text="아니요, 당뇨인 가족이에요" onClick={handleClick}/>
          </>
        )
    }
  }

  return(
    <>
    <Navigation text="프로필 설정"/>
    <div className="container">
      {getPage(page)}
      <div className="buttonItem">
      {
        page !== 0 && <CTA1Button active={true} text="다음" onClick={handleClickNext}/>
      }
      </div>
      <style jsx>{`
        .container {
          width: 390px;
          min-height: 800px;
          padding-top: 60px;
        }
        .buttonItem {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60px;
          position: fixed;
          bottom: 36px;
          left: 0;
          right: 0;
        }
      `}</style>
    </div>
    </>
  )
}