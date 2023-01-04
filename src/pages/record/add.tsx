import Navigation from "../../components/common/Navigation"
import colors from "../../../styles"
import { useState } from "react"
export default function Add(){
    const [toggle,setToggle] = useState(false);

    const handleClick = () => {
        setToggle(!toggle);
    }
    return(
        <>
        <Navigation text="식후 혈당 기록하기"/>
        <div className="container">
            <div className="item">
                내 식단
                <button onClick={handleClick}>toggle</button>
            </div>
            {
                toggle ?
                <div className="item_toggle">
                    주먹을 부르는 주먹밥 22.12.12 아침
                </div>
                :
                null
            }
            <div className="item">
                날짜
            </div>
            <div className="item">
                시간
                <input type="time"/>
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

                display: flex;
                align-items: center;
            }

            .item_toggle {
                width: 340px;
                height: 53px;
                background: none;

                margin-left: 20px;
                margin-right: 20px;
                margin-bottom: 12px;
                border-radius: 6px;
                border: 1px solid ${colors.graySubTitle2}; 

                display: flex;
                align-items: center;
            }

            input[type="time"] {
                float: right;
            }
        `}</style>
        </>
    )
}