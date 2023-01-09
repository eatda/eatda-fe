import colors from "../../../styles";

export default function EnterPlace(){
    return(
        <div className="container">
        <div className="subText">
            가족 구성원이 이미 가입하셨군요!
        </div>
            초대 코드를 입력해주세요 
            <input />
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
        </div>
    )
}