import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import colors from "../../../styles";
import { Get } from "../../hooks/Fetch";
import { selectToken } from "../../store/tokenSlice";

interface WeeklyDataType {
  start: string;
  end: string;
  low: number;
  common: number;
  high: number;
  data: {
    day: string;
    level: number;
  }[];
}

export default function WeeklySummary({ duration }: { duration?: boolean }) {
  const token = useSelector(selectToken);

  const [weeklyData, setWeeklyData] = useState<WeeklyDataType>();

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
    fetchWeeklyData();
  }, []);

  const durationText = `20${weeklyData?.start} ~ ${weeklyData?.end}`;

  const sugarLevelList = [
    { color: colors.mainYellow, text: "저혈당", value: weeklyData?.low },
    { color: colors.mainOrange, text: "정상혈당", value: weeklyData?.common },
    { color: colors.subRed, text: "고혈당", value: weeklyData?.high },
  ];

  return (
    <>
      <div className="container">
        {duration && (
          <>
            <div className="duration">{weeklyData && <>{durationText}</>}</div>
            <div className="explain">
              1주일간 식사 후 혈당을 기록하여 주간 분석 레포트를 발급 받아요!
            </div>
          </>
        )}
        {weeklyData ? (
          <>
            <div className="title">주간 혈당 요약</div>
            <div className="wrapper">
              <div className="ul">
                {sugarLevelList.map((type) => (
                  <div className="li">
                    <div className="circle" style={{ color: type.color }}>
                      ●
                    </div>
                    {type.text} <div className="value">{type.value}일</div>
                  </div>
                ))}
              </div>
              <div className="graph">
                {weeklyData.data.map((day, idx) => (
                  <div key={idx} className={`item level${day.level}`}>
                    <div className="text"> {day.level !== 0 && day.day}</div>
                  </div>
                ))}
              </div>
              {!duration && <div className="mini-duration">{durationText}</div>}
            </div>
          </>
        ) : null}
      </div>
      <style jsx>{`
        .duration {
          color: ${colors.graySubTitle};
          font-weight: 500;
          margin-bottom: 2px;
        }
        .explain {
          font-size: 12px;
          color: ${colors.graySubTitle2};
          margin-bottom: 18px;
        }
        .mini-duration {
          margin-top: 12px;
          font-size: 12px;
          color: ${colors.graySubTitle};
          text-align: right;
        }

        // 주간 혈당 요약
        .title {
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 12px;
        }
        .wrapper {
          background-color: ${colors.grayBackground};
          padding: 12px;
          font-weight: 700;
          border-radius: 4px;
        }
        // 저혈당 고혈당 수
        .ul {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .li {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .circle {
          margin-right: 5px;
        }
        .value {
          margin-left: 4px;
          font-size: 12px;
          color: ${colors.graySubTitle};
        }

        // 그래프
        .graph {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 6px;
        }
        .item {
          height: 24px;
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          border-radius: 2px;
        }
        .text {
          color: ${colors.grayWhite};
          opacity: 0.3;
        }
        .level0 {
          border: solid 1px ${colors.blackSub};
        }
        .level1 {
          background-color: ${sugarLevelList[0].color};
        }
        .level2 {
          background-color: ${sugarLevelList[1].color};
        }
        .level3 {
          background-color: ${sugarLevelList[2].color};
        }
      `}</style>
    </>
  );
}
