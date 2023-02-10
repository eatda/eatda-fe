import MealCard from "../../components/home/MealCard";
import SugarCard from "../../components/home/SugarCard";
import React, { useEffect, useState } from "react";
import { Get } from "../../hooks/Fetch";
import { selectToken } from "../../store/tokenSlice";
import { selectUser } from "../../store/userSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import WeeklySummary from "../../components/library/WeeklySummary";
import colors from "../../assets/styles";
import { DietType } from "../../interface/diet";
import { SugarRecordType } from "../../interface/sugarRecord";
import HomeSlider from "../../components/home/HomeSlider";
import { character } from "../../assets/illust";
import { logo } from "../../assets/illust";
import { route } from "../../assets/route";
import { useSession } from "next-auth/react";

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
        data: DietType;
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
        data: SugarRecordType;
        is_me_liked: boolean;
        who_liked: never[];
      };
}

export default function Home() {
  const router = useRouter();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace(route.onboarding);
    }
  }, [session.status]);

  const [isLoading, setIsLoading] = useState(false);
  const [initialMealCard, setInitialMealCard] = useState(0);
  const [initialBloodCard, setInitialBloodCard] = useState(0);

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

        const initialMealIdx = res.diet.findIndex((v: any) => v.is_exist);
        if (initialMealIdx != -1) {
          setInitialMealCard(initialMealIdx);
        }
        const initialBloodIdx = res.blood_sugar_level.findIndex(
          (v: any) => v.is_exist
        );
        if (initialBloodIdx != -1) {
          setInitialBloodCard(initialBloodIdx);
        }

        setIsLoading(true);
      } else {
        console.log("HomeData error");
      }
    }
    async function fetchRecord() {
      const { data, res }: any = await Get({
        url: "users/blood-sugar-level/report/",
        token: token.access_token,
      });
      if (data.ok) {
        console.log(res);
      } else {
        console.log("error");
      }
    }
    fetchHome();
    fetchRecord();
  }, []);

  const handleClick = () => {
    router.push(route.mypage);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <Image alt="logo" width={126} height={32} src={logo} priority />
          <button onClick={handleClick}>
            <Image
              alt="character"
              width={32}
              height={32}
              src={character[user.usercharacter]}
              priority
            />
          </button>
        </div>
        <div className="box">
          <div className="title">오늘의 식사</div>
          {isLoading && (
            <HomeSlider initial={initialMealCard}>
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
            </HomeSlider>
          )}
        </div>
        <div className="box">
          <div className="title">오늘의 식후 혈당</div>
          {isLoading && (
            <HomeSlider initial={initialBloodCard}>
              {blood.map((v: bloodI | any, i: number) =>
                v.is_exist ? (
                  <SugarCard
                    key={i}
                    is_exist={v.is_exist}
                    timeline={v.data.timeline}
                    level={v.data.level}
                    time={v.data.time}
                    range={v.data.range}
                    is_me_liked={v.is_me_liked}
                    who_liked={v.who_liked}
                  />
                ) : (
                  <SugarCard
                    key={i}
                    timeline={0}
                    level={0}
                    time={"0"}
                    range={0}
                    is_exist={v.is_exist}
                  />
                )
              )}
            </HomeSlider>
          )}
        </div>
        <div className="box">
          <WeeklySummary />
        </div>
      </div>
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
          background-color: ${colors.grayWhite};
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0px 20px;
          height: 64px;
        }
        .box {
          margin-bottom: 6px;
        }
        .container {
          display: flex;
          flex-direction: column;
          margin-top: -10px;
        }
        .title {
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 12px;
        }
        button {
          border: none;
          background: none;
        }
      `}</style>
    </>
  );
}
