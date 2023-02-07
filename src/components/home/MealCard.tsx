import Image from "next/image";
import { useState } from "react";
import colors from "../../assets/styles";
import { Post, Delete } from "../../hooks/Fetch";
import { selectToken } from "../../store/tokenSlice";
import { selectUser } from "../../store/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { character_like } from "../../assets/illust";
import { ic_like } from "../../assets/icon";
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
  const [whoList, setWhoList] = useState(() => who_liked);
  const router = useRouter();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
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
      if (who_liked !== undefined) {
        const newWhoList = whoList.filter(
          (val: number) => val !== user.usercharacter
        );
        setWhoList(newWhoList);
      }
    } else {
      fetchData("POST");
      if (who_liked !== undefined) {
        setWhoList([user.usercharacter, ...whoList]);
      }
    }
    setLike(!like);
  };

  return (
    <>
      <div className="container">
        {is_exist ? (
          <div className="cardItem">
            {img ? <div className="cardImg"></div> : <>Loading...</>}
            <div className="text-area">
              <div className="textSub">{name}</div>
              <div className="textMain">{text}</div>
              <div className="imageStyle">
                <div className="textType">{type}</div>
                <div className="like-area">
                  {whoList.length !== 0 && (
                    <div className="like">
                      {whoList.map((v: number, i: number) => {
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
                  )}
                  <Image
                    onClick={handleClick}
                    alt="character"
                    width={32}
                    height={32}
                    src={like ? ic_like.fill : ic_like.empty}
                    priority
                  />
                </div>
              </div>
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
          padding: 0px 1px;
        }
        .card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid ${colors.grayBackgroundSub};
          background-color: white;
          border-radius: 5px;
          width: 350px;
          height: 245px;
        }

        .cardItem {
          width: 350px;
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
        .text-area {
          padding: 8px 12px 11px 12px;
        }
        .textSub {
          margin-right: auto;
          color: ${colors.graySubTitle};
          font-size: 14px;
        }
        .textMain {
          margin-right: auto;
          font-size: 18px;
          font-weight: 600;
        }
        .textType {
          text-align: center;
          line-height: 24px;
          width: 44px;
          height: 24px;
          background: ${colors.mainOrange};
          color: ${colors.grayWhite};
          font-size: 12px;
          border-radius: 4px;
        }

        .imageStyle {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
        }
        .like-area {
          display: flex;
          gap: 4px;
        }
        .like {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: center;
          width: ${whoList?.length * 20 + 16}px;
          line-height: 13px;
          border-radius: 15px;
          float: right;
          color: ${colors.graySubTitle};
          background: ${colors.grayBackgroundSub};
        }
        .cardImg {
          background-size: cover;
          background-position: center;
          background-image: url(${img});
          height: 150px;
        }
      `}</style>
    </>
  );
}
