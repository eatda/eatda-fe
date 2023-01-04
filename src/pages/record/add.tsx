import Navigation from "../../components/common/Navigation"
import colors from "../../../styles"
export default function Add(){
    return(
        <>
        <Navigation text="식후 혈당 기록하기"/>
        <div className="container">
            <div className="item">
                내 식단
            </div>
            <div className="item">
                날짜
            </div>
            <div className="item">
                시간
            </div>
            <div className="item">
                혈당
            </div>
        </div>
        <style jsx>{`
            .container {
                width: 390px;
                padding-top: 70px;
            }
            .item {
                width: 340px;
                height: 53px;
                background: ${colors.grayWhite};

                margin-left: 20px;
                margin-right: 20px;
                margin-bottom: 12px;
                border-radius: 6px;
            }
        `}</style>
        </>
    )
}