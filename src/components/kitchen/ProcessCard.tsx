import colors from "../../../styles";

interface ProcessCardProps {
  num: number;
  content: {
    ingredients: string[];
    step: string;
    splitted?: string[];
  };
  selected: boolean;
}

export default function ProcessCard({
  num,
  content,
  selected,
}: ProcessCardProps) {
  return (
    <>
      <div className="container">
        <div className="num">{num}</div>
        <div className="text">
          {content.splitted?.map((word, idx) => (
            <span key={idx}>
              {word}
              <span className="highlight">{content.ingredients[idx]}</span>
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          border: 1px solid ${colors.blackSub};
          border-radius: 4px;
          padding: 12px;
          margin-bottom: 12px;
        }
        .num {
          background-color: ${colors.mainOrange};
          width: 20px;
          height: 20px;
          text-align: center;
          color: ${colors.grayWhite};
          border-radius: 50%;
          margin-bottom: 8.6px;
        }
        .text {
          font-weight: 500;
          font-size: 20px;
        }
        .highlight {
          color: ${colors.mainOrange};
        }
      `}</style>
    </>
  );
}
