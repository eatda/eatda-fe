import RecipeList from "../../components/recipe/RecipeList";
import colors from "../../../styles";
import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import { useRouter } from "next/router";
import { selectToken } from "../../store/tokenSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { selectFilter } from "../../store/filterSlice";

export default function Recipe() {
  const router = useRouter();
  const token = useSelector(selectToken);
  const filter = useSelector(selectFilter);
  const [filterList, setFilterList] = useState();
  const [mineList, setMineList] = useState();

  const handleClick = () => {
    router.push("/kitchen/filter");
  };

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

      const res = data.json();
      return { data, res };
    } catch (error) {
      return error;
    }
  };

  const fetchFilter = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_ROOT}diets?${filter}`;
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
          {mineList ? (
            <RecipeList type="recommend" mine={true} data={mineList} />
          ) : (
            <Image
              alt="character"
              width={361}
              height={152}
              src={`/img/mineEmpty.svg`}
              priority
            />
          )}
        </div>
      </div>
      <div className="bar" />
      <div className="container">
        <div className="textHeader">오늘 이 레시피는 어때요?</div>
        <button onClick={handleClick}>
          <Image
            alt="character"
            width={56}
            height={24}
            src={`/button/filter.svg`}
            priority
          />
        </button>
        <RecipeList type="recommend" data={filterList} />
      </div>
      <style jsx>{`
            .box {
                width: 390px
            }
            .container {
                margin-left: 20px;
                width: 390px
                background: black;
            }
            .bar {
                background: #F8F8F8;
                height: 4px;
                width: 390px;
                margin-top: 12px;
                margin-bottom: 18px;
            }
            .margin {
                margin-right: 20px
            }
            button {
                color: ${colors.graySubTitle};
                width: 350px;
                height: 34px;
                background: ${colors.grayWhite};
                margin-top: 12px;
                margin-bottom: 8px;
                border: solid ${colors.grayBackgroundSub} 1.5px;
                border-radius: 20px;
            }

            .textHeader {
                font-size: 20px;
                font-weight: 700;
            }
        `}</style>
    </div>
  );
}
