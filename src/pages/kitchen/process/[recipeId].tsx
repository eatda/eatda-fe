import { useRouter } from "next/router";
import FooterButton from "../../../components/common/FooterButton";
import Navigation from "../../../components/common/Navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import colors from "../../../../styles";
import ProcessCard from "../../../components/kitchen/ProcessCard";
import { GetServerSideProps } from "next";
import { RecipeDataType } from "../../../interface/recipe";

interface ProcessProps {
  recipeData: RecipeDataType;
}

export default function Process({ recipeData }: ProcessProps) {
  const router = useRouter();

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
      </div>
      <FooterButton text="요리 완료하기" path="/" />
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
