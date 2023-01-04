import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import RecordCard from "../../components/record/RecordCard";

export default function Library() {
  const testData=[
    {
      date: "12.24",
      records:[
        {
          level: 120,
          time: '09:32',
          eat: '아침'
        },
        {
          level: 196,
          time: '09:32',
          eat: '점심'
        },
        {
          level: 170,
          time: '09:32',
          eat: '저녁'
        },
      ]
    },
    {
      date: "12.23",
      records:[
        {
          level: 120,
          time: '09:32',
          eat: '아침'
        },
        {
          level: 120,
          time: '13:07',
          eat: '점심'
        },
        {
          level: 120,
          time: '08:36',
          eat: '저녁'
        },
      ]
    }
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
      <div className="container">
        <Header text="서재"/>
        <MiniHeader left="식후 혈당 기록하기" right="주간레포트" left_url="/record" right_url="/record/report"/>
        {
          testData.map((v,idx)=>{
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
          width: 390px;
        }
      `}</style>
    </>
  );
}
