import { useRouter } from "next/router";
import React, { useState, useCallback } from "react"
import { CTA1Button, TextBox2, CTA1ButtonSelect, RadioBox, CheckBox } from "../../components/common/Button";
import Navigation from "../../components/common/Navigation";

const activityData = [
    {
        id: 0,
        main : "1번째",
        sub : "1sub",
    },
    {
        id: 1,
        main : "2번째",
        sub : "2sub",
    },
    {
        id: 2,
        main : "3번째",
        sub : "3sub",
    },
]

const allergyData = [
    {
        id: 0,
        name: "유당"
    },
    {
        id: 1,
        name: "글루텐"
    },
    {
        id: 2,
        name: "갑각류"
    },
]

export default function Survey(){
    const [page,setPage] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [gender,setGender] = useState<boolean | null>(null);
    const [activity,setActivity] = useState<number | null>(null);
    const [allergy, setAllergy] = useState<Array<number>>([]);
    const router = useRouter();

    const handleClickNext = () => {
        let num = page;
        setPage(++num);
        if(page >= 5){
            console.log(height, weight, gender, activity, allergy)
            router.replace('/signup/loading');
        }
    }

    const handleClickGender = (e:React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        if(value === "f"){
            setGender(true);
        }else if(value === "m"){
            setGender(false);
        }
    }

    const handleChangeActivity = (e:React.ChangeEvent<HTMLInputElement>) => {
        setActivity(Number(e.target.value));
    }

    const handleChangeAllergy = useCallback(
        (checked: boolean, value: number) => {
          if (checked) {
            setAllergy((prev) => [...prev, value]);
          } else if (!checked) {
            setAllergy(allergy.filter((el) => el !== value));
          }
        },
        [allergy]
      );

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>,idx:number) => {
        e.preventDefault();
        switch (idx) {
            case 0:
                setHeight(Number(e.target.value));
                break;
            case 1:
                setWeight(Number(e.target.value));
                break;
            default:
                break;
        }
    }

    const getPage = (current:number) => {
        switch (current) {
            case 0:
                return(
                    <>
                    맘스터치님, <br/>
                    키를 알려주세요.   
                    <TextBox2 text="000.0" value={String(height)} active={false} unit="CM" onChange={e=>handleChange(e,current)}/>   
                    <br/>  
                    </>
                )
            case 1:
                return(
                    <>
                    맘스터치님, <br/>
                    몸무게를 알려주세요.
                    <TextBox2 text="00.0" value={String(weight)} active={false} unit="KG" onChange={e=>handleChange(e,current)}/>   
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
                    {
                        activityData.map((v,i)=>{
                            return(
                                <div key={i}>
                                    <RadioBox
                                    name="activity"
                                    value={i}
                                    mainText={v.main}
                                    subText={v.sub}
                                    select={i === activity}
                                    onChange={handleChangeActivity}
                                    />
                                </div>
                            )
                        })
                    }
                    </>
                )
            case 5:
                return(
                    <>
                    맘스터치님, 못드시는 음식을<br/>
                    모두 선택해주세요.
                    {
                        allergyData.map((v,i)=>{
                            return(
                                <div key={i}>
                                    <CheckBox
                                    name="allergy"
                                    value={v.id}
                                    text={v.name}
                                    onChange={(e) => {
                                        handleChangeAllergy(e.target.checked, Number(e.target.value));
                                      }}
                                    />
                                </div>
                            )
                        })
                    }
                    </>
                )
            default:
                break;
        }
    }
    return(
        <>
        { page<3 && <Navigation text="기본 정보"/> }
        { page>=3 && <Navigation text="습관 정보"/> }
        <div className="container">
        {getPage(page)}
        <br/>
        <div className="buttonItem">
        <CTA1Button text="다음" active={true} onClick={handleClickNext}/>
        </div>
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
        </>
    )
}