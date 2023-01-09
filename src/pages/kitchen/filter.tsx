import Navigation from "../../components/common/Navigation";

interface FilterDataType {
  filter_category: { id: number; name: string };
  filter: {
    id: number;
    name: string;
    filter_category_id: number;
    selected?: boolean;
  }[];
}
const FilterData: FilterDataType[] = [
  {
    filter_category: {
      id: 0,
      name: "음식 종류",
    },
    filter: [
      {
        id: 0,
        name: "한식",
        filter_category_id: 1,
      },
      {
        id: 1,
        name: "중식",
        filter_category_id: 1,
      },
    ],
  },
  {
    filter_category: {
      id: 1,
      name: "맛",
    },
    filter: [
      {
        id: 4,
        name: "매콤",
        filter_category_id: 2,
      },
      {
        id: 5,
        name: "달콤",
        filter_category_id: 2,
      },
    ],
  },
];

export default function Filter() {
  return (
    <>
      <div className="container">
        <Navigation text={"필터"} />
        <div className="content">
          {FilterData.map((category) => (
            <div key={category.filter_category.id} className="category">
              <h5>{category.filter_category.name}</h5>
              {category.filter.map((filter) => (
                <button key={filter.id}>{filter.name}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
