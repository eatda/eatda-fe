import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import pasta from "../../assets/temp/pasta.png";
import FooterButton from "../../components/common/FooterButton";
import Navigation from "../../components/common/Navigation";

interface Ingredients {
  name: string;
  amount: string;
}
const ingredientsData: Ingredients[] = [
  { name: "통밀푸실리", amount: "15g" },
  { name: "양상추", amount: "30g" },
  { name: "방울토마토", amount: "5개" },
  { name: "오이", amount: "20g" },
  { name: "새우", amount: "1/2개" },
];

export default function Detail() {
  const { query } = useRouter();
  const recipeId = query.recipeId;

  return (
    <>
      <div>
        <Navigation text="상세정보" />
        <Image src={pasta} alt="pasta" placeholder="blur" />
        <h5>마음까지 신선해지는</h5>
        <h4>냉파스타 샐러드</h4>
        <div className="ingredients">
          <div className="basic">
            <div>
              기본재료<span>1인분</span>
            </div>
            <hr />
            {ingredientsData.map((ingredient) => (
              <div key={ingredient.name}>
                <span>{ingredient.name}</span>
                <span>{ingredient.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <br />
        <div className="ingredients">
          <div className="basic">
            <div>
              기본재료<span>1인분</span>
            </div>
            <hr />
            {ingredientsData.map((ingredient) => (
              <div key={ingredient.name}>
                <span>{ingredient.name}</span>
                <span>{ingredient.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="nutrients">
          {ingredientsData.map((ingredient) => (
            <div key={ingredient.name}>
              <span>{ingredient.name}</span>
              <span>{ingredient.amount}</span>
            </div>
          ))}
        </div>
        <FooterButton
          path={`/detail/process/${recipeId}`}
          text="요리 시작하기"
        />
        <div className="tip"></div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
