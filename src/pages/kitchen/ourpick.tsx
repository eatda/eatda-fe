import RecipeList from "../../components/recipe/RecipeList"
import colors from "../../../styles"
import MiniHeader from "../../components/common/MiniHeader"
import Header from "../../components/common/Header"

export default function OurPick(){
    return(
        <div className="box">
        <Header text="주방"/>
        <div className='miniHeader'>
            <MiniHeader left="추천 식사" right="Our Pick!" leftURL="/kitchen" rightURL="/kitchen/ourpick"/>
        </div>
        <div className="container">
            가족 모두의 PICK! <br/>
            <div className="margin">
                <RecipeList type="top"/>
            </div>
        </div>
        <div className="bar" />
        <div className="container">
            가족 내 인기 PICK!
            <RecipeList type="bottom"/>
        </div>
        <style jsx>{`
            .box {
                width: 390px
            }
            .container {
                margin-left: 20px;
                width: 390px
                background: black;
            }
            .bar {
                background: ${colors.grayBackgroundSub};
                height: 8px;
                width: 390px;

                margin-bottom: 18px;
            }
            .miniHeader {
                margin-top: 25px;
            }
            .margin {
                margin-right: 20px
            }
        `}</style>
        </div>
    )
}