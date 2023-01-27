import Image from "next/image";
import { useState } from "react";
import colors from "../../../styles";

interface DetailBoxProps {
  icon: string;
  type: "ingredient" | "nutrient" | "tip";
  data: { title: string; data: { name: string; amount: string }[] };
}

export default function DetailBox({ icon, type, data }: DetailBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="container">
        <div className="title" onClick={() => setIsOpen(!isOpen)}>
          {/* <Image src={"/icon"} width={12} height={12} alt="" /> */}
          {data.title} {type === "ingredient" && "재료"}
          {type === "ingredient" && <div className="tag">1인분</div>}
          <div> {isOpen ? "ㅠ" : "ㅛ"}</div>
        </div>
        {isOpen && (
          <div className="list">
            {data.data.map((item, idx) => (
              <div key={idx} className="item">
                <div className="name">{item.name}</div>
                <div className="amount">{item.amount}</div>
              </div>
            ))}
          </div>
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
