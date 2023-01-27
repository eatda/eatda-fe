import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { pasta } from "../../../assets/imagePath";
import FooterButton from "../../../components/common/FooterButton";
import Navigation from "../../../components/common/Navigation";
import DetailBox from "../../../components/kitchen/DetailBox";

interface RecipeDataType {
  id: number;
  name: {
    title: string;
    comment: string;
  };
  image: string;
  menu: string[];
  carbohydrate: GLfloat;
  protein: GLfloat;
  province: GLfloat;
  salt: GLfloat;
  total_calorie: GLfloat;
  ingredient: {
    title: string;
    data: {
      name: string;
      amount: string;
    }[];
  }[];
  recipe: {
    title: string;
    process: {
      ingredients: string[];
      step: string;
    }[];
  }[];
  tip: {
    title: string;
    text: string;
  }[];
  user_id: null;
  type_id: number;
  flavor_id: number;
  carbohydrate_type_id: null;
}

interface DetailProps {
  recipeData: RecipeDataType;
}

export default function Detail({ recipeData }: DetailProps) {
  const { query } = useRouter();
  const recipeId = query.recipeId;

  return (
    <>
      <Navigation text="상세정보" />
      <Image src={pasta} alt="pasta" width={390} height={300} priority />
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
        path={`/kitchen/process/${recipeId}`}
        text="요리 시작하기"
      />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 30px;
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
