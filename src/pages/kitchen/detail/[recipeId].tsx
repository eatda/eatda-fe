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
      <div className="image">
        <Image
          src={recipeData.image}
          alt="pasta"
          width={390}
          height={300}
          priority
        />
      </div>

      <div className="container">
        <div className="name">
          <div className="comment">{recipeData.name.comment}</div>
          <div className="title">{recipeData.name.title}</div>
        </div>
        {recipeData.ingredient.map((item, idx) => (
          <DetailBox key={idx} icon={""} type={"ingredient"} content={item} />
        ))}
        <DetailBox
          icon={""}
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
          icon={""}
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
          margin-left: -20px;
        }
        .container {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .name {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 20px;
          font-weight: 500;
        }
        .comment {
          color: ${colors.graySubTitle};
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
