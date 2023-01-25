import RecipeList from "../../components/recipe/RecipeList";
import colors from "../../../styles";
import MiniHeader from "../../components/common/MiniHeader";
import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import { selectToken } from "../../store/tokenSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  spped: 500,
  slideToShow: 1,
  slideToScroll: 1,
};

interface popularPickI {
  diet: {
    id: number;
    name: {
      comment: string;
      title: string;
    };
    image: string;
  };
  is_me_liked: boolean;
  who_liked: number[];
}

interface pickI {
  user_name: string;
  is_exist: boolean;
  data: {
    diet: {
      id: number;
      name: {
        comment: string;
        title: string;
      };
      image: string;
    };
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
        // setPopularPick([]);
        setPopularPick(res.popular_pick);
      } else {
        console.log("error");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="box">
      <Header text="주방" />
      <div className="miniHeader">
        <MiniHeader
          left="추천 식사"
          right="Our Pick!"
          leftURL="/kitchen"
          rightURL="/kitchen/ourpick"
        />
      </div>
      <div className="container">
        <div className="textHeader">
          <div className="textMain">가족들의 인기 &nbsp;</div>
          PICK!
        </div>
        <div className="margin">
          {/* <RecipeList type="pick" data={popularPick} popular={true}/> */}
          {popularPick?.length === 0 ? (
            <Image
              alt="character"
              width={361}
              height={152}
              src={`/img/popularEmpty.svg`}
              priority
            />
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
          console.log(v);
          return (
            <div key={i}>
              <div className="textHeader">
                <div className="textMain">{v.user_name}</div>의 pick!
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
                      src={`/img/pickEmpty.svg`}
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

                margin-bottom: 18px;
            }
            .miniHeader {
                margin-top: 25px;
            }
            .margin {
                margin-right: 20px
            }

            .emptyBox {
                display: flex;
                flex-direction: column;
                justify-content:center;
                align-items: center;
                height: 152px;
                width: 360px;
                border: 1px solid #D9D9D9;
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
            }
            .textMain {
                color: ${colors.mainOrange};
            }
        `}</style>
    </div>
  );
}
