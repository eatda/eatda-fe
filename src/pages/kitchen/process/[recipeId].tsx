import { useRouter } from "next/router";
import FooterButton from "../../../components/common/FooterButton";
import Navigation from "../../../components/common/Navigation";

interface Process {
  step: number;
  ingredients: string[];
  text: string;
}
const ProcessData: Process[] = [
  {
    step: 1,
    ingredients: ["양상추", "오이", "계란"],
    text: "양상추와 오이는 먹기 좋은 크기로 자른 후, 삶은 계란도 자른다",
  },
  {
    step: 2,
    ingredients: ["새우"],
    text: "손질한 새우는 끓는 물에서 삶은 후 체에 받쳐 놓는다",
  },
  {
    step: 3,
    ingredients: ["올리브"],
    text: "올리브를 잘게 다진다",
  },
  {
    step: 4,
    ingredients: ["드레싱"],
    text: "드레싱 재료를 섞는다",
  },
];

export default function Process() {
  const router = useRouter();
  return (
    <>
      <div>
        <Navigation text="상세정보" />
        <div className="container">
          {ProcessData.map((process) => (
            <div key={process.step} className="process-box">
              <h2>{process.step}</h2>
              <div>
                재료:
                {process.ingredients.map((ingredient) => (
                  <span key={ingredient}> {ingredient},</span>
                ))}
              </div>
              <>
                {process.text.split(process.ingredients[0])[0]}
                <span className="highlight">{process.ingredients[0]}</span>
                {process.text.split(process.ingredients[0])[1]}
              </>
            </div>
          ))}
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
        }
        .process-box {
          background-color: white;
          width: 350px;
          min-height: 176px;
          border-radius: 4px;
        }
        .highlight {
          color: tomato;
        }
      `}</style>
    </>
  );
}
