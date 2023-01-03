import RecipeList from "../../components/recipe/RecipeList"
import colors from "../../../styles"
import MiniHeader from "../../components/common/MiniHeader"

export default function OurPick(){
    return(
        <>
        <div className='miniHeader'>
            <MiniHeader left="추천 식사" right="Our Pick!" left_url="/recipe" right_url="/recipe/ourpick"/>
        </div>
        <div className="container">
            가족 모두의 PICK! <br/>
            <RecipeList type="top"/>
        </div>
        <div className="bar" />
        <div className="container">
            가족 내 인기 PICK!
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
        `}</style>
        </>
    )
}