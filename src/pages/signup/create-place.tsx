import { CTA1ButtonOnSmall } from "../../components/common/Button"
import Navigation from "../../components/common/Navigation"

export default function CreatePlace(){
    const handleClick = () => {
        console.log('~~')
    }
    return (
        <>
        <Navigation text="가족 공간 생성"/>
        <div className="container">
            가족 중 최초로 가입하셨나요?
            <div className="buttonItem">
            <CTA1ButtonOnSmall onClick={handleClick} textMain="네" textSub="가족 공간 생성"/>
            <CTA1ButtonOnSmall onClick={handleClick} textMain="아니오" textSub="가족 공간 들어가기"/>
            </div>

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
            .margin {
                width: 10px;
            }
        `}</style>
        </>
    )
}