import colors from "../../assets/styles";
import Header from "../../components/layout/Header";
import { selectToken } from "../../store/tokenSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectFilterQuery } from "../../store/filterSlice";
import PushPageButton from "../../components/common/PushPageButton";
import RecipeList from "../../components/kitchen/RecipeList";
import { btn_filter } from "../../assets/icon";
import { route } from "../../assets/route";
import Hr from "../../components/common/Hr";
import Image from "next/image";
import { illust } from "../../assets/illust";

export default function Recipe() {
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
      <div className="container">
        <div className="textHeader">나에게 딱 맞는 레시피!</div>
        <div className="margin">
          {mineList?.length !== 0 ? (
            <RecipeList type="recommend" mine={true} data={mineList} />
          ) : (
            <div className="emptyMine">
              <Image
                alt="character"
                width={160}
                height={124}
                src={illust.kitchen}
                priority
              />
              <div className="text">
              식사 후 혈당을 기록하여 <br />
              체질 맞춤형 레시피를 추천 받아요!
              </div>
            </div>
          )}
        </div>
      </div>
      <Hr />
      <div className="container">
        <div className="textHeader">오늘 이 레시피는 어때요?</div>
        <PushPageButton name="필터" src={btn_filter} page="/kitchen/filter" />
        <RecipeList type="recommend" data={filterList} />
      </div>
      <style jsx>{`
        .textHeader {
          margin-top: 18px;
          margin-bottom: 10px;
          font-size: 20px;
          font-weight: 700;
        }
        .emptyMine {
          margin-top: 12px;
          // border: 1px solid #d9d9d9;
          height: 152px;
          color: ${colors.graySubTitle2};
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          align-items: center;
        }
        .text {
          margin-top: -18px;
        }
      `}</style>
    </div>
  );
}
