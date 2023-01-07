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
        <div className="type">{mealType()}</div>
        <div className="data">
          <h4>{value}mg/dl</h4>
          <div>{time} 측정</div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
