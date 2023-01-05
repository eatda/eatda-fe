import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { pasta } from "../../assets/imagePath";
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

  const [isNutrientOpen, setIsNutrientOpen] = useState(false);
  const [isTipOpen, setIsTipOpen] = useState(false);

  return (
    <>
      <div>
        <Navigation text="상세정보" />
        <Image src={pasta} alt="pasta" width={390} height={300} priority />
        <h5>마음까지 신선해지는</h5>
        <h4>냉파스타 샐러드</h4>
        <div className="container">
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
          <div className="ingredients">
            <div className="basic">
              <div>
                드레싱 재료<span>1인분</span>
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
            <div>
              영양 정보
              <button onClick={() => setIsNutrientOpen(!isNutrientOpen)}>
                토글
              </button>
            </div>
            <hr />
            {isNutrientOpen && (
              <>
                {ingredientsData.map((ingredient) => (
                  <div key={ingredient.name}>
                    <span>{ingredient.name}</span>
                    <span>{ingredient.amount}</span>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="tip">
            <div>
              건강 비결
              <button onClick={() => setIsTipOpen(!isTipOpen)}>토글</button>
              <hr />
              {isTipOpen && (
                <div className="content">
                  영양 덩어리 방울토마토 방울토마토는 큰 토마토보다 비타민 B,
                  비타민 C, 칼륨, 식이섬유가 1.5~2배로 많고 라이코펜은 3배로
                  많습니다.껍질에는 항산화 물질인 플라보노이드가 풍부해 콜레스
                  테롤 수치를 개선해 혈관 벽을 보호하고, 혈액순환을 원활 하게
                  해줍니다. 방울토마토는 큰 토마토보다 껍질 비율이 높기 때문에,
                  같은 양을 먹어도 더 많은 플라보노이드를 섭취할 수 있습니다. 2.
                  양질의 단백질 공급원, 새우 새우의 단백질 함량은 붉은 고기만큼
                  높지만, 지방은 훨씬 적습니다. 새우는 탄수화물 함량이 낮아 혈당
                  조절에 용이합니다. 인슐린이 원활히 분비되게 돕는 아연도
                  풍부하게 들어있습니다.
                </div>
              )}
            </div>
          </div>
        </div>
        <FooterButton
          path={`/detail/process/${recipeId}`}
          text="요리 시작하기"
        />
      </div>
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
