import Navigation from "../../components/layout/Navigation";
import colors from "../../assets/styles";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import { Get, Post } from "../../hooks/Fetch";
import FooterButton from "../../components/common/FooterButton";
import { DietType } from "../../interface/diet";
import { down, up } from "../../assets/icon";

const offset = new Date().getTimezoneOffset() * 60000;
const today = new Date(Date.now() - offset);

interface MyMealDataType {
  id: number;
  diet: DietType;
  date: string;
  timeline: number;
}
interface SelectedMealType {
  id: number;
  name: string;
  date: string;
  timeline: number;
}

export default function Add() {
  const router = useRouter();
  const token = useSelector(selectToken);
  const [myMealData, setMyMealData] = useState<MyMealDataType[]>([]);
  const sugarInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchMyMealData() {
      const { data, res }: any = await Get({
        url: "users/diet/",
        token: token.access_token,
      });
      if (data.ok) {
        setMyMealData(res);
      } else {
        console.log("myMealData error");
      }
    }
    fetchMyMealData();
  }, []);

  const [mealOpened, setMealOpened] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<SelectedMealType>();
  const [time, setTime] = useState(today.toISOString().slice(11, 16));
  const [sugar, setSugar] = useState<number>(0);

  function dontClickGraph() {
    sugarInput.current?.focus();
  }
  function handleMealChange(id: number) {
    const clicked = myMealData.filter((item) => item.id === id)[0];
    const clickedData: SelectedMealType = {
      id: clicked.id,
      name: clicked.diet.name.title,
      date: clicked.date,
      timeline: clicked.timeline,
    };
    setSelectedMeal(clickedData);
  }
  function handleTimeChange(e: React.FormEvent<HTMLInputElement>) {
    const newValue = (e.target as HTMLInputElement).value;
    setTime(newValue);
  }
  function handleSugarChange(value: string) {
    if (value == "") {
      setSugar(0);
    } else {
      setSugar(parseInt(value));
    }
  }

  function handleSubmit() {
    if (typeof selectedMeal?.id == "undefined") {
      alert("'내 식단'에서 식단을 선택해 주세요");
    } else if (typeof sugar === "undefined") {
      alert("혈당을 기록해 주세요");
    } else if (sugar <= 0 || sugar > 300) {
      alert("혈당량은 0 이상 300 이하의 값만 입력 가능합니다");
    } else {
      console.log(sugar);
      const requestBody = {
        id: selectedMeal.id,
        level: sugar,
        time: time,
      };
      const { data, res }: any = Post({
        url: "users/blood-sugar-level/",
        token: token.access_token,
        requestBody: requestBody,
      });
      if (typeof data !== "undefined" && data.status === 400) {
        alert("혈당 입력에 실패했습니다.");
      }
      router.back();
    }
  }

  return (
    <>
      <Navigation text="식후 혈당 기록하기" />
      <div className="container">
        <div className="today-sugar">
          <div>
            <div className="intro" onClick={dontClickGraph}>
              <div className="intro_title">오늘의 혈당</div>
              <div className="intro_sugar">{sugar} mg/dl</div>
              <div className="bar">
                <div className="bar1"></div>
                <Image
                  alt="chart"
                  width={16}
                  height={21}
                  src={`/img/chart/arrow.svg`}
                  priority
                />
              </div>
              <Image
                alt="chart"
                width={318}
                height={61}
                src={`/img/chart/chart_0.svg`}
                priority
              />
            </div>
          </div>
        </div>
        <div className="input-list">
          <div className="item" onClick={() => setMealOpened(!mealOpened)}>
            내 식단
            <div className="icon">
              {mealOpened ? (
                <Image
                  alt="character"
                  width={16}
                  height={10}
                  src={down}
                  priority
                />
              ) : (
                <Image
                  alt="character"
                  width={16}
                  height={10}
                  src={up}
                  priority
                />
              )}
            </div>
          </div>
          {mealOpened && (
            <div className="mymeal-list">
              <span style={{ fontSize: "12px" }}>
                해당하는 식단을 골라주세요.
              </span>
              {myMealData.map((meal) => (
                <div
                  key={meal.id}
                  className={
                    meal.id !== selectedMeal?.id
                      ? "mymeal-item"
                      : "mymeal-item clicked"
                  }
                  onClick={() => handleMealChange(meal.id)}
                >
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
            <div>
              <span>{selectedMeal?.date}</span>{" "}
              <span>
                {selectedMeal?.timeline == 0 && "아침"}
                {selectedMeal?.timeline == 1 && "점심"}
                {selectedMeal?.timeline == 2 && "저녁"}
              </span>
            </div>
          </div>
          <div className="item">
            시간
            <input type="time" onChange={handleTimeChange} value={time} />
          </div>
          <div className="item">
            혈당{" "}
            <div className="num">
              <input
                type="number"
                min="0"
                max="300"
                onChange={(e) => handleSugarChange(e.target.value)}
                ref={sugarInput}
              />
              mg/dl
            </div>
          </div>
        </div>
      </div>
      <FooterButton onClick={handleSubmit} text="혈당 기록 완료" />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 50px;
        }

        .today-sugar {
          width: 340px;
          height: 200px;
          font-weight: 700;
        }

        .item {
          // gap: 12px;
          margin-top: 12px;
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
          color: ${colors.graySubTitle};
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
          color: ${colors.graySubTitle};
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
        .clicked {
          background-color: ${colors.mainOrange};
          color: white;
        }

        input[type="time"] {
          float: right;
          width: 120px;
          height: 27px;
          font-size: 16px;
          border: none;
          font-family: "Pretendard-Regular";
        }
        input[type="number"] {
          text-align: right;
          margin-left: auto;
          margin-right: 3px;
          width: 75px;
          height: 27px;
          font-size: 16px;
          border: none;
          font-family: "Pretendard-Regular";
        }

        .intro {
          height: 124px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .intro_title {
          font-size: 16px;
          font-weight: 700;
        }
        .intro_sugar {
          margin-top: 8px;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: 700;
          color: ${colors.mainOrange};
        }
        .bar {
          width: 300px;
          height: 20px;
          display: flex;
        }
        .bar1 {
          background: #ff9458;
          height: 22px;
          // width: ${((sugar - 12) / 300) * 100 > 300
            ? 0
            : ((sugar - 12) / 300) * 100}%;
          margin-left: ${((sugar - 12) / 300) * 100 > ((300 - 12) / 300) * 100
            ? ((300 - 12) / 300) * 100
            : ((sugar - 12) / 300) * 100}%;
          max-width: 200px;
          opacity: 0.3;
        }
        .bar2 {
          background: #ffe094;
          height: 22px;
          opacity: 0.3;
        }
        .bar3 {
          background: #d8593c;
          width: 160px;
          height: 22px;
          opacity: 0.3;
        }
      `}</style>
    </>
  );
}
