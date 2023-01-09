import { useEffect, useState } from "react";
import Navigation from "../../components/common/Navigation";

interface FilterType {
  id: number;
  name: string;
  filter_category_id: number;
}
interface FilterDataType {
  filter_category: { id: number; name: string };
  filter: FilterType[];
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
  const [selectedFilter, setSelectedFilter] = useState<Set<FilterType>>(
    new Set()
  );

  const clickFilter = (selected: boolean | undefined, filter: FilterType) => {
    // filter.selected = filter.selected ? false : true;
    if (selected) {
      selectedFilter.delete(filter);
      setSelectedFilter(selectedFilter);
    } else {
      setSelectedFilter(selectedFilter.add(filter));
    }
    console.log(selectedFilter);
  };

  return (
    <>
      <div className="container">
        <Navigation text={"필터"} />
        <div className="content">
          {FilterData.map((category) => (
            <div key={category.filter_category.id} className="category">
              <h5>{category.filter_category.name}</h5>
              {category.filter.map((filter) => (
                <button
                  key={filter.id}
                  onClick={(e) =>
                    clickFilter(selectedFilter.has(filter), filter)
                  }
                >
                  {filter.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
