import { useRouter } from "next/router";
import FooterButton from "../../../components/common/FooterButton";
import Navigation from "../../../components/common/Navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import colors from "../../../../styles";

interface Process {
  step: number;
  ingredients: string[];
  text: string;
  splitted?: string[];
}
// const ProcessData: Process[] = [
//   {
//     step: 1,
//     ingredients: ["양상추", "오이", "계란"],
//     text: "양상추와 오이는 먹기 좋은 크기로 자른 후, 삶은 계란도 자른다",
//   },
//   {
//     step: 2,
//     ingredients: ["새우"],
//     text: "손질한 새우는 끓는 물에서 삶은 후 체에 받쳐 놓는다",
//   },
//   {
//     step: 3,
//     ingredients: ["올리브"],
//     text: "올리브를 잘게 다진다",
//   },
//   {
//     step: 4,
//     ingredients: ["드레싱"],
//     text: "드레싱 재료를 섞는다",
//   },
// ];
const ProcessData: Process[] = [
  {
    step: 1,
    ingredients: ["쌀가루 팬케이크"],
    text: "쌀가루 팬케이크",
  },
  {
    step: 2,
    ingredients: ["쌀가루", "달걀", "우유", "설탕", "베이킹파우더"],
    text: "볼에 쌀가루, 달걀, 우유, 설탕, 베이킹파우더를 넣고 덩어리지지 않게 잘 섞는다.",
  },
  {
    step: 3,
    ingredients: ["식용유", "키친타월"],
    text: "팬에 식용유를 살짝 두르고 키친타월로 닦아낸 뒤 팬케이크 반죽을 떠 넣어 굽는다. 반죽의 테두리 부분이 익어갈 때쯤 뒤집어 앞뒤로 노릇노릇하게 굽는다.",
  },
  {
    step: 4,
    ingredients: ["치아시드 과일요거트"],
    text: "치아시드 과일요거트",
  },
  {
    step: 5,
    ingredients: ["천도복숭아", "청포도"],
    text: "천도복숭아는 꺠끗이 씻어 적당한 크기로 썰고, 청포도는 알알이 떼어 깨끗하게 씻는다",
  },
  {
    step: 6,
    ingredients: ["요구르트", "치아시드", "청포도", "천도 복숭아"],
    text: "그릇에 요구르트와 치아시드를 담고 청포도와 천도 복숭아를 올린다.",
  },
];

export default function Process() {
  const router = useRouter();

  // 레시피 과정 데이터에서 재료만 골라서 하이라이트
  ProcessData.forEach((process) => {
    let regex_str = "";
    process.ingredients.forEach((ingredient) => {
      regex_str = regex_str + ingredient + "|";
    });
    regex_str = regex_str.slice(0, -1);

    const regex = new RegExp(regex_str);
    process.splitted = process.text.split(regex);
  });

  const [curCard, setCurCard] = useState(0);

  return (
    <>
      <div>
        <Navigation text="상세정보" />
        <div className="container">
          <Slider
            vertical={true}
            verticalSwiping={true}
            slidesToShow={4}
            infinite={false}
            arrows={false}
            focusOnSelect={true}
            beforeChange={(slide, newSlide) => {
              setCurCard(newSlide);
            }}
          >
            {ProcessData.map((process, idx) => (
              <div
                key={idx}
                className={
                  idx == curCard ? "process-box selected" : "process-box"
                }
              >
                <h2>{process.step}</h2>
                <>
                  {process.splitted?.map((word, idx) => (
                    <span key={idx}>
                      {word}
                      <span className="highlight">
                        {process.ingredients[idx]}
                      </span>
                    </span>
                  ))}
                </>
              </div>
            ))}
            <div className="process-box blank">1</div>
            <div className="process-box blank">2</div>
            <div className="process-box blank">3</div>
          </Slider>
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
        .process-box {
          background-color: white;
          width: 350px;
          min-height: 108px;
          border-radius: 4px;
        }
        .selected {
          border: 1px solid ${colors.mainOrange};
        }
        .blank {
          opacity: 0;
        }
        .highlight {
          color: tomato;
        }
      `}</style>
    </>
  );
}
