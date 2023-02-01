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
  return (
    <>
      <div className="summary">
        <div className="summary-list">
          <div className="summary-item">저혈당 {low}일</div>
          <div className="summary-item">정상혈당 {common}일</div>
          <div className="summary-item">고혈당 {high}일</div>
        </div>
        <div className="bar-graph">
          {data.map((day, idx) => (
            <div key={idx} className={`bar-item level${day.level}`}>
              {day.day}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .summary {
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
