import Image from "next/image";
import { useState } from "react";
import colors from "../../assets/styles";
import { Post, Delete } from "../../hooks/Fetch";
import { selectToken } from "../../store/tokenSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { character_like } from "../../assets/character";
import { ic_heart } from "../../assets/icon";
import { route } from "../../assets/route";

interface MealCardProps {
  is_exist: boolean;
  type: string;
  text?: string;
  name?: string;
  img?: string;

  is_me_liked?: boolean;
  who_liked?: [] | any;
}

export default function MealCard({
  is_exist,
  type,
  text,
  name,
  img,
  is_me_liked,
  who_liked,
}: MealCardProps) {
  const [like, setLike] = useState<boolean | undefined>(() => is_me_liked);
  const router = useRouter();
  const token = useSelector(selectToken);
  const timeLine = ["아침", "점심", "저녁"];

  const handleRouter = () => {
    router.replace(route.kitchen);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    async function fetchData(method: String) {
      const requestBody = {
        target: 0,
        timeline: timeLine.indexOf(type),
      };
      if (method === "POST") {
        const { data, res }: any = await Post({
          url: "users/home/like/",
          token: token.access_token,
          requestBody: requestBody,
        });
      } else if (method === "DELETE") {
        const { data, res }: any = await Delete({
          url: "users/home/like/",
          token: token.access_token,
          requestBody: requestBody,
        });
      }
    }
    if (like) {
      fetchData("DELETE");
    } else {
      fetchData("POST");
    }
    setLike(!like);
  };

  return (
    <>
      <div className="container">
        {is_exist ? (
          <div className="cardItem">
            {img ? <div className="cardImg"></div> : <>Loading...</>}
            <div className="textSub">{name}</div>
            <div className="textMain">{text}</div>
            <div className="imageStyle">
              <div className="textType">{type}</div>
              <div className="like">
                {who_liked?.map((v: number, i: number) => {
                  return (
                    <div key={v}>
                      <Image
                        alt="character"
                        width={20}
                        height={20}
                        src={character_like[v]}
                        priority
                      />
                    </div>
                  );
                })}
              </div>
              <Image
                onClick={handleClick}
                alt="character"
                width={32}
                height={32}
                src={like ? ic_heart.fill : ic_heart.empty}
                priority
              />
            </div>
          </div>
        ) : (
          <div onClick={handleRouter} className="card">
            <div className="emptyCard">
              + <br />
              식사하러 가기
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          // align-items: center;
          // text-align: center;
        }
        .card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 350px;
          height: 245px;
          border: 1px solid ${colors.grayBackgroundSub};
          background-color: white;
          border-radius: 5px;
        }
        .cardItem {
          width: 350px;
          height: 245px;
          border: 1px solid ${colors.blackSub};
          background-color: white;
          border-radius: 5px;
        }
        .emptyCard {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: ${colors.graySubTitle2};
          font-size: 14px;
        }
        .textSub {
          margin-right: auto;
          margin-left: 12px;
          margin-top: 8px;
          color: ${colors.graySubTitle};
          font-size: 14px;
        }
        .textMain {
          margin-right: auto;
          margin-left: 12px;
          margin-bottom: 2px;
          font-size: 18px;
          font-weight: 600;
        }
        .textType {
          text-align: center;
          line-height: 24px;
          margin-right: auto;
          margin-left: 12px;
          width: 44px;
          height: 24px;
          background: ${colors.mainOrange};
          color: ${colors.grayWhite};
          font-size: 12px;
          border-radius: 4px;
        }
        .imageStyle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-right: 12px;
        }
        .like {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: center;
          width: ${who_liked?.length * 20 + 16}px;
          height: 32px;
          line-height: 13px;
          border-radius: 15px;
          margin-top: 6px;
          margin-right: 8px;
          margin-bottom: 8px;
          float: right;
          color: ${colors.graySubTitle};
          background: ${colors.grayBackgroundSub};
          // background-color: rgba( 255, 255, 255, 0.9 );
        }
        .cardImg {
          background-size: cover;
          background-position: center;
          background-image: url(${img});
          // width: 350px;
          height: 150px;
        }
      `}</style>
    </>
  );
}
