import colors from "../../../styles";
import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import { selectToken } from "../../store/tokenSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecipeList from "../../components/kitchen/RecipeList";
import { DietType } from "../../interface/diet";
import { illust } from "../../assets/illust";
import { route } from "../../assets/route";

interface popularPickI {
  diet: DietType;
  is_me_liked: boolean;
  who_liked: number[];
}

interface pickI {
  user_name: string;
  is_exist: boolean;
  data: {
    diet: DietType;
    is_me_liked: boolean;
  }[];
}

export default function OurPick() {
  const [popularPick, setPopularPick] = useState<popularPickI[]>();
  const token = useSelector(selectToken);
  const [pick, setPick] = useState<pickI[]>();

  const fetchPick = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_ROOT}users/diet/like/`;
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
    async function fetchData() {
      const { data, res }: any = await fetchPick();
      if (data.ok) {
        console.log(res);
        setPick(res.indivisual_list);
        setPopularPick(res.popular_pick);
      } else {
        console.log("error");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header
        text="주방"
        left="추천 식사"
        right="Our Pick!"
        leftURL={route.kitchen}
        rightURL={route.ourPick}
      />
      <div className="container">
        <div className="textHeader">
          <div className="textMain">가족들의 인기 &nbsp;</div>
          PICK!
        </div>
        <div className="margin">
          {/* <RecipeList type="pick" data={popularPick} popular={true}/> */}
          {popularPick?.length === 0 ? (
            <div className="emptyPick">
              하트를 누르면 가족들 내 인기 레시피를 보여드려요!
            </div>
          ) : (
            <RecipeList type="pick" data={popularPick} popular={true} />
          )}
          {/* {
                    [0].map((v,i)=>{
                        return(
                            <RecipeList key={i} type="pick" data={popularPick} popular={true}/>
                        )
                    })
                } */}
        </div>
      </div>
      <div className="bar" />
      <div className="container">
        {pick?.map((v, i) => {
          return (
            <div key={i}>
              <div className="textHeader">
                <div className="textMain">{v.user_name}</div>의 PICK!
              </div>
              {v.is_exist ? (
                <div className="margin">
                  <RecipeList key={i} type="pick" data={v.data} />
                </div>
              ) : (
                <>
                  <div className="emptyBox">
                    <Image
                      alt="character"
                      width={80}
                      height={73.07}
                      src={illust.pick}
                      priority
                    />
                    아직 {v.user_name}님이 선호하는 레시피가 없어요
                    <br />
                    선호하는 레시피에 하트를 눌러주세요!
                    <br />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .bar {
          background: #f8f8f8;
          height: 4px;
          margin-top: 15px;
          margin-bottom: 18px;
        }
        .miniHeader {
          margin-top: 25px;
        }
        .emptyBox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 152px;
          border: 1px solid #d9d9d9;
          color: ${colors.graySubTitle2};
          font-size: 14px;
          text-align: center;
          margin-bottom: 24px;
          margin-top: 12px;
        }
        .textHeader {
          display: flex;
          font-size: 20px;
          font-weight: 700;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        .textMain {
          color: ${colors.mainOrange};
        }
        .emptyPick {
          height: 152px;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          color: ${colors.graySubTitle2};
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin-bottom: 12px;
        }
      `}</style>
    </>
  );
}
