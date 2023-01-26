import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import colors from "../../../styles";
import PushPageButton from "../../components/common/PushPageButton";
import { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";

const recordData = [
  {
    date: "01.20",
    data: [
      {
        id: 11,
        diet: {
          id: 12,
          name: {
            title: "미니채소오믈렛",
            comment: "식탁에 다채로운 재미를",
          },
          image: "http://localhost:8000/media/default.jpg",
        },
        date: "23.01.20",
        time: "18:04",
        level: 150,
        timeline: 2,
      },
    ],
  },
  {
    date: "01.19",
    data: [
      {
        id: 9,
        diet: {
          id: 1,
          name: {
            title: "미니채소오믈렛",
            comment: "식탁에 다채로운 재미를",
          },
          image: "http://localhost:8000/media/default.jpg",
        },
        date: "23.01.19",
        time: "11:04",
        level: 270,
        timeline: 1,
      },
      {
        id: 10,
        diet: {
          id: 1,
          name: {
            title: "미니채소오믈렛",
            comment: "식탁에 다채로운 재미를",
          },
          image: "http://localhost:8000/media/default.jpg",
        },
        date: "23.01.19",
        time: "18:04",
        level: 120,
        timeline: 2,
      },
    ],
  },
  {
    date: "01.18",
    data: [
      {
        id: 4,
        diet: {
          id: 1,
          name: {
            title: "미니채소오믈렛",
            comment: "식탁에 다채로운 재미를",
          },
          image: "http://localhost:8000/media/default.jpg",
        },
        date: "23.01.18",
        time: "13:04",
        level: 200,
        timeline: 0,
      },
      {
        id: 8,
        diet: {
          id: 1,
          name: {
            title: "미니채소오믈렛",
            comment: "식탁에 다채로운 재미를",
          },
          image: "http://localhost:8000/media/default.jpg",
        },
        date: "23.01.18",
        time: "13:04",
        level: 200,
        timeline: 1,
      },
    ],
  },
  {
    date: "01.17",
    data: [
      {
        id: 3,
        diet: {
          id: 1,
          name: {
            title: "미니채소오믈렛",
            comment: "식탁에 다채로운 재미를",
          },
          image: "http://localhost:8000/media/default.jpg",
        },
        date: "23.01.17",
        time: "11:04",
        level: 300,
        timeline: 2,
      },
    ],
  },
];

export default function Library() {
  const token = useSelector(selectToken);
  const [recordData, setRecordData] = useState([]);

  useEffect(() => {
    async function fetchMyMealData() {
      const { data, res }: any = await Get({
        url: "users/blood-sugar-level/",
        token: token.access_token,
      });
      if (data.ok) {
        setRecordData(res);
        console.log(recordData);
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
      <PushPageButton
        name="필터"
        src="/button/filter.svg"
        page="/library/add"
      />
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
                  <div className={`timeline timeline${data.timeline}`}>
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
        .timeline0 {
          background-color: ${colors.subGreen};
        }
        .timeline1 {
          background-color: ${colors.subPink};
        }
        .timeline2 {
          background-color: ${colors.mainOrange};
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
