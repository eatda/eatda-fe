import RecipeList from "../../components/recipe/RecipeList"
import colors from "../../../styles"
import MiniHeader from "../../components/common/MiniHeader"

export default function Recipe(){
    return(
        <>
        <div className='miniHeader'>
            <MiniHeader left="추천 식사" right="Our Pick!" left_url="/recipe" right_url="/recipe/ourpick"/>
        </div>
        <div className="container">
            Recipe<br/>
            나에게 딱 맞는 레시피! <br/>
            <RecipeList type="top"/>
        </div>
        <div className="bar" />
        <div className="container">
            오늘 이 레시피는 어때요?
            <RecipeList type="bottom"/>
        </div>
        <style jsx>{`
            .container {
                margin-left: 20px;
                margin-right: 20px;
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
        `}</style>
        </>
    )
}