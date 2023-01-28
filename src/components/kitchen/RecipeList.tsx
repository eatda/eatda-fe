import RecipeCard from "./RecipeCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
          -ms-overflow-style: none; /* 인터넷 익스플로러 */
          scrollbar-width: none; /* 파이어폭스 */
        }
        .container::-webkit-scrollbar {
          display: none; /* 크롬, 사파리, 오페라, 엣지 */
        }

        .item {
          display: flex;
          flex-wrap: ${item_wrap};
          width: auto;
          gap: 12px;
          overflow: auto;
          -ms-overflow-style: none; /* 인터넷 익스플로러 */
          scrollbar-width: none; /* 파이어폭스 */
        }
        .item::-webkit-scrollbar {
          display: none; /* 크롬, 사파리, 오페라, 엣지 */
        } 
      `}</style>
    </>
  );
}
