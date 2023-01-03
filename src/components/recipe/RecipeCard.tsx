import colors from "../../../styles"

export default function RecipeCard(){
    return(
        <>
            <div className="container">
                <div className="itemImg">
                    <div className='buttonImg'>
                        <img src='/img/heart_full.svg' alt="heart"/>
                    </div>
                </div>
                <div className="itemText">
                    text
                </div>
            </div>
            <style jsx>{`
                .container {
                    // margin-left: 5px;
                    margin-right: 10px;
                    margin-bottom: 9px;
                    background: ${colors.grayWhite};
                    height: 196px;
                    width: 170px;
                    border-radius: 4px;
                }

                .itemImg {
                    height: 131px;
                    width: 170px;

                    display: flex;
                    flex-direction: row-reverse;
                }
                .itemText {
                    height: 65px;
                    width: 170px
                }

                .buttonImg {
                    margin-right: 12px;
                    margin-top: 10px; 
                }
            `}</style>
        </>
    )
}