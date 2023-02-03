import Image from "next/image";
import { useState } from "react";
import colors from "../../assets/styles";
import { FilterType } from "../../pages/kitchen/filter";

interface FilterButtonProps {
  filter: FilterType;
  clickFilter: any;
  clicked: boolean | undefined;
}
export default function FilterButton({
  filter,
  clickFilter,
  clicked,
}: FilterButtonProps) {
  const [selected, setSelected] = useState(clicked);
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
            <Image
              src={selected ? filter.image_selected : filter.image}
              alt={"icon"}
              width={48}
              height={48}
            />
          </div>
          <div className={selected ? "nameTrue" : "nameFalse"}>
            {filter.name}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 80px;
          margin: 15px;
          text-align: center;
        }
        .nameTrue {
          margin-top: 4px;
          color: ${colors.mainOrange};
        }
        .nameFalse {
          width: 60px;
          margin-top: 4px;
          color: ${colors.graySubTitle};
        }
        .selected .icon {
          height: 60px;
          width: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          border: 1px solid ${colors.mainOrange};
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
