import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import RecordCard from "../../components/record/RecordCard";
import colors from "../../../styles";

export default function Library() {
  const testData:any=[
    // {
    //   date: "12.24",
    //   records:[
    //     {
    //       level: 120,
    //       time: '09:32',
    //       eat: '아침'
    //     },
    //     {
    //       level: 196,
    //       time: '09:32',
    //       eat: '점심'
    //     },
    //     {
    //       level: 170,
    //       time: '09:32',
    //       eat: '저녁'
    //     },
    //   ]
    // },
    // {
    //   date: "12.23",
    //   records:[
    //     {
    //       level: 120,
    //       time: '09:32',
    //       eat: '아침'
    //     },
    //     {
    //       level: 120,
    //       time: '13:07',
    //       eat: '점심'
    //     },
    //     {
    //       level: 120,
    //       time: '08:36',
    //       eat: '저녁'
    //     },
    //   ]
    // }
  ]
  const testData2=[
    {
      date: "12.24",
      level: 120,
      time: '09:32',
      eat: '아침'
    },
    {
      date: "12.24",
      level: 120,
      time: '09:32',
      eat: '점심'
    },
    {
      date: "12.24",
      level: 120,
      time: '09:32',
      eat: '저녁'
    },
    {
      date: "12.23",
      level: 120,
      time: '09:32',
      eat: '아침'
    },
    {
      date: "12.23",
      level: 120,
      time: '09:32',
      eat: '점심'
    },
    {
      date: "12.23",
      level: 120,
      time: '09:32',
      eat: '저녁'
    },
  ]
  return (
    <>
        <Header text="서재"/>
        <MiniHeader left="식후 혈당 기록하기" right="주간레포트" leftURL="/record" rightURL="/record/report" button="추가" buttonURL="/record/add"/>
        <div className="container">
        {
          testData.length === 0 ?
          <>
          <div className="empty">
            새로운 혈당 수치 추가를 위해<br/>
            + 버튼을 눌러주세요!
          </div>
          </>
          :
          testData.map((v:any,idx:any)=>{
            return(
              <RecordCard
              key={idx}
              />
            )
          })
        }
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 390px;
          min-height: 500px;
        }
        .empty {
          color: ${colors.graySubTitle};
          text-align: center;
        }
      `}</style>
    </>
  );
}
