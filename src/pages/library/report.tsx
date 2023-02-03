import Header from "../../components/common/Header";
import { useSession } from "next-auth/react";
import colors from "../../../styles";
import { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import BestWorstCards from "../../components/library/BestWorstCards";
import WeeklySummary from "../../components/library/WeeklySummary";
import { DietType } from "../../interface/diet";
import Image from "next/image";
import { illust } from "../../assets/illust";
import { route } from "../../assets/route";

interface LowHighDataType {
  best: DietType[];
  worst: DietType[];
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
      <Header
        text="서재"
        left="식후 혈당 기록하기"
        right="주간레포트"
        leftURL={route.library}
        rightURL={route.report}
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
            {lowHighData ? (
              <BestWorstCards meals={lowHighData.best} />
            ) : (
              <Image
                src={illust.report}
                width={352}
                height={150}
                alt="지난 7일간 3회 이상 식후 혈당을 입력한 경우에만
열람 가능합니다."
              />
            )}
          </div>
          <div className="box">
            <div className="title"> 식후 혈당 높았던 식단 TOP3</div>
            {lowHighData ? (
              <BestWorstCards meals={lowHighData.worst} />
            ) : (
              <Image
                src={illust.report}
                width={352}
                height={150}
                alt="지난 7일간 3회 이상 식후 혈당을 입력한 경우에만
열람 가능합니다."
              />
            )}
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
