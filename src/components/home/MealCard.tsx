import Image from "next/image";

interface MealCardProps {
  type: string;
  text: string;
  name: string;
  img: string;
}

export default function MealCard({ type, text, name, img }: MealCardProps) {
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="text">
            <h4>{type}</h4>
            <h5>{text}</h5>
            <h3>{name}</h3>
          </div>
          <Image src={img} width={200} height={156} alt="파스타" />
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }
        .card {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
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
