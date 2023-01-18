import Navigation from "../../components/common/Navigation";
import colors from "../../../styles";
import { selectUser } from "../../store/userSlice";
import { selectSurvey } from "../../store/surveySlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

export default function MyPage(){
    const survey = useSelector(selectSurvey);
    const user = useSelector(selectUser);

    console.log(user)

    const handleClick = () => {
        
    }

    return(
        <>
        <Navigation text="마이페이지"/>
        <div className="container">
        <div className="profile">
            <Image alt="character" width={80} height={80} src={`/character/ch_${user.usercharacter}.svg`}/>
            <br/>
            <div className="profile_dia">
            {user.isDiabetes ? "당뇨인" : "당뇨인 가족"}
            </div>
            <br/>
            {user.username}
            <br/>
            {survey.height}cm {survey.weight}kg {survey.gender}
        </div>
        <br/>
        <div className="info">
            <div className="infoItem">
            활동량 {survey.activity}
            </div>
            <br/>
            <div className="line"></div>
            <div className="infoItem">
            알레르기
            </div>
        </div>
        <br/>
        <button>
            초대코드 복사하기
        </button>
        <button>
            서비스 평가 및 정식 출시 알림 받기
        </button>
        <button>
            로그아웃하기
        </button>
        <button/>
        </div>
        <style jsx>{`
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 390px;
            // min-height: 800px;
            padding-top: 60px;
        }
        
        .profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            
        }
        .profile_dia {
            background: ${colors.mainOrange};
            color: ${colors.grayWhite};
            width: ${user.isDiabetes ? "60px" : "80px"};
            border-radius: 2px;
        }

        .info {
            background: ${colors.grayBackground};
            width: 350px;
            height: 124px;
            border-radius: 6px;

            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .infoItem {
            margin-top: 20px;
        }
        .line {
            min-width: 390px;
            height: 2px;
            background: ${colors.grayWhite};
        }
        
        button {
            display: flex;
            // flex-direction: column;
            align-items: center;

            background: none;
            border: none;
            border-top: 2px solid ${colors.grayBackgroundSub};
            height: 62px;
            line-height: 62px;
            min-width: 390px;
        }
        `}</style>
        </>
    )
}