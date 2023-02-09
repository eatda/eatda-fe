import colors, { sugarLevelColor } from "../../assets/styles";
import PushPageButton from "../../components/common/PushPageButton";
import { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import { selectUser } from "../../store/userSlice";
import { SugarRecordType } from "../../interface/sugarRecord";
import { btn_add, ic_time } from "../../assets/icon";
import Image from "next/image";
import Hr from "../../components/common/Hr";
import { illust } from "../../assets/illust";

interface RecordDataType {
  date: string;
  data: SugarRecordType[];
}

export default function Library() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [recordData, setRecordData] = useState<RecordDataType[]>([]);

  useEffect(() => {
    async function fetchMyMealData() {
      const { data, res }: any = await Get({
        url: "users/blood-sugar-level/",
        token: token.access_token,
      });
      if (data.ok) {
        setRecordData(res);
        console.log(res,data);
      } else {
        console.log("myMealData error");
      }
    }
    fetchMyMealData();
  }, []);

  return (
    <>
      {user.isDiabetes && (
        <PushPageButton name="필터" src={btn_add} page="/library/add" />
      )}
      <div className="container">
        {
          recordData.length === 0 && (
          <div className="empty">
            <Image
              alt="character"
              width={305}
              height={76}
              src={illust.library_empty}
              priority
            />
            <div className="text">
            새로운 혈당 수치 추가를 위해
            <br />+ 버튼을 눌러주세요!
            </div>
          </div>
        )}
        {recordData.map((day, idx) => (
          <div key={idx} className="record-style">
            <div className="date">{day.date}</div>
            <div className="record-list">
              {day.data.map((data, idx) => (
                <div key={idx} className="record-card">
                  <div className={`timeline`}>
                    {data.timeline === 0 && "아침"}
                    {data.timeline === 1 && "점심"}
                    {data.timeline === 2 && "저녁"}
                  </div>
                  <div className="content">
                    <div className="level">
                      <div
                        className="circle"
                        style={{
                          color: sugarLevelColor[data.range],
                          fontSize: "8px",
                        }}
                      >
                        ●
                      </div>{" "}
                      &nbsp;
                      {data.level} mg/dl
                    </div>
                    <div className="time">
                      <Image src={ic_time} alt="" width={16} height={16} />
                      &nbsp;
                      {data.time} 측정
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-top: 32px;
          width: 100%;
        }
        .record-style {
          width: 100%;
        }
        .empty {
          color: ${colors.graySubTitle};
          text-align: center;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -150px;
          justify-content: center;
        }
        .text {
          margin-top: 10px;
        }
        .date {
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 16px;
        }
        .record-card {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          box-sizing: border-box;
          height: 74px;
          border: solid 1px ${colors.blackSub};
          border-radius: 6px;
          margin-bottom: 8px;
        }
        .timeline {
          display: flex;
          width: 44px;
          height: 24px;
          justify-content: center;
          align-items: center;
          background-color: ${colors.mainOrange};
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
          color: white;
        }
        .level {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .time {
          display: flex;
          color: ${colors.graySubTitle2};
          font-size: 14px;
          margin-left: -2px;
        }
      `}</style>
    </>
  );
}
