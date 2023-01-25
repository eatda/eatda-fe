import Navigation from "../../components/common/Navigation";
import colors from "../../../styles";
import { useState } from "react";
import { pasta } from "../../assets/imagePath";
import Image from "next/image";

const dummyData = [
  {
    id: 14,
    diet: {
      id: 15,
      name: {
        title: "치아바타샌드위치",
        comment: "햄과 치아바타의 치정극",
      },
      image: "http://localhost:8000/media/default.jpg",
    },
    date: "23.01.20",
    timeline: 1,
  },
  {
    id: 14,
    diet: {
      id: 15,
      name: {
        title: "치아바타샌드위치",
        comment: "햄과 치아바타의 치정극",
      },
      image: "http://localhost:8000/media/default.jpg",
    },
    date: "23.01.20",
    timeline: 1,
  },
];

export default function Add() {
  const [mealOpened, setMealOpened] = useState(false);

  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const [time, setTime] = useState(today.toISOString().slice(11, 16));

  const handleTimeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;
    setTime(newValue);
    console.log(time);
  };

  return (
    <>
      <Navigation text="식후 혈당 기록하기" />
      <div className="container">
        <div className="today-sugar">
          <div>
            오늘의 혈당
            <div>170 mg/dl</div>
          </div>
          <Image src={pasta} width={320} height={56} alt={"그래프"} />
        </div>
        <div className="input-list">
          <div className="item" onClick={() => setMealOpened(!mealOpened)}>
            내 식단
            <div className="icon">{mealOpened ? "ㅛ" : "ㅠ"}</div>
          </div>
          {mealOpened && (
            <div className="mymeal-list">
              <span style={{ fontSize: "12px" }}>
                해당하는 식단을 골라주세요.
              </span>
              {dummyData.map((meal) => (
                <div key={meal.id} className="mymeal-item">
                  <div>{meal.diet.name.title}</div>
                  <div>
                    <span>{meal.date}</span>{" "}
                    <span>
                      {meal.timeline == 0 && "아침"}
                      {meal.timeline == 1 && "점심"}
                      {meal.timeline == 2 && "저녁"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="item date">
            날짜
            <span>22.02.09</span>
          </div>
          <div className="item">
            시간
            <input type="time" onChange={handleTimeChange} value={time} />
          </div>
          <div className="item">
            혈당 <input type="number" />
          </div>
        </div>
      </div>
      <button>혈당 기록 완료</button>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 390px;
          padding-top: 70px;
        }

        .today-sugar {
          width: 340px;
          height: 200px;
          font-weight: 700;
        }

        .item {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px 16px;
          box-sizing: border-box;
          width: 342px;
          height: 53px;
          border: solid 1px ${colors.blackSub};
          border-radius: 6px;
          font-weight: 700;
        }
        .date {
          background-color: ${colors.blackSub};
        }
        .date span {
          color: ${colors.subTitle};
          font-weight: 500;
        }

        .mymeal-list {
          display: flex;
          flex-direction: column;
          width: 342px;
          gap: 8px;
          padding: 8px;
          box-sizing: border-box;
          background-color: ${colors.blackSub};
          color: ${colors.subTitle};
        }
        .mymeal-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 326px;
          height: 53px;
          border-radius: 6px;
          padding: 0px 12px;
          box-sizing: border-box;
          background-color: ${colors.grayWhite};
        }

        input[type="time"] {
          float: right;
        }
      `}</style>
    </>
  );
}
