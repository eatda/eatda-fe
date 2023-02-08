import colors from "../../assets/styles";
import { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import BestWorstCards from "../../components/library/BestWorstCards";
import WeeklySummary from "../../components/library/WeeklySummary";
import { DietType } from "../../interface/diet";
import Image from "next/image";
import { character } from "../../assets/illust";
import Hr from "../../components/common/Hr";
import { illust } from "../../assets/illust";

interface LowHighDataType {
  best: DietType[];
  worst: DietType[];
}

export default function Report() {
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
        console.log(res, data);
      } else {
        console.log("low high data error");
      }
    }
    fetchLowHighData();
  }, []);

  return (
    <div className="out">
      <div className="container">
        <div className="box">
          <WeeklySummary duration={true} />
        </div>
        <Hr />
        <>
          <div className="box">
            <div className="title"> 식후 혈당 낮았던 식단 TOP3</div>
            {
              lowHighData &&
              lowHighData.best &&
              lowHighData.best.length ===0 &&
              <div className="empty">
                <div className="emptyImg">
                  <Image
                    src={illust.empty1}
                    width={98}
                    height={62}
                    alt="character"
                  />
                </div>
                <div className="emptyText">
                  지난 7일간 3회 이상 식후 혈당을 입력한 경우에만 <br />
                  열람 가능합니다.
                </div>
              </div>
            }
            {lowHighData && <BestWorstCards meals={lowHighData.best} />}
            {/* {lowHighData ? (
              <BestWorstCards meals={lowHighData.best} />
            ) : (
              <div className="empty">
                <div className="emptyImg">
                  <Image
                    src={illust.empty1}
                    width={98}
                    height={62}
                    alt="character"
                  />
                </div>
                <div className="emptyText">
                  지난 7일간 3회 이상 식후 혈당을 입력한 경우에만 <br />
                  열람 가능합니다.
                </div>
              </div>
            )} */}
          </div>
          <div className="box">
            <div className="title"> 식후 혈당 높았던 식단 TOP3</div>
            {
              lowHighData &&
              lowHighData.worst &&
              lowHighData.worst.length ===0 &&
              <div className="empty">
                <div className="emptyImg">
                  <Image
                    src={illust.empty2}
                    width={101}
                    height={68}
                    alt="character"
                  />
                </div>
                <div className="emptyText">
                  지난 7일간 3회 이상 식후 혈당을 입력한 경우에만 <br />
                  열람 가능합니다.
                </div>
              </div>
            }
            {lowHighData && <BestWorstCards meals={lowHighData.worst} />}

            {/* {lowHighData ? (
              <BestWorstCards meals={lowHighData.worst} />
            ) : (
              <div className="empty">
                <div className="emptyImg">
                  <Image
                    src={illust.empty2}
                    width={101}
                    height={68}
                    alt="character"
                  />
                </div>
                <div className="emptyText">
                  지난 7일간 3회 이상 식후 혈당을 입력한 경우에만 <br />
                  열람 가능합니다.
                </div>
              </div>
            )} */}
          </div>
        </>
      </div>
      <style jsx>{`
        .container {
        }
        .box {
          margin-bottom: 16px;
        }
        .title {
          font-weight: 700;
          font-size: 20px;
          margin-top: 18px;
          margin-bottom: 12px;
        }
        .empty {
          display: flex;
          flex-direction: column;
          align-item: center;
          justify-content: center;
          text-align: center;
          height: 150px;
          // border: 1px solid #d9d9d9;
        }
        .emptyText {
          font-size: 14px;
          color: ${colors.graySubTitle2};
        }
      `}</style>
    </div>
  );
}