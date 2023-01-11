import { useRouter } from "next/router";
import React, { useState } from "react"
import { CTA1Button, TextBox2, CTA1ButtonSelect } from "../../components/common/Button";
import Navigation from "../../components/common/Navigation";

export default function Survey(){
    const [page,setPage] = useState(0);
    const [gender,setGender] = useState<boolean | null>(null);
    const router = useRouter();

    const handleClick = () => {
        let num = page;
        setPage(++num);
        if(page >= 5){
            router.replace('/signup/loading');
        }
    }

    const handleClickGender = (e:React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        if(value === "f"){
            setGender(true)
        }else if(value === "m"){
            setGender(false)
        }
    }
    const getPage = (current:number) => {
        switch (current) {
            case 0:
                return(
                    <>
                    맘스터치님, <br/>
                    키를 알려주세요.   
                    <TextBox2 active={false} text="000.0" unit="CM"/>   
                    <br/>  
                    </>
                )
            case 1:
                return(
                    <>
                    맘스터치님, <br/>
                    몸무게를 알려주세요.
                    <TextBox2 active={false} text="00.0" unit="KG"/>   
                    <br/> 
                    </>
                )
            case 2:
                return(
                    <>
                    맘스터치님, <br/>
                    성별은 무엇인가요?
                    <CTA1ButtonSelect text="여성" value="f" active={gender === null ? false : gender} onClick={handleClickGender}/> <br/>
                    <CTA1ButtonSelect text="남성" value="m" active={gender === null ? false : !gender} onClick={handleClickGender}/>
                    <br/>
                    </>
                )
            case 3:
                return(
                    <>
                    이제 습관 관련 <br/>
                    추가 질문을 드리겠습니다.
                    </>
                )
            case 4:
                return(
                    <>
                    맘스터치님, 평균적인 <br/>
                    일주일 활동량이 어떤가요?
                    </>
                )
            case 5:
                return(
                    <>
                    맘스터치님, 못드시는 음식을<br/>
                    모두 선택해주세요.
                    </>
                )
            default:
                break;
        }
    }
    return(
        <>
        { page<3 && <Navigation text="기본 정보"/>}
        { page>=3 && <Navigation text="습관 정보"/>}
        <div className="container">
        {getPage(page)}
        <br/>
        <CTA1Button text="다음" active={true} onClick={handleClick}/>
        </div>
        <style jsx>{`
        .container {
          width: 390px;
          padding-top: 60px;
        }
        `}</style>
        </>
    )
}