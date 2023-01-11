import React, { useEffect, useRef, useState } from "react";
import colors from "../../../styles";
import { CTA1Button } from "../../components/common/Button";

export default function EnterPlace(){
    const codeLength = 6;
    const inputRef = useRef<null[] | HTMLDivElement[]>([]);
    const idxArray = Array.from({length: codeLength}, (v,i) => i);

    const [test, setTest] = useState(()=>Array(codeLength).fill(0));

    useEffect(()=>{
        inputRef.current[0]?.focus()
    },[])

    const handleFocus = (e:React.ChangeEvent<HTMLInputElement>,idx:number) => {
        let arr = test;
        arr.splice(idx,1,e.target.value);
        setTest(arr);
        inputRef.current[++idx]?.focus();
    }

    const handleClick = () => {
        console.log(test);
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
                    <input 
                    key={i} 
                    maxLength={1} 
                    ref={(el) => (inputRef.current[i] = el)} 
                    onChange={(e)=>handleFocus(e,i)}
                    />
                    )
                })
            }
            <br/>
            <CTA1Button text="입장" active={true} onClick={handleClick}/>
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