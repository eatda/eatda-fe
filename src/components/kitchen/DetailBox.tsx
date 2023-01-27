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
        <div className="title" onClick={() => setIsOpen(!isOpen)}>
          {/* <Image src={"/icon"} width={12} height={12} alt="" /> */}
          {content.title} {type === "ingredient" && "재료"}
          {type === "ingredient" && <div className="tag">1인분</div>}
          <div> {isOpen ? "ㅠ" : "ㅛ"}</div>
        </div>
        {isOpen && (
          <>
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
            {type == "ingredient" && content.data && (
              <div className="list">
                {content.data.map((item, idx) => (
                  <div key={idx} className="item">
                    <div className="name">{item.name}</div>
                    <div className="amoung">{item.amount}</div>
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
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 53px;
          border: solid 1px ${colors.blackSub};
        }
        .list {
          background-color: ${colors.grayBackground};
          padding: 12px;
        }
        .item {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          height: 37px;
        }
      `}</style>
    </>
  );
}
