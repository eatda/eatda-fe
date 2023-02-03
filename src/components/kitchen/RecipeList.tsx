import RecipeCard from "./RecipeCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import colors from "../../assets/styles";

interface RecipeListType {
  type: string;
  data?: any;
  popular?: boolean;
  mine?: boolean;
}

export default function RecipeList({
  type,
  data,
  popular,
  mine,
}: RecipeListType) {
  const overflow_container = type === "pick" || mine ? "auto" : "visible";
  const item_wrap = type === "pick" || mine ? "nowrap" : "wrap";

  return (
    <>
      <div className="container">
        <div className="item">
          {type === "pick"
            ? data?.map((v: any, i: number) => {
                return (
                  <RecipeCard
                    key={i}
                    id={v.diet.id}
                    type={type}
                    popular={popular}
                    image={v.diet.image}
                    comment={v.diet.name.comment}
                    title={v.diet.name.title}
                    is_me_liked={v.is_me_liked}
                    who_liked={v.who_liked}
                  />
                );
              })
            : data?.map((v: any, i: number) => {
                return (
                  <RecipeCard
                    key={v.id}
                    id={v.id}
                    type={type}
                    image={v.image}
                    title={v.name.title}
                    comment={v.name.comment}
                    is_me_liked={v.is_me_liked}
                  />
                );
              })}
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: auto;
          overflow: ${overflow_container};
        }

        .item {
          display: flex;
          flex-wrap: ${item_wrap};
          width: auto;
          gap: 12px;
          overflow: auto;
          overflow-y: hidden;
        }

        .scrollBar {
          width: 200px;
          height: 200px;
          overflow-y: scroll;
        }

        /* 아래의 모든 코드는 영역::코드로 사용 */
        .item::-webkit-scrollbar {
          height: 5px;
          width: 1px; /* 스크롤바의 너비 */
        }

        .item::-webkit-scrollbar-thumb {
          height: 1px; /* 스크롤바의 길이 */
          background: ${colors.mainOrange}; /* 스크롤바의 색상 */

          border-radius: 10px;
        }

        .item::-webkit-scrollbar-track {
          background: ${colors.grayBackground}; /*스크롤바 뒷 배경 색상*/
        }
      `}</style>
    </>
  );
}
