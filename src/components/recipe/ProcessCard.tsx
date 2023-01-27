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
      <div className="process-box">
        {typeof content == "string" ? (
          <div>
            <h2>{content}</h2>
          </div>
        ) : (
          <div className={selected ? "selected" : ""}>
            <h3>{num}</h3>
            <div>
              {content.splitted?.map((word, idx) => (
                <span key={idx}>
                  {word}
                  <span className="highlight">{content.ingredients[idx]}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .process-box {
          background-color: white;
          width: 350px;
          height: 108px;
          border-radius: 4px;
          box-sizing: border-box;
        }
        .selected {
          border: 1px solid ${colors.mainOrange};
        }
        .highlight {
          color: ${colors.mainOrange};
        }
      `}</style>
    </>
  );
}
