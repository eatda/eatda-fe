import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import { useSession } from "next-auth/react";
import colors from "../../../styles";
import { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import Image from "next/image";
import { WeeklySugarDataType } from "../../interface/weeklyData";
import WeeklySumary from "../../components/kitchen/WeeklySummary";
import BestWorstCard from "../../components/library/BestWorstCards";
import BestWorstCards from "../../components/library/BestWorstCards";

export interface MealCardType {
  id: number;
  name: { title: string; comment: string };
  image: string;
}

interface WeeklyDataType {
  start: string;
  end: string;
  low: number;
  common: number;
  high: number;
  data: WeeklySugarDataType[];
}

interface LowHighDataType {
  best: MealCardType[];
  worst: MealCardType[];
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
        <div className="box">
          <div className="big-title">
            {session.data?.user.name}님의 <br />
            주간보고서 입니다
          </div>
          <div className="duration">
            {weeklyData && (
              <>
                20{weeklyData.start} ~ {weeklyData.end}
              </>
            )}
          </div>
          <div className="explain">
            1주일간 식사 후 혈당을 기록하여 주간 분석 레포트를 발급 받아요!
          </div>
        </div>
        <div className="box">
          {weeklyData ? (
            <>
              <div className="title">주간 혈당 요약</div>
              <WeeklySumary
                low={weeklyData.low}
                common={weeklyData.common}
                high={weeklyData.high}
                data={weeklyData.data}
              />
            </>
          ) : null}
        </div>

        <hr />
        <>
          <div className="box">
            <div className="title"> 식후 혈당 낮았던 식단 TOP3</div>
            {lowHighData && <BestWorstCards meals={lowHighData.best} />}
          </div>
          <div className="box">
            <div className="title"> 식후 혈당 높았던 식단 TOP3</div>
            {lowHighData && <BestWorstCards meals={lowHighData.worst} />}
          </div>
        </>
      </div>
      <style jsx>{`
        .container {
          margin-top: 10px;
        }
        .box {
          margin-bottom: 16px;
        }
        .big-title {
          font-size: 24px;
          font-weight: 700;
          padding: 10px 0px;
        }
        .duration {
          color: ${colors.graySubTitle};
          font-weight: 500;
        }
        .explain {
          font-size: 12px;
          color: ${colors.graySubTitle2};
        }

        .title {
          font-weight: 700;
          font-size: 20px;
          margin-top: 18px;
          margin-bottom: 12px;
        }
      `}</style>
    </>
  );
}
