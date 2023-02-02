import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import FooterButton from "../../components/common/FooterButton";
import Navigation from "../../components/common/Navigation";
import FilterButton from "../../components/filter/FilterButton";
import {
  addFilter,
  deleteFilter,
  selectFilter,
  setFilterQuery,
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

  console.log(filterData);

  // 필터 데이터 선택여부 초기화
  filterData.forEach((item) => {
    item.filter.forEach((filter) => {
      filter.selected =
        selectedFilter.find(
          (selectedFilterId) => selectedFilterId == filter.id
        ) != undefined;
    });
  });

  // 각 필터 클릭 시
  const clickFilter = (selected: boolean, filter: FilterType) => {
    if (selected) {
      filter.selected = false;
      dispatch(deleteFilter(filter.id));
    } else {
      filter.selected = true;
      dispatch(addFilter(filter.id));
    }
  };

  // 필터 결정하기
  const setFilter = () => {
    // 서버통신에 사용할 쿼리스트링으로 변환
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

    // 쿼리스트링 전역상태 설정
    dispatch(setFilterQuery(requestQuery));

    // 화면 이동
    router.back();
  };

  return (
    <>
      <Navigation text={"필터"} />
      <div className="container">
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
              <div className="bar"/>
            </div>
          ))}
        </div>
      </div>
      <FooterButton onClick={setFilter} text="설정하기" />
      <style jsx>{`
        .filters {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        .bar {
          background: #F8F8F8;
          height: 4px;
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
