import Image from "next/image";
import { pasta } from "../../assets/imagePath";

export default function MealCard() {
  return (
    <>
      <div className="meal-card">
        <div className="card-text">
          <h4>점심</h4>
          <h5>마음까지 신선해지는,</h5>
          <h3>냉파스타 샐러드</h3>
        </div>
        <Image src={pasta} width={200} height={150} alt="파스타" />
      </div>
      <style jsx>{`
        .meal-card {
          display: flex;
          flex-direction: row;
          width: 349px;
          height: 158px;
          border: 1px solid #e6e6e6;
          background-color: white;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
}
