import Image from "next/image";
import colors from "../../assets/styles";
import { DietType } from "../../interface/diet";

interface MealCardProps {
  meals: DietType[];
}

export default function BestWorstCards({ meals }: MealCardProps) {
  return (
    <>
      <div className="wrapper">
        {meals.map((meal, idx) => (
          <div key={idx} className="container">
            <Image
              src={meal.image}
              width={112}
              height={85}
              alt={"이미지"}
              priority
            />
            <div className="name">
              <div className="comment">{meal.name.comment}</div>
              <div className="title">{meal.name.title}</div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: space-around;
          gap: 7px;
        }
        .container {
          border: 1px solid ${colors.blackSub};
          border-radius: 4px;
        }
        .name {
          display: flex;
          flex-direction: column;
          padding: 5px 0px 10px 6px;
          gap: 2px;
        }
        .comment {
          color: ${colors.graySubTitle};
          font-size: 10px;
        }
        .title {
          font-size: 12px;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
