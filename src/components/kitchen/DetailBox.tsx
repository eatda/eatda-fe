import Image from "next/image";
import { useState } from "react";
import colors from "../../../styles";

interface DetailBoxProps {
  icon: string;
  type: "ingredient" | "nutrient" | "tip";
  content: {
    title: string;
    data?: { name: string; amount: string | number }[];
    tip?: { title: string; text: string }[];
  };
}

export default function DetailBox({ icon, type, content }: DetailBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="container">
        <div className="title-box" onClick={() => setIsOpen(!isOpen)}>
          {/* <Image src={"/icon"} width={12} height={12} alt="" /> */}
          <div className="title">
            {content.title} {type === "ingredient" && "재료"}
          </div>
          {type === "ingredient" && <div className="tag">1인분</div>}
          <div> {isOpen ? "ㅠ" : "ㅛ"}</div>
        </div>
        {isOpen && (
          <>
            {type == "ingredient" && content.data && (
              <div className="list">
                {content.data.map((item, idx) => (
                  <div key={idx} className="item">
                    <div className="name">{item.name}</div>
                    <div className="amount">{item.amount}</div>
                  </div>
                ))}
              </div>
            )}
            {type == "nutrient" && content.data && (
              <div className="list">
                {content.data.map((item, idx) => (
                  <div key={idx} className="item">
                    <div className="name">{item.name}</div>
                    <div className={idx == 3 ? "amount" : "kcal"}>
                      {item.amount}
                      {idx == 3 ? "kcal" : "g"}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {type == "tip" && content.tip && (
              <div className="list">
                {content.tip.map((item, idx) => (
                  <div key={idx} className="paragraph">
                    <div className="subtitle">
                      {idx + 1}. {item.title}
                    </div>
                    <div className="text">{item.text}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <style jsx>{`
        .title-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 53px;
          border: solid 1px ${colors.blackSub};
          padding: 0px 12px;
          border-radius: 6px;
        }
        .title {
          font-weight: 700;
        }
        .tag {
          color: ${colors.grayWhite};
          background-color: ${colors.mainOrange};
        }
        .list {
          background-color: ${colors.grayBackground};
          padding: 0px 20px;
          border-radius: 6px;
        }
        .item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          min-height: 38px;
          border-bottom: 1px solid ${colors.grayBackgroundSub};
          font-size: 14px;
        }
        .name {
          color: ${colors.grayMainTitle};
        }

        .paragraph {
          padding: 20px 0px;
        }
        .subtitle {
          color: ${colors.mainOrange};
          font-weight: 700;
        }
        .text {
          color: ${colors.graySubTitle};
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
