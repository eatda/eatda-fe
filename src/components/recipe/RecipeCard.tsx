import { useRouter } from "next/router";
import { useState } from "react";
import colors from "../../../styles";
import { heart_full } from "../../assets/imagePath";
import { heart_empty } from "../../assets/imagePath";

interface RecipeCardType {
  type: string;
}

export default function RecipeCard({ type }: RecipeCardType) {
  const router = useRouter();
  const marginBottom =
    type === "bottom" && router.pathname === "/recipe/ourpick" ? "45px" : "9px";
  const display =
    type === "bottom" && router.pathname === "/recipe/ourpick"
      ? "visible"
      : "none";
  const [like, setLike] = useState(true);

  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    console.log(target.alt);
    if(target.value === 'like' || target.alt === 'like'){
      console.log('like');
      setLike(prev => !prev);
    }else{
      router.push("/kitchen/detail/1");
    }
  };

  return (
    <>
      <div className="container">
        <div onClick={handleClick} className="itemImg">
          <button className="buttonImg" value="like">
            <img src={like ? heart_full : heart_empty} alt="like" />
          </button>
        </div>
        <div onClick={handleClick} className="itemText">
          text
        </div>
        <div className="like">좋아요</div>
      </div>
      <style jsx>{`
        .container {
          // margin-left: 5px;
          margin-right: 10px;
          margin-bottom: ${marginBottom};
          background: ${colors.grayWhite};
          height: 196px;
          width: 170px;
          border-radius: 4px;
          border: solid ${colors.grayBackgroundSub} 1px;
        }

        .itemImg {
          height: 131px;
          width: 170px;

          display: flex;
          flex-direction: row-reverse;
        }
        .itemText {
          height: 65px;
          width: 170px;
        }

        .buttonImg {
          margin-right: 12px;
          margin-top: 10px;
          border: none;
          background: none;
          height: 40px;
        }

        .like {
          display: ${display};
          width: 107px;
          height: 30px;
          border-radius: 15px;
          margin-top: 6px;
          background: ${colors.grayWhite};
          float: right;
          color: ${colors.graySubTitle};
        }
      `}</style>
    </>
  );
}
