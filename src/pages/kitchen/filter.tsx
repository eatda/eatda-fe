import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/common/Navigation";
import FilterButton from "../../components/filter/FilterButton";
import filterSlice, {
  addFilter,
  deleteFilter,
  selectFilter,
} from "../../store/filterSlice";

export interface FilterType {
  id: number;
  name: string;
  category: number;
  image: string;
  image_selected: string;
  selected?: boolean;
}
interface FilterDataType {
  category: { id: number; name: string; query_name: string };
  filter: FilterType[];
}
interface FilterProps {
  filterData: FilterDataType[];
}

export default function Filter({ filterData }: FilterProps) {
  const dispatch = useDispatch();
  const selectedFilter = useSelector(selectFilter);
  const router = useRouter();

  // 필터 데이터 선택여부 초기화
  filterData.forEach((item) => {
    item.filter.forEach((filter) => {
      filter.selected =
        selectedFilter.find(
          (selectedFilterId) => selectedFilterId == filter.id
        ) != undefined;
    });
  });

  // 필터 클릭 시
  const clickFilter = (selected: boolean, filter: FilterType) => {
    if (selected) {
      filter.selected = false;
      dispatch(deleteFilter(filter.id));
    } else {
      filter.selected = true;
      dispatch(addFilter(filter.id));
    }
  };

  const setFilter = () => {
    let requestQuery: string = "";
    filterData.forEach((item) => {
      requestQuery += item.category.query_name + "=";
      item.filter.forEach((filter) => {
        if (
          selectedFilter.find(
            (selectedFilterId) => selectedFilterId == filter.id
          ) != undefined
        ) {
          requestQuery += filter.id + ",";
        }
      });
      requestQuery = requestQuery.slice(0, -1);
      requestQuery += "&";
    });
    requestQuery = requestQuery.slice(0, -1);
    console.log(
      "🚀 ~ file: filter.tsx:73 ~ setFilter ~ requestQuery",
      requestQuery
    );
  };

  // const setFilter = () => {
  //   // 선택된 필터 데이터 requestMap에 맵으로 정리
  //   let requestMap = new Map<number, number[]>();
  //   selectedFilter.forEach((filter) => {
  //     const category = filter.category;
  //     const prevList = requestMap.get(category);
  //     if (typeof prevList == "undefined") {
  //       requestMap.set(category, [filter.id]);
  //     } else {
  //       requestMap.set(category, prevList.concat(filter.id));
  //     }
  //   });

  //   console.log(requestMap);
  //   // requestMap -> requestQuery 문자열로 바꾸기
  //   let requestQuery: string = "";
  //   requestMap.forEach((filters, category) => {
  //     requestQuery += filterData[category - 1].category.query_name + "=";
  //     filters.forEach((filter) => {
  //       requestQuery += filter + ",";
  //     });
  //     requestQuery = requestQuery.slice(0, -1);
  //     requestQuery += "&";
  //   });
  //   requestQuery = requestQuery.slice(0, -1);

  //   // 리덕스로 관리
  //   dispatch(filterSlice.actions.setFilterQuery(requestQuery));
  //   router.back();
  // };

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
                    clicked={filter.selected}
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
