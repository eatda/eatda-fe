import colors from "../../../styles";
import { WeeklySugarDataType } from "../../interface/weeklyData";

interface WeeklySummaryProps {
  low: number;
  common: number;
  high: number;
  data: WeeklySugarDataType[];
}

export default function WeeklySumary({
  low,
  common,
  high,
  data,
}: WeeklySummaryProps) {
  const sugarLevelList = [
    { color: colors.mainYellow, text: "저혈당", value: low },
    { color: colors.mainOrange, text: "정상혈당", value: common },
    { color: colors.subRed, text: "고혈당", value: high },
  ];

  return (
    <>
      <div className="container">
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
          {data.map((day, idx) => (
            <div key={idx} className={`item level${day.level}`}>
              <div className="text"> {day.level !== 0 && day.day}</div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          background-color: ${colors.grayBackground};
          padding: 12px;
          font-weight: 700;
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
