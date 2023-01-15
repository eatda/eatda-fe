import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react"
import { CTA1Button, TextBox2, CTA1ButtonSelect } from "../../components/common/Button";
import Navigation from "../../components/common/Navigation";

import { selectUser } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";

const characters = [
  {
    id: 1,
    name:'11'
  },
  {
    id: 2,
    name: '22'
  },
  {
    id: 3,
    name: '33'
  },
  {
    id: 4,
    name: '44'
  }
]

interface formI {
  name: string;
  character: number;
  sugar: null | boolean;
}

interface characterI {
  id: number;
  image: string;
}

export default function Signup(){
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [characterData, setCharacterData] = useState<characterI[]>();
  const [page,setPage] = useState(0);

  
  const [form, setForm] = useState<formI>({
    name: '',
    character: -1,
    sugar: null
  })

  // 유효성 검사
  const [isValid, setIsValid] = useState({
    nameValid: false,
    characterValid: false,
    sugarValid: false
  })

  useEffect(()=>{
    async function fetchCharacter(){
      const groupId = user.group_id;
      const URL = `${process.env.NEXT_PUBLIC_API_ROOT}/users/character?groupid=${groupId}`;
      const response = await ( await fetch(URL)).json();
      setCharacterData(response);
    }

    if(page === 2){
      fetchCharacter();
    }
  },[page])

  const handleClickNext = () => {
    setPage(prevNumber => prevNumber + 1);
    if(page>=3){
      console.log(form.name, form.character, form.sugar)
      form.sugar ?
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
        const valueCharacter = Number(e.currentTarget.value);
        setForm({...form, character: valueCharacter});

        // 유효성 검사
        if(valueCharacter <0){
          setIsValid({...isValid, characterValid: false})
        }else{
          setIsValid({...isValid, characterValid: true})
        }
        break;
      case 3 :
        const valueSugar = e.currentTarget.value === 'true' ? true : false;
        setForm({...form, sugar: valueSugar});

        // 유효성 검사
        if(valueSugar === null){
          setIsValid({...isValid, sugarValid: false});
        }else{
          setIsValid({...isValid, sugarValid: true});
        }
        break;
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setForm({...form, name: value});

    //유효성 검사
    if(value.length < 1 || value.length > 12) {
      setIsValid({...isValid, nameValid: false});
    }else{
      setIsValid({...isValid, nameValid: true});
    }
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
          <TextBox2 text="맘스터치" onChange={handleChange} value={form.name}/>
          <br/>
          최대 12자
          <br/><br/>
          </>
        )
      case 2 :
        return (
          <>
          활동 캐릭터를 설정해주세요.
          {
            characterData?.map((v:characterI,idx:number)=>{
              return(
                <div key = {idx}>
                <CTA1ButtonSelect
                active={form.character === v.id ? true : false}
                onClick={handleClick}
                value={v.id}
                image={v.image}
                />
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
          <CTA1ButtonSelect active={form.sugar === null ? false : form.sugar} value="true" text="네, 당뇨인이에요" onClick={handleClick}/>
          <CTA1ButtonSelect active={form.sugar === null ? false : !form.sugar} value="false" text="아니요, 당뇨인 가족이에요" onClick={handleClick}/>
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
        page !== 0 && 
        <CTA1Button 
        active={(page === 1 && isValid.nameValid) || (page ===2 && isValid.characterValid) || (page === 3 && isValid.sugarValid)} 
        text="다음" 
        onClick={handleClickNext}/>
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
