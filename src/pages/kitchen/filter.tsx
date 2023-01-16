import { useEffect, useState } from "react";
import Navigation from "../../components/common/Navigation";
import FilterButton from "../../components/filter/FilterButton";

export interface FilterType {
  id: number;
  name: string;
  category: number;
  image: string;
}
interface FilterDataType {
  category: { id: number; name: string };
  filter: FilterType[];
}
interface FilterProps {
  filterData: FilterDataType[];
}

export default function Filter({ filterData }: FilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<Set<FilterType>>(
    new Set()
  );

  const clickFilter = (selected: boolean, filter: FilterType) => {
    if (selected) {
      selectedFilter.delete(filter);
      setSelectedFilter(selectedFilter);
    } else {
      setSelectedFilter(selectedFilter.add(filter));
    }
  };

  const setFilter = () => {
    // 선택된 필터 데이터 requestMap에 맵으로 정리
    let requestMap = new Map<number, number[]>();
    selectedFilter.forEach((filter) => {
      const category = filter.category;
      const prevList = requestMap.get(category);
      if (typeof prevList == "undefined") {
        requestMap.set(category, [filter.id]);
      } else {
        requestMap.set(category, prevList.concat(filter.id));
      }
    });

    // requestMap -> requestQuery 문자열로 바꾸기
    let requestQuery: string = "";
    requestMap.forEach((filters, category) => {
      requestQuery += category + "=";
      filters.forEach((filter) => {
        requestQuery += filter + ",";
      });
      requestQuery = requestQuery.slice(0, -1);
      requestQuery += "&";
    });
    requestQuery = requestQuery.slice(0, -1);
    console.log(requestQuery);
  };

  return (
    <>
      <div className="container">
        <Navigation text={"필터"} />
        <div className="content">
          {filterData.map((data: FilterDataType) => (
            <div key={data.category.id} className="category">
              <h2>{data.category.name}</h2>
              <div className="filters">
                {data.filter.map((filter) => (
                  <FilterButton
                    key={filter.id}
                    filter={filter}
                    clickFilter={clickFilter}
                  />
                ))}
              </div>
              <hr />
            </div>
          ))}
        </div>
        <button onClick={setFilter}>필터를설정해요</button>
      </div>
      <style jsx>{`
        .filters {
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = async () => {
  const filterData = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}diets/filter`)
  ).json();
  return {
    props: {
      filterData,
    },
  };
};
