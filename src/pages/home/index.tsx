import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const sliderSettings = {
  dots: true,
  infinite: true,
  spped: 500,
  slideToShow: 1,
  slideToScroll: 1,
};

export default function Home() {
  return (
    <>
      <div>
        <div className="header">
          <h2>Eat Da</h2>
          <button>character</button>
        </div>
        <div className="homeBox">
          <h4>오늘의 식사</h4>
          <Slider {...sliderSettings}>
            <div>
              <h3>아침</h3>
            </div>
            <div>
              <h3>점심</h3>
            </div>
            <div>
              <h3>저녁</h3>
            </div>
          </Slider>
        </div>
        <div className="homeBox">
          <h4>오늘의 식후 혈당</h4>
          <div>카드</div>
        </div>
        <div className="homeBox">
          <h4>주간 혈당 요약</h4>
          <div>카드</div>
        </div>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}
