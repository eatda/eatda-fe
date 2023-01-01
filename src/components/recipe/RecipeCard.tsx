import colors from "../../../styles"
import heart_full from '../../assets/button/heart_full.svg';
import Image from "next/image";

export default function RecipeCard(){
    return(
        <>
            <div className="container">
                <div className="itemImg">
                    <div className='buttonImg'>
                        <Image src={heart_full} alt="heart"></Image>
                    </div>
                </div>
                <div className="itemText">
                    text
                </div>
            </div>
            <style jsx>{`
                .container {
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
                    // background: black;

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