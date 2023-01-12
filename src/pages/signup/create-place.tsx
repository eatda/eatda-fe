import { useRouter } from "next/router"
import { useState } from "react";
import { CTA1ButtonSmall, CTA1Button } from "../../components/common/Button"
import Navigation from "../../components/common/Navigation"
import colors from "../../../styles";

export default function CreatePlace(){
    const router = useRouter();
    const [page,setPage] = useState(0);

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        switch (e.currentTarget.value) {
            case "true":
                setPage(prevNumber => prevNumber +1);
                break;
            case "false":
                router.replace('/signup/enter-place');
                break;
            case "enter":
                router.replace('/signup');
                break;
            default:
                break;
        }
    }

    return (
        <>
        <Navigation text="가족 공간 생성"/>
        <div className="container">
            {
                page === 0 ?
                <>
                    가족 중 최초로 가입하셨나요?
                    <div className="buttonItem">
                    <CTA1ButtonSmall active={true} value="true" onClick={handleClick} textMain="네" textSub="가족 공간 생성"/>
                    <CTA1ButtonSmall active={true} value="false" onClick={handleClick} textMain="아니오" textSub="가족 공간 들어가기"/>
                    </div>
                </>
                :
                <>
                    우리 가족만을 위한 집을<br/>
                    새로 만들었어요!
                    <br/>
                    <div className="groudId">
                        초대 코드를 복사하여 가족에게 공유하세요!
                    </div>
                    <button>링크 복사하기</button>
                    <div className="buttonItem">
                    <CTA1Button active={true} value="enter" onClick={handleClick} text="입장하기"/>
                    </div>
                </>

            }
        </div>
        <style jsx>{`
            .container {
                width: 390px;
                padding-top: 60px;
                height: 100vh;
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
            .groudId {
                width: 350px;
                height: 134px;
                background: ${colors.grayWhite};
            }
            .subText {
                color: ${colors.graySubTitle};
            }
        `}</style>
        </>
    )
}