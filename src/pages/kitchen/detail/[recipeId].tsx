import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import colors from "../../../../styles";
import FooterButton from "../../../components/common/FooterButton";
import Navigation from "../../../components/common/Navigation";
import DetailBox from "../../../components/kitchen/DetailBox";
import { RecipeDataType } from "../../../interface/recipe";

interface DetailProps {
  recipeData: RecipeDataType;
}

export default function Detail({ recipeData }: DetailProps) {
  const router = useRouter();
  const recipeId = router.query?.recipeId;

  return (
    <>
      <Navigation text="상세정보" />
      <div className="image" />
      <div className="name">
        <div className="comment">{recipeData.name.comment}</div>
        <div className="title">{recipeData.name.title}</div>
      </div>
      <div className="container">
        {recipeData.ingredient.map((item, idx) => (
          <DetailBox
            key={idx}
            idx={idx}
            icon={"mainside"}
            type={"ingredient"}
            content={item}
          />
        ))}
        <DetailBox
          icon={"nutrient"}
          type={"nutrient"}
          content={{
            title: "영양정보",
            data: [
              { name: "탄수화물", amount: `${recipeData.carbohydrate}` },
              { name: "단백질", amount: `${recipeData.protein}` },
              { name: "지방", amount: `${recipeData.province}` },
              { name: "총 칼로리", amount: `${recipeData.total_calorie}` },
            ],
          }}
        />
        <DetailBox
          icon={"health"}
          type={"tip"}
          content={{
            title: "건강 비결",
            tip: recipeData.tip,
          }}
        />
      </div>
      <FooterButton
        onClick={() => router.push(`/kitchen/process/${recipeId}`)}
        text="요리 시작하기"
      />
      <style jsx>{`
        .image {
          height: 390px;
          width: 390px;
          margin-top: -60px;
          margin-left: -20px;
          object-fit: cover;
          background-size: cover;
          background-image: linear-gradient(
              ${colors.grayWhite},
              20%,
              transparent,
              ${colors.grayWhite}
            ),
            url(${recipeData.image});
        }
        .name {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 20px;
          font-weight: 900;
          margin-top: -50px;
          margin-bottom: 32px;
        }
        .container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .comment {
          color: ${colors.graySubTitle};
          font-weight: 500;
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
