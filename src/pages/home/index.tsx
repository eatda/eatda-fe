import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MealCard from "../../components/home/MealCard";
import SugarCard from "../../components/home/SugarCard";
import React, { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { selectToken } from "../../store/tokenSlice";
import { selectUser } from "../../store/userSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";

const sliderSettings = {
  dots: true,
  infinite: true,
  spped: 500,
  slideToShow: 1,
  slideToScroll: 1,
};

interface dietI {
  diet:
    | {
        is_exist: boolean;
        data?: undefined;
        is_me_liked?: undefined;
        who_liked?: undefined;
      }
    | {
        is_exist: boolean;
        data: {
          id: number;
          name: {
            title: string;
            comment: string;
          };
          image: string;
          timeline: number;
        };
        is_me_liked: boolean;
        who_liked: number[];
      };
}

interface bloodI {
  blood_sugar_level:
    | {
        is_exist: boolean;
        data?: undefined;
        is_me_liked?: undefined;
        who_liked?: undefined;
      }
    | {
        is_exist: boolean;
        data: {
          time: string;
          level: number;
          timeline: number;
        };
        is_me_liked: boolean;
        who_liked: never[];
      };
}

export default function Home() {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const router = useRouter();
  const type = ["아침", "점심", "저녁"];
  const [diet, setDiet] = useState<dietI[] | any>();
  const [blood, setBlood] = useState<bloodI[] | any>([]);

  useEffect(() => {
    async function fetchHome() {
      const { data, res }: any = await Get({
        url: "users/home/",
        token: token.access_token,
      });
      if (data.ok) {
        setDiet(res.diet);
        setBlood(res.blood_sugar_level);
      } else {
        console.log("HomeData error");
      }
    }
    fetchHome();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.replace("/home/mypage");
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <Image alt="character" width={126} height={32} src={`/img/logo.svg`} priority/>
          <button onClick={handleClick}>
            <Image
              alt="character"
              width={32}
              height={32}
              src={`/character/like_${user.usercharacter}.svg`}
              priority
            />
          </button>
        </div>
        <div className="homeBox">
          <h4>오늘의 식사</h4>
          <Slider {...sliderSettings}>
            {diet?.map((v: dietI | any, i: number) =>
              v.is_exist ? (
                <MealCard
                  key={i}
                  is_exist={v.is_exist}
                  type={type[i]}
                  text={v.data.name.title}
                  name={v.data.name.comment}
                  img={v.data.image}
                  is_me_liked={v.is_me_liked}
                  who_liked={v.who_liked}
                />
              ) : (
                <MealCard key={i} is_exist={v.is_exist} type={type[i]} />
              )
            )}
          </Slider>
        </div>
        <div className="homeBox">
          <h4>오늘의 식후 혈당</h4>
          <Slider {...sliderSettings}>
            {blood.map((v: bloodI | any, i: number) =>
              v.is_exist ? (
                <SugarCard
                  key={i}
                  is_exist={v.is_exist}
                  timeline={v.data.timeline}
                  value={v.data.level}
                  time={v.data.time}
                  is_me_liked={v.is_me_liked}
                  who_liked={v.who_liked}
                />
              ) : (
                <SugarCard key={i} is_exist={v.is_exist} />
              )
            )}
          </Slider>
        </div>
        <div className="homeBox">
          <h4>주간 혈당 요약</h4>
          <div>카드</div>
        </div>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          margin-top: 17px;
          flex-direction: row;
          justify-content: space-between;
        }
        .container {
          display: flex;
          flex-direction: column;
        }
        button {
          border: none;
          background: none;
        }
      `}</style>
    </>
  );
}
