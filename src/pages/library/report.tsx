import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import { useSession } from "next-auth/react";
import colors from "../../../styles";
import { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import BestWorstCards from "../../components/library/BestWorstCards";
import WeeklySummary from "../../components/kitchen/WeeklySummary";

export interface MealCardType {
  id: number;
  name: { title: string; comment: string };
  image: string;
}

interface LowHighDataType {
  best: MealCardType[];
  worst: MealCardType[];
}

export default function Report() {
  const session = useSession();
  const token = useSelector(selectToken);

  const [lowHighData, setLowHighData] = useState<LowHighDataType>();

  useEffect(() => {
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
            {session?.data?.user.name}님의 <br />
            주간보고서 입니다
          </div>
          <WeeklySummary duration={true} />
        </div>
        <div className="hr" />
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
        .hr {
          margin: 0px -20px;
          height: 4px;
          background-color: ${colors.grayBackground};
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
