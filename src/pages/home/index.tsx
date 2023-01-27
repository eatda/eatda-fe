import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MealCard from "../../components/home/MealCard";
import { pasta } from "../../assets/imagePath";
import SugarCard from "../../components/home/SugarCard";

const sliderSettings = {
  dots: true,
  infinite: true,
  spped: 500,
  slideToShow: 1,
  slideToScroll: 1,
};

const dummyData = [];

export default function Home() {
  return (
    <>
      <div className="container">
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
          <Slider {...sliderSettings}>
            <SugarCard timeline={0} value={145} time={"14:05"} />
            <SugarCard timeline={1} value={150} time={"14:05"} />
            <SugarCard timeline={2} value={160} time={"14:05"} />
          </Slider>
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
        .container {
          display: flex;
          flex-direction: column;
          width: 390px;
        }
      `}</style>
    </>
  );
}
