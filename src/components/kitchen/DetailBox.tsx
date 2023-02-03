import Image from "next/image";
import { useState } from "react";
import colors from "../../assets/styles";
import { down, main, nutrient, side, tips, up } from "../../assets/icon";

interface DetailBoxProps {
  idx?: number;
  type: "ingredient" | "nutrient" | "tip";
  content: {
    title: string;
    data?: { name: string; amount: string | number }[];
    tip?: { title: string; text: string }[];
  };
}

export default function DetailBox({ idx, type, content }: DetailBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="container">
        <div className="title-box" onClick={() => setIsOpen(!isOpen)}>
          <div className="title">
            {type === "ingredient" && (
              <Image
                alt=""
                width={16}
                height={16}
                src={idx === 0 ? main : side}
                priority
              />
            )}
            {type === "nutrient" && (
              <Image alt="" width={16} height={16} src={nutrient} priority />
            )}
            {type === "tip" && (
              <Image alt="" width={16} height={16} src={tips} priority />
            )}
            &nbsp;
            {content.title} {type === "ingredient" && "재료"}
          </div>
          {type === "ingredient" && <div className="tag">1인분</div>}
          <div>
            {isOpen ? (
              <Image alt="down" width={16} height={10} src={down} priority />
            ) : (
              <Image alt="up" width={16} height={10} src={up} priority />
            )}
          </div>
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
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 16px;
        }
        .tag {
          color: ${colors.grayWhite};
          background-color: ${colors.graySubTitle};
          border-radius: 2px;
          font-size: 12px;
          width: 36px;
          height: 18px;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          margin-left: auto;
          margin-right: 15px;
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
