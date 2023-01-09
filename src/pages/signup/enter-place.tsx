import React, { useEffect, useRef, useState } from "react";
import colors from "../../../styles";

export default function EnterPlace(){
    const inputRef = useRef<null[] | HTMLDivElement[]>([]);
    const idxArray = Array.from({length: 6}, (v,i) => i);

    useEffect(()=>{
        inputRef.current[0]?.focus()
    },[])

    const handleTest = (e:React.ChangeEvent<HTMLInputElement>,idx:number) => {
        inputRef.current[++idx]?.focus()
    }


    return(
        <div className="container">
        <div className="subText">
            가족 구성원이 이미 가입하셨군요!
        </div>
            초대 코드를 입력해주세요 
            <br/>
            {
                idxArray.map((v,i)=>{
                    return (
                    <input key={i} maxLength={1} ref={(el) => (inputRef.current[i] = el)} onChange={(e)=>handleTest(e,i)}/>
                    )
                })
            }
            <style jsx>{`
            .container {
                width: 390px;
                padding-top: 60px;
                height: 100vh;
            } 
            .subText {
                color: ${colors.graySubTitle};
            }

            input {
                width: 30px;
            }
        `}</style>
        </div>
    )
}