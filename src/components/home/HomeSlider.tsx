import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import colors from "../../assets/styles";

interface HomeSliderProps {
  initial: number;
  children?: JSX.Element;
}

export default function HomeSlider({ initial, children }: HomeSliderProps) {
  const [cur, setCur] = useState(initial);

  return (
    <>
      <Slider
        infinite={false}
        initialSlide={initial}
        beforeChange={(curSlide, newSlide) => setCur(newSlide)}
      >
        {children}
      </Slider>
      <div className="list">
        {[0, 1, 2]?.map((v: any, idx: number) => (
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
          margin-bottom: 8px;
        }
        .now {
          background-color: ${colors.mainOrange};
        }
      `}</style>
    </>
  );
}
