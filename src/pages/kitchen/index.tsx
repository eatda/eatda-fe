import colors from "../../../styles";
import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { selectToken } from "../../store/tokenSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { selectFilterQuery } from "../../store/filterSlice";
import PushPageButton from "../../components/common/PushPageButton";
import RecipeList from "../../components/kitchen/RecipeList";

export default function Recipe() {
  const router = useRouter();
  const token = useSelector(selectToken);
  const filterQuery = useSelector(selectFilterQuery);
  const [filterList, setFilterList] = useState();
  const [mineList, setMineList] = useState<[] | any>([]);

  const fetchMine = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_ROOT}users/diet/fit/`;
    try {
      const data = await fetch(URL, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: token.access_token,
        },
      });

      const res = await data.json();
      return { data, res };
    } catch (error) {
      return error;
    }
  };

  const fetchFilter = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_ROOT}diets?${filterQuery}`;
    try {
      const data = await fetch(URL, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: token.access_token,
        },
      });

      const res = await data.json();

      return { data, res };
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    async function fetchDataFilter() {
      const { data, res }: any = await fetchFilter();
      if (data.ok) {
        setFilterList(res);
      } else {
        console.log("filter error");
      }
    }
    async function fetchDataMine() {
      const { data, res }: any = await fetchMine();
      if (data.ok) {
        setMineList(res);
      } else {
        setMineList([]);
        console.log("mine error");
      }
    }
    fetchDataFilter();
    fetchDataMine();
  }, []);

  return (
    <div className="box">
      <Header text="주방" />
      <MiniHeader
        left="추천 식사"
        right="Our Pick!"
        leftURL="/kitchen"
        rightURL="/kitchen/ourpick"
      />
      <div className="container">
        <div className="textHeader">나에게 딱 맞는 레시피!</div>
        <div className="margin">
          {mineList?.length !== 0 ? (
            <RecipeList type="recommend" mine={true} data={mineList} />
          ) : (
            <div className="emptyMine">
              식사 후 혈당을 기록하여 <br/>
              체질 맞춤형 레시피를 추천 받아요!
            </div>

          )}
        </div>
      </div>
      <div className="bar" />
      <div className="container">
        <div className="textHeader">오늘 이 레시피는 어때요?</div>
        <PushPageButton
          name="필터"
          src="/button/filter.svg"
          page="/kitchen/filter"
        />
        <RecipeList type="recommend" data={filterList} />
      </div>
      <style jsx>{`
        .bar {
          background: #f8f8f8;
          height: 4px;
          margin-top: 12px;
          margin-bottom: 18px;
        }
        .margin {
          // margin-right: 20px;
        }
        .textHeader {
          margin-top: 18px;
          font-size: 20px;
          font-weight: 700;
        }
        .emptyMine {
          margin-top: 12px;
          border: 1px solid #D9D9D9;
          height: 152px;
          color: ${colors.graySubTitle2};
          font-size: 14px;
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
