import Image from "next/image";
import { useState } from "react";
import colors from "../../../styles";
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
        <div
          key={filter.id}
          onClick={() => {
            setSelected(!selected);
            clickFilter(selected, filter);
          }}
          className={selected ? "selected" : "not-selected"}
        >
          <div className="icon">
            <Image src={filter.image} alt={"icon"} width={48} height={48} />
          </div>
          <div className="name-text">{filter.name}</div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 80px;
        }
        .selected .icon {
          background-color: ${colors.mainOrange};
          border-radius: 50%;
          color: white;
        }
        .not-selected {
          background-color: white;
          color: black;
        }
      `}</style>
    </>
  );
}
