import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../../styles";
import { CTA1Button } from "../../components/common/Button";

export default function EnterPlace(){
    const router = useRouter();
    const codeLength = 6;
    const inputRef = useRef<null[] | HTMLDivElement[]>([]);
    const idxArray = Array.from({length: codeLength}, (v,i) => i);

    const [code, setCode] = useState(()=>Array(codeLength).fill(''));

    const [test, setTest] = useState(0);

    useEffect(()=>{
        inputRef.current[0]?.focus()
    },[])

    useEffect(()=>{
        let flag = true;
        code.map((v,i)=>{
            if(v===''){
                flag = false;
            }
        })

        if(flag){
            console.log(code);
            console.log('확인')
            // router.replace('/signup');
        }
    },[test])

    const handleFocus = (e:React.ChangeEvent<HTMLInputElement>,idx:number) => {
        let arr = code;
        arr.splice(idx,1,e.target.value);
        setCode(arr);
        inputRef.current[++idx]?.focus();

        setTest(prev => prev +1);
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