import Navigation from "../../components/common/Navigation";
import colors from "../../../styles";
import { useEffect, useState } from "react";
import { pasta } from "../../assets/imagePath";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import { Get, Post } from "../../hooks/Fetch";
import FooterButton from "../../components/common/FooterButton";

const offset = new Date().getTimezoneOffset() * 60000;
const today = new Date(Date.now() - offset);

interface MyMealDataType {
  id: number;
  diet: {
    id: number;
    name: { title: string; comment: string };
    image: string;
  };
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
  const [sugar, setSugar] = useState<number>();

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
    setSugar(parseInt(value));
  }

  function handleSubmit() {
    if (typeof selectedMeal?.id == "undefined") {
      alert("'내 식단'에서 식단을 선택해 주세요");
    } else if (typeof sugar === "undefined") {
      alert("혈당을 기록해 주세요");
    } else {
      const data = {
        id: selectedMeal.id,
        level: sugar,
        time: time,
      };
      console.log(data);
      Post({
        url: "users/blood-sugar-level/",
        token: token.access_token,
        requestBody: data,
      });
      router.back();
    }
  }

  return (
    <>
      <Navigation text="식후 혈당 기록하기" />
      <div className="container">
        <div className="today-sugar">
          <div>
            오늘의 혈당
            <div>170 mg/dl</div>
          </div>
          <Image src={pasta} width={320} height={56} alt={"그래프"} priority />
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
            <input
              type="number"
              onChange={(e) => handleSugarChange(e.target.value)}
            />
          </div>
        </div>
      </div>
      <FooterButton onClick={handleSubmit} text="혈당 기록 완료" />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
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
        .clicked {
          background-color: ${colors.mainOrange};
          color: white;
        }

        input[type="time"] {
          float: right;
        }
      `}</style>
    </>
  );
}
