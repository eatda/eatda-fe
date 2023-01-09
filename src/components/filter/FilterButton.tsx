import { useState } from "react";
import { FilterType } from "../../pages/kitchen/filter";

interface FilterButtonProps {
  filter: FilterType;
  clickFilter: any;
}
export default function FilterButton({
  filter,
  clickFilter,
}: FilterButtonProps) {
  const [selected, setSelected] = useState(filter.selected);

  return (
    <>
      <div className="container">
        <button
          key={filter.id}
          onClick={() => {
            setSelected(!selected);
            clickFilter(selected, filter);
          }}
          className={selected ? "selected" : "not-selected"}
        >
          {filter.name}
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
