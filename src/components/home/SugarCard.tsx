import colors from "../../assets/styles";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/tokenSlice";
import { Post, Delete } from "../../hooks/Fetch";
import { useRouter } from "next/router";
import { ic_heart, ic_measure, ic_time } from "../../assets/icon";
import { character_like } from "../../assets/illust";
import { route } from "../../assets/route";

interface SugarCardProps {
  is_exist?: boolean;
  timeline?: number;
  value?: number;
  time?: string;

  is_me_liked?: boolean;
  who_liked?: [] | any;
}

export default function SugarCard({
  is_exist,
  timeline,
  value,
  time,
  is_me_liked,
  who_liked,
}: SugarCardProps) {
  const [like, setLike] = useState<boolean | undefined>(() => is_me_liked);
  const router = useRouter();
  const token = useSelector(selectToken);
  const mealType = () => {
    switch (timeline) {
      case 0:
        return "아침";
      case 1:
        return "점심";
      case 2:
        return "저녁";
      default:
        return "오류";
    }
  };

  const handleRouter = () => {
    router.replace(route.library);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    async function fetchData(method: String) {
      const requestBody = {
        target: 1,
        timeline: timeline,
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
      // console.log('Delete');
    } else {
      fetchData("POST");
      // console.log('post')
    }
    setLike(!like);
  };

  return (
    <div className="container">
      {is_exist ? (
        <div className="card">
          <div className="textValue">
            <Image
              alt="character"
              width={16}
              height={16}
              src={ic_measure}
              priority
            />
            &nbsp;
            {value}mg/dl
          </div>
          <div className="textTime">
            <Image
              alt="character"
              width={16}
              height={16}
              src={ic_time}
              priority
            />
            &nbsp;
            {time} 측정
          </div>
          <div className="imageStyle">
            <div className="textType">{mealType()}</div>
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
        <div onClick={handleRouter} className="cardEmptyOut">
          <div className="cardEmptyIn">
            + <br />
            혈당 기록하러 가기
          </div>
        </div>
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
        }
        .card {
          width: 350px;
          height: 112px;
          padding-top: 8px;
          padding-left: 12px;
          paddig-right: 12px;
          padding: 12px;
          box-sizing: border-box;
          background-color: white;
          border-radius: 4px;
          border: 1px solid ${colors.grayBackgroundSub};
        }
        .cardEmptyOut {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 350px;
          height: 112px;
          border: 1px solid ${colors.grayBackgroundSub};
          background-color: white;
          border-radius: 4px;
        }
        .cardEmptyIn {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: ${colors.graySubTitle2};
          font-size: 14px;
        }
        .data {
          display: flex;
          flex-direction: column;
        }

        .textTime {
          display: flex;
          align-items: center;
          margin-right: auto;
          margin-top: 8px;
          margin-bottom: 2px;
          color: ${colors.graySubTitle};
          font-size: 14px;
        }
        .textValue {
          display: flex;
          align-items: center;
          margin-right: auto;
          font-size: 24px;
          font-weight: 600;
        }
        .textType {
          text-align: center;
          line-height: 24px;
          margin-right: auto;
          // margin-left: 12px;
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
        }
      `}</style>
    </div>
  );
}
