import colors from "../../../styles";

interface SliderDotsProps {
  data: any[];
  cur: number;
}
export default function SliderDots({ data, cur }: SliderDotsProps) {
  return (
    <>
      <div className="list">
        {data?.map((v: any, idx: number) => (
          <div key={idx} className={idx === cur ? "dot now" : "dot"} />
        ))}
      </div>
      <style jsx>{`
        .list {
          margin-top: 13px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 3px;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: ${colors.grayBackgroundSub};
        }
        .now {
          background-color: ${colors.mainOrange};
        }
      `}</style>
    </>
  );
}
