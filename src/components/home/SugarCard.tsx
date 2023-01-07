interface SugarCardProps {
  timeline: number;
  value: number;
  time: string;
}

export default function SugarCard({ timeline, value, time }: SugarCardProps) {
  const mealType = () => {
    switch (timeline) {
      case 0:
        return "아침";
      case 1:
        return "점심";
      case 2:
        return "저녁";
      default:
        return "오류";
    }
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="type">{mealType()}</div>
          <div className="data">
            <div>{value}mg/dl</div>
            <div>{time} 측정</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
            display: flex;
            justify-content: center;
        }
        .card {
          display: flex;
          width: 350px;
          height: 68px;
          padding: 15px;
          box-sizing: border-box;
          background-color: white;
          border-radius: 5px;
          border: 1px solid #E6E6E6
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .data {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
