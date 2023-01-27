import Navigation from "../../../components/common/Navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useReducer, useState } from "react";
import colors from "../../../../styles";
import ProcessCard from "../../../components/kitchen/ProcessCard";
import { GetServerSideProps } from "next";
import { RecipeDataType } from "../../../interface/recipe";
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/tokenSlice";
import { useRouter } from "next/router";
import { Post } from "../../../hooks/Fetch";

const mealButtonData = [
  { timelinine: 0, icon: "", text: "아침" },
  { timelinine: 1, icon: "", text: "점심" },
  { timelinine: 2, icon: "", text: "저녁" },
];

interface ProcessProps {
  recipeData: RecipeDataType;
}

export default function Process({ recipeData }: ProcessProps) {
  const { query } = useRouter();
  const token = useSelector(selectToken);
  const router = useRouter();

  const [when, setWhen] = useState(0);

  function handleSubmit() {
    const requestBody = {
      diet_id: query.recipeId,
      timeline: when,
    };
    Post({
      url: "users/diet/",
      token: token.access_token,
      requestBody: requestBody,
    });
    router.back();
  }

  // 레시피 과정 데이터에서 재료에 해당하는 단어 뽑아서 카드 데이터 넣기
  recipeData.recipe.forEach((menu) => {
    menu.process.forEach((level) => {
      // 재료 단어들로 정규식 만들기
      let regex_str = "";
      level.ingredients.forEach((ingredient) => {
        regex_str = regex_str + ingredient + "|";
      });
      regex_str = regex_str.slice(0, -1);
      const regex = new RegExp(regex_str);
      level.splitted = level.step.split(regex);
    });
  });

  return (
    <>
      <Navigation text="상세정보" />
      <div className="container">
        {recipeData.recipe.map((menu, idx) => (
          <div key={idx} className="process-list">
            <div className={idx == 0 ? "title main" : "title sub"}>
              {menu.title}
            </div>
            {menu.process.map((step, idx) => (
              <ProcessCard
                key={idx}
                num={idx + 1}
                content={step}
                selected={false}
              />
            ))}
          </div>
        ))}
        <div className="finish-box">
          <div>이미지이미지</div>
          <div className="select-meal">
            언제 식사 하시나요?
            <div className="meal-list">
              {mealButtonData.map((meal) => (
                <div
                  onClick={() => setWhen(meal.timelinine)}
                  key={meal.timelinine}
                  className={
                    meal.timelinine == when
                      ? "meal-button clicked"
                      : "meal-button"
                  }
                >
                  {meal.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit}>요리 완료하기</button>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0px 20px;
        }
        .title {
          display: flex;
          align-items: center;
          height: 56px;
          border-radius: 4px;
          font-size: 24px;
          font-weight: 700;
          padding: 0px 12px;
          margin-bottom: 12px;
        }
        .main {
          color: ${colors.grayWhite};
          background-color: ${colors.mainOrange};
        }
        .sub {
          background-color: ${colors.mainYellow};
        }

        .finish-box {
          border: 1px solid ${colors.blackSub};
          border-radius: 4px;
        }
        .select-meal {
          padding: 10px;
          background-color: ${colors.grayBackgroundSub};
        }
        .meal-list {
          display: flex;
          justify-content: space-between;
        }
        .meal-button {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid ${colors.blackSub};
          background-color: ${colors.grayWhite};
          border-radius: 21px;
          min-width: 100px;
          height: 42px;
        }
        .clicked {
          background-color: ${colors.mainOrange};
          color: ${colors.grayWhite};
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipeData = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_ROOT}diets/${context.params?.recipeId}`
    )
  ).json();
  return {
    props: {
      recipeData,
    },
  };
};
