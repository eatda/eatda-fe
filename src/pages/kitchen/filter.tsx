import { useEffect, useState } from "react";
import Navigation from "../../components/common/Navigation";

interface FilterType {
  id: number;
  name: string;
  filter_category_id: number;
  selected?: boolean;
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
    filter.selected = filter.selected ? false : true;
    if (selected) {
      console.log("delete: ", filter);
    } else {
      setSelectedFilter(selectedFilter.add(filter));
    }
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
                  onClick={() => clickFilter(filter.selected, filter)}
                  className={filter.selected ? "selected" : "not-selected"}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            console.log(
              "🚀 ~ file: filter.tsx:56 ~ Filter ~ selected",
              selectedFilter
            );
          }}
        >
          fkfkfk
        </button>
      </div>
      <style jsx>{`
        .selected {
          background-color: black;
          color: white;
        }
        .not-selected {
          background-color: white
          color: black;
        }
      `}</style>
    </>
  );
}
