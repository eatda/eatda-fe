import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import { useSession } from "next-auth/react";
import colors from "../../../styles";
import { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import Image from "next/image";

interface WeeklyDataType {
  start: string;
  end: string;
  low: number;
  common: number;
  high: number;
  data: { day: string; level: number }[];
}

interface LowHighDataType {
  best: {
    id: number;
    name: { title: string; comment: string };
    image: string;
  }[];
  worst: {
    id: number;
    name: { title: string; comment: string };
    image: string;
  }[];
}

export default function Report() {
  const session = useSession();
  const token = useSelector(selectToken);
  const [weeklyData, setWeeklyData] = useState<WeeklyDataType>();
  const [lowHighData, setLowHighData] = useState<LowHighDataType>();

  useEffect(() => {
    async function fetchWeeklyData() {
      const { data, res }: any = await Get({
        url: "users/blood-sugar-level/report/",
        token: token.access_token,
      });
      if (data.ok) {
        setWeeklyData(res);
      } else {
        console.log("weekly data error");
      }
    }
    async function fetchLowHighData() {
      const { data, res }: any = await Get({
        url: "users/diet/rank/",
        token: token.access_token,
      });
      if (data.ok) {
        setLowHighData(res);
      } else {
        console.log("low high data error");
      }
    }
    fetchWeeklyData();
    fetchLowHighData();
  }, []);

  return (
    <>
      <Header text="서재" />
      <MiniHeader
        left="식후 혈당 기록하기"
        right="주간레포트"
        leftURL="/library"
        rightURL="/library/report"
      />
      <div className="container">
        {weeklyData ? (
          <>
            <div className="box">
              <div className="big-title">
                {session.data?.user.name}님의 <br />
                주간보고서 입니다
              </div>
              <div className="duration">
                {weeklyData.start} ~ {weeklyData.end}
              </div>
              <div className="explain">
                1주일간 식사 후 혈당을 기록하여 주간 분석 레포트를 발급 받아요!
              </div>
            </div>
            <div className="box">
              <div className="title">주간 혈당 요약</div>
              <div className="summary">
                <div className="summary-list">
                  <div className="summary-item">저혈당 {weeklyData.low}일</div>
                  <div className="summary-item">
                    정상혈당 {weeklyData.common}일
                  </div>
                  <div className="summary-item">고혈당 {weeklyData.high}일</div>
                </div>
                <div className="bar-graph">
                  {weeklyData.data.map((day, idx) => (
                    <div key={idx} className={`bar-item level${day.level}`}>
                      {day.day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>noooooo</>
        )}

        <hr />
        {lowHighData ? (
          <>
            <div className="box">
              <div className="title"> 식후 혈당 낮았던 식단 TOP3</div>
              <div className="recipe-list">
                {lowHighData.best.map((meal, idx) => (
                  <div key={idx}>
                    <div>
                      {meal.name.comment} {meal.name.title}
                      <Image
                        src={meal.image}
                        width={112}
                        height={85}
                        alt={"이미지"}
                        priority
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="box">
              <div className="title"> 식후 혈당 높았던 식단 TOP3</div>
              <div className="recipe-list">
                {lowHighData.worst.map((meal, idx) => (
                  <div key={idx}>
                    <div>
                      {meal.name.comment} {meal.name.title}
                      <Image
                        src={meal.image}
                        width={112}
                        height={85}
                        alt={"이미지"}
                        priority
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <style jsx>{`
        .container {
          width: 390px;
          padding: 20px;
        }
        .box {
          margin-bottom: 16px;
        }
        .big-title {
          font-size: 24px;
          font-weight: 700;
        }
        .duration {
          color: ${colors.subTitle};
          font-weight: 500;
        }
        .explain {
          font-size: 12px;
          color: ${colors.subTitle2};
        }

        .title {
          font-weight: 700;
          font-size: 20px;
        }

        .summary {
          width: 350px;
          background-color: ${colors.grayBackground};
        }
        .summary-list {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .bar-graph {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 6px;
        }
        .bar-item {
          display: flex;
          flex: 1;
          justify-content: center;
          color: ${colors.grayWhite};
        }
        .level0 {
          border: solid 1px ${colors.blackSub};
        }
        .level1 {
          background-color: ${colors.mainYellow};
        }
        .level2 {
          background-color: ${colors.mainOrange};
        }
        .level3 {
          background-color: ${colors.subRed};
        }
      `}</style>
    </>
  );
}
