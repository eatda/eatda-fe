import Navigation from "../../components/common/Navigation";

interface FoodType {
  id: number;
  name: string;
  diet_filter_category_id: number;
}
interface FilterDataType {
  diet_category: FoodType[];
  flavor: FoodType[];
  carbo_category: FoodType[];
  meat_category: FoodType[];
  veget_category: FoodType[];
}
const FilterData: FilterDataType = {
  diet_category: [
    //음식 종류
    {
      id: 0,
      name: "한식",
      diet_filter_category_id: 1,
    },
    {
      id: 1,
      name: "중식",
      diet_filter_category_id: 1,
    },
  ],
  flavor: [
    //맛
    {
      id: 4,
      name: "매콤",
      diet_filter_category_id: 2,
    },
    {
      id: 5,
      name: "달콤",
      diet_filter_category_id: 2,
    },
  ],
  carbo_category: [
    //탄수화물  종류
    {
      id: 6,
      name: "현미",
      diet_filter_category_id: 3,
    },
    {
      id: 7,
      name: "통밀",
      diet_filter_category_id: 3,
    },
  ],
  meat_category: [
    //고기 종류
    {
      id: 8,
      name: "닭",
      diet_filter_category_id: 4,
    },
    {
      id: 9,
      name: "돼지",
      diet_filter_category_id: 4,
    },
  ],
  veget_category: [
    //채소 종류
    {
      id: 13,
      name: "시금치",
      diet_filter_category_id: 5,
    },
    {
      id: 14,
      name: "버섯",
      diet_filter_category_id: 5,
    },
  ],
};

export default function Filter() {
  return (
    <>
      <div className="container">
        <Navigation text={"필터"} />
        <div className="content">
          <div className="filter-box">
            <h2>음식 종류</h2>
            <div>
              {FilterData.diet_category.map((diet, idx) => (
                <button key={idx}>{diet.name}</button>
              ))}
            </div>
          </div>
          <div className="filter-box">
            <h2>맛</h2>
            <div>
              {FilterData.flavor.map((diet, idx) => (
                <button key={idx}>{diet.name}</button>
              ))}
            </div>
          </div>
          <div className="filter-box">
            <h2>탄수화물 종류</h2>
            <div>
              {FilterData.carbo_category.map((diet, idx) => (
                <button key={idx}>{diet.name}</button>
              ))}
            </div>
          </div>
          <div className="filter-box">
            <h2>고기 종류</h2>
            <div>
              {FilterData.meat_category.map((diet, idx) => (
                <button key={idx}>{diet.name}</button>
              ))}
            </div>
          </div>
          <div className="filter-box">
            <h2>채소 종류</h2>
            <div>
              {FilterData.veget_category.map((diet, idx) => (
                <button key={idx}>{diet.name}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
