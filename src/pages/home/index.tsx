import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MealCard from "../../components/home/MealCard";
import { pasta } from "../../assets/imagePath";

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
            <MealCard
              type={"아침"}
              text={"마음까지 신선해지는"}
              name={"냉파스타 샐러드"}
              img={pasta}
            />
            <MealCard
              type={"점심"}
              text={"마음까지 신선해지는"}
              name={"냉파스타 샐러드"}
              img={pasta}
            />
            <MealCard
              type={"저녁"}
              text={"마음까지 신선해지는"}
              name={"냉파스타 샐러드"}
              img={pasta}
            />
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
