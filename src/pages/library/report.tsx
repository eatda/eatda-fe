import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import { useSession } from "next-auth/react";

const WeeklySugarData = {
  start: "23.01.17",
  end: "01.20",
  low: 0,
  common: 0,
  high: 4,
  data: [
    {
      day: "FRI",
      level: 3,
    },
    {
      day: "THU",
      level: 3,
    },
    {
      day: "WED",
      level: 3,
    },
    {
      day: "TUE",
      level: 3,
    },
  ],
};

export default function Report() {
  const session = useSession();

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
        <div className="title">
          {session.data?.user.name}님의 <br />
          주간보고서 입니다
          <div className="duration">
            {WeeklySugarData.start} ~ {WeeklySugarData.end}
          </div>
          <div className="explain">
            1주일간 식사 후 혈당을 기록하여 주간 분석 레포트를 발급 받아요!
          </div>
        </div>
        <div className="box">
          주간 혈당 요약
          <div className="summary">
            <ul>
              <li>저혈당 {WeeklySugarData.low}일</li>
              <li>정상혈당 {WeeklySugarData.common}일</li>
              <li>고혈당 {WeeklySugarData.high}일</li>
            </ul>
            <div className="bar-graph">
              {WeeklySugarData.data.map((day, idx) => (
                <div key={idx} className={`level${day.level}`}>
                  {day.day}
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className="box">
          식후 혈당 높았던 식단 TOP3
          <div className="recipe-list">
            <div>wow</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 390px;
        }
      `}</style>
    </>
  );
}
