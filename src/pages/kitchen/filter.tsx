import { useEffect, useState } from "react";
import Navigation from "../../components/common/Navigation";
import FilterButton from "../../components/filter/FilterButton";

export interface FilterType {
  id: number;
  name: string;
  category: number;
  image: string;
  selected?: boolean;
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
    console.log(selectedFilter);
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
