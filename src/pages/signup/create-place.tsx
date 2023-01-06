import { CTA1ButtonOff, CTA1ButtonOn,CTA1ButtonOnSmall, CTA1ButtonOffSmall, CTA2ButtonOff, CTA2ButtonOn } from "../../components/common/Button"

export default function CreatePlace(){
    const handleClick = () => {
        console.log('~~')
    }
    return (
        <>
        <div className="container">
            가족 중 최초로 가입하셨나요?
            <CTA1ButtonOff onClick={handleClick} text="다음"/><br/>
            <CTA1ButtonOn onClick={handleClick} text="다음"/><br/>
            <CTA2ButtonOff onClick={handleClick} text="다음"/><br/>
            <CTA2ButtonOn onClick={handleClick} text="다음"/>
            <CTA1ButtonOnSmall onClick={handleClick} text="다음"/>
            <CTA1ButtonOffSmall onClick={handleClick} text="다음"/>

        </div>
        <style jsx>{`
            .container {
                width: 390px;
                display: flex;
                justify-content: center;
                flex-direction: column;
            } 
        `}</style>
        </>
    )
}