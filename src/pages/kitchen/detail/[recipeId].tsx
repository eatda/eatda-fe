import Image from "next/image";
import { useRouter } from "next/router";
import { pasta } from "../../../assets/imagePath";
import FooterButton from "../../../components/common/FooterButton";
import Navigation from "../../../components/common/Navigation";
import DetailBox from "../../../components/kitchen/DetailBox";

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
        },
        {
          ingredients: ["냉이", "취나물", "방풍나물", "소금"],
          step: "냉이, 취나물, 방풍나물을 약간의 소금을 넣고 무친다. ",
        },
        {
          ingredients: ["달래"],
          step: "달래를 깨끗하게 손질하고 2cm 정도 길이로 자른다. ",
        },
        {
          ingredients: ["저염 고추장"],
          step: "저염 고추장을 만든다.",
        },
        {
          ingredients: [],
          step: "달걀 프리이를 만든다. ",
        },
        {
          ingredients: ["저염 고추장"],
          step: "달걀 프라이와 준비한 봄나물을 밥에 얹고 저염 고추장을 곁들여 비빈다.",
        },
      ],
    },
    {
      title: "닭가슴살겨자냉채",
      process: [
        {
          ingredients: ["닭가슴살", "소금", "후춧가루"],
          step: "닭가슴살은 소금, 후춧가루로 밑간해서 삶거나 200도의 오븐에서 15분을 구워 손으로 잘게 찢는다.",
        },
        {
          ingredients: ["노랑, 빨강 파프리카", "피망"],
          step: "노랑, 빨강 파프리카는 채썬다. 피망도 채썬다.",
        },
        {
          ingredients: ["겨자소스"],
          step: "겨자소스를 만든다.",
        },
        {
          ingredients: ["닭가슴살", "노랑, 빨강 파프리카", "피망", "겨자소스"],
          step: "볼에 닭가슴살과 노랑, 빨강 파프리카, 피망을 넣고 겨자소스를 넣어 버무린다. ",
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

export default function Detail() {
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
