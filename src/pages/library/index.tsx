import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import colors from "../../../styles";
import PushPageButton from "../../components/common/PushPageButton";
import { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import { selectUser } from "../../store/userSlice";

interface RecordDataType {
  date: string;
  data: {
    id: number;
    diet: {
      id: number;
      image: string;
      name: { title: string; comment: string };
    };
    time: string;
    level: number;
    timeline: number;
  }[];
}

export default function Library() {
  const user = useSelector(selectUser);
  console.log("🚀 ~ file: index.tsx:28 ~ Library ~ user", user);
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
      } else {
        console.log("myMealData error");
      }
    }
    fetchMyMealData();
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
      {user.isDiabetes && (
        <PushPageButton
          name="필터"
          src="/button/filter.svg"
          page="/library/add"
        />
      )}
      <div className="container">
        {recordData.length === 0 && (
          <div className="empty">
            새로운 혈당 수치 추가를 위해
            <br />+ 버튼을 눌러주세요!
          </div>
        )}
        {recordData.map((day, idx) => (
          <div key={idx}>
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
                    <div className="level">{data.level} mg/dl</div>
                    <div className="time">{data.time} 측정</div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 390px;
          margin-top: 32px;
        }
        .empty {
          color: ${colors.graySubTitle};
          text-align: center;
        }
        .date {
          font-weight: 700;
          margin-bottom: 16px;
        }
        .record-card {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          box-sizing: border-box;
          width: 350px;
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
          font-size: 20px;
          font-weight: 700;
        }
        .time {
          color: ${colors.subTitle2};
          font-size: 14px;
        }
        hr {
          border: 0;
          border-top: 1px solid ${colors.blackSub};
          margin-bottom: 24px;
        }
      `}</style>
    </>
  );
}
