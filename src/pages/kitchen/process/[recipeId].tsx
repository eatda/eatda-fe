import { useRouter } from "next/router";
import FooterButton from "../../../components/common/FooterButton";
import Navigation from "../../../components/common/Navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import colors from "../../../../styles";
import ProcessCard from "../../../components/recipe/ProcessCard";

const recipeData = {
  id: 50,
  name: {
    title: "봄나물 비빔밥",
    comment: "식탁에 꽃피는 봄",
  },
  image: "http://localhost:8000/media/default.jpg",
  menu: ["봄나물 비빔밥", "닭가슴살겨자냉채"],
  carbohydrate: 21.5,
  protein: 57.4,
  province: 19.7,
  salt: 0.0,
  total_calorie: 490.8,
  ingredient: [
    {
      title: "봄나물 비빔밥",
      data: [
        {
          name: "현미밥",
          amount: "140g",
        },
        {
          name: "냉이",
          amount: "40g",
        },
        {
          name: "취나물",
          amount: "40g",
        },
        {
          name: "방풍나물",
          amount: "40g",
        },
        {
          name: "달래",
          amount: "15g",
        },
        {
          name: "계란",
          amount: "1개",
        },
        {
          name: "소금",
          amount: "약간",
        },
        {
          name: "저염 고추장",
          amount:
            "고추장 1작은술(5cc), 양파·버섯·호박 등 다진 채소 볶은 것 2작은술(10cc), 데친 두부 으깬 것 3작은술(15cc), 스테비아 약간, 올리고당 1작은술(5cc), 참기름 약간",
        },
      ],
    },
    {
      title: "닭가슴살겨자냉채",
      data: [
        {
          name: "닭가슴살",
          amount: "40g",
        },
        {
          name: "노랑, 빨강 파프리카",
          amount: "1/4개씩 (60g)",
        },
        {
          name: "피망",
          amount: "약간",
        },
        {
          name: "소금",
          amount: "약간",
        },
        {
          name: "후춧가루",
          amount: "약간",
        },
        {
          name: "겨자소스",
          amount:
            "연겨자 0.5술(5g), 간장 0.3술(3g), 설탕 0.3술(2g), 식초 1술(10g), 소금 약간",
        },
      ],
    },
  ],
  recipe: [
    {
      title: "봄나물 비빔밥",
      process: [
        {
          ingredients: ["냉이", "취나물", "방풍나물"],
          step: "냉이, 취나물, 방풍나물을 깨끗하게 손질한 후 살짝 데친다. ",
          splitted: [""],
        },
        {
          ingredients: ["냉이", "취나물", "방풍나물", "소금"],
          step: "냉이, 취나물, 방풍나물을 약간의 소금을 넣고 무친다. ",
          splitted: [""],
        },
        {
          ingredients: ["달래"],
          step: "달래를 깨끗하게 손질하고 2cm 정도 길이로 자른다. ",
          splitted: [""],
        },
        {
          ingredients: ["저염 고추장"],
          step: "저염 고추장을 만든다.",
          splitted: [""],
        },
        {
          ingredients: [],
          step: "달걀 프리이를 만든다. ",
          splitted: [""],
        },
        {
          ingredients: ["저염 고추장"],
          step: "달걀 프라이와 준비한 봄나물을 밥에 얹고 저염 고추장을 곁들여 비빈다.",
          splitted: [""],
        },
      ],
    },
    {
      title: "닭가슴살겨자냉채",
      process: [
        {
          ingredients: ["닭가슴살", "소금", "후춧가루"],
          step: "닭가슴살은 소금, 후춧가루로 밑간해서 삶거나 200도의 오븐에서 15분을 구워 손으로 잘게 찢는다.",
          splitted: [""],
        },
        {
          ingredients: ["노랑, 빨강 파프리카", "피망"],
          step: "노랑, 빨강 파프리카는 채썬다. 피망도 채썬다.",
          splitted: [""],
        },
        {
          ingredients: ["겨자소스"],
          step: "겨자소스를 만든다.",
          splitted: [""],
        },
        {
          ingredients: ["닭가슴살", "노랑, 빨강 파프리카", "피망", "겨자소스"],
          step: "볼에 닭가슴살과 노랑, 빨강 파프리카, 피망을 넣고 겨자소스를 넣어 버무린다. ",
          splitted: [""],
        },
      ],
    },
  ],
  tip: [
    {
      title: "풍미 가득, 영양 가득한 봄나물 ",
      text: "봄이 오는 소식을 들려주는 봄나물에는 각종 비타민과 무기질이 풍부합니다. 냉이, 달래, 취나물, 방풍나물을 이용했습니다. 냉이는 단백질, 칼슘, 철분이 풍부합니다. 달래와 취나물은 비타민A, 칼륨, 칼슘이 많습니다. 피부 노화를 방지하고, 빈혈과 각종 성인병 예방에 도움을 줄 수 있습니다. 풍을 막아준다는 뜻을 가진 방풍나물은 인슐린 분비를 돕는 성분인 쿠마린이 풍부해 당뇨병 환자에게 특히 좋습니다. ",
    },
    {
      title: "당질 낮고 식이섬유 풍부한 현미밥",
      text: "현미는 백미보다 당질 함량이 낮고, 혈당 지수를 천천히 올리도록 돕는 식이섬유가 풍부합니다. 더 큰 효과를 누리고 싶다면 식이섬유가 높은 콩류나 당질 함량이 낮은 귀리, 율무, 서리태, 렌틸콩, 퀴노아 등을 섞어 밥을 짓는 것도 좋습니다. 현미가 백미보다 혈당조절에 용이하긴 하지만, 그래도 탄수화물이기 때문에 양을 조절하며 먹어야 합니다. 또 만성신부전이 있다면 칼륨이 많이 든 현미는 먹지 않는 것이 좋습니다.",
    },
  ],
  user_id: null,
  type_id: 1,
  flavor_id: 4,
  carbohydrate_type_id: null,
};

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

export default function Process() {
  const router = useRouter();
  const [curCard, setCurCard] = useState(0);

  return (
    <>
      <div>
        <Navigation text="상세정보" />
        <div className="container">
          {recipeData.recipe.map((menu, idx) => (
            <div key={idx} className="process-list">
              <div className="title">{menu.title}</div>
              {menu.process.map((step, idx) => (
                <ProcessCard
                  key={idx}
                  num={idx + 1}
                  content={step}
                  selected={curCard == idx}
                />
              ))}
            </div>
          ))}
          <div className="blank">1</div>
          <div className="blank">2</div>
          <div className="blank">3</div>
        </div>
        <FooterButton text="요리 완료하기" path="/" />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          justify-content: center;
          margin-top: 60px;
          overflow: hidden;
          width: 390px;
        }
        .blank {
          opacity: 0;
        }
      `}</style>
    </>
  );
}
