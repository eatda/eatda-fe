import { useRouter } from "next/router";
import { useState } from "react";
import colors from "../../assets/styles";
import Image from "next/image";
import { selectToken } from "../../store/tokenSlice";
import { useSelector } from "react-redux";
import { character_like } from "../../assets/illust";
import { ic_heart } from "../../assets/icon";
import { route } from "../../assets/route";
import { selectUser } from "../../store/userSlice";

interface RecipeCardType {
  id: number;
  type: string;
  popular?: boolean;

  image?: string;
  comment?: string;
  title?: string;
  is_me_liked?: boolean;

  who_liked?: any;
}

export default function RecipeCard({
  id,
  type,
  popular,
  image,
  comment,
  title,
  is_me_liked,
  who_liked,
}: RecipeCardType) {
  const router = useRouter();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const marginBottom =
    popular === true && router.pathname === "/kitchen/ourpick" ? "9px" : "9px";
  const display =
    popular === true && router.pathname === "/kitchen/ourpick"
      ? "flex"
      : "none";
  const [like, setLike] = useState<boolean | undefined>(() => is_me_liked);
  const [whoList, setWhoList] = useState(()=>who_liked);
  // console.log('?:',whoList);

  // console.log(id,type, name, image, comment, title, is_me_liked, who_liked, like)

  const fetchLike = async (method: string) => {
    const URL = `${process.env.NEXT_PUBLIC_API_ROOT}users/diet/like/`;
    let bodyData = {
      diet_id: id,
    };
    try {
      const data = await fetch(URL, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: token.access_token,
        },
        body: JSON.stringify(bodyData),
      });

      const res = await data.json();

      return { data, res };
    } catch (error) {
      return error;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    async function fetchData(method: string) {
      const { data, res }: any = await fetchLike(method);
    }
    const target = e.target as HTMLInputElement;
    if (target.value === "like" || target.alt === "like") {
      if (like) {
        // like 삭제
        fetchData("DELETE");
        if(who_liked !== undefined){
          const newWhoList = whoList.filter((val : number) => val !== user.usercharacter);
          setWhoList(newWhoList);
        }
      } else {
        fetchData("POST");
        if(who_liked !== undefined){
          setWhoList([user.usercharacter, ...whoList]);
        }
      }
      setLike(!like);
    } else {
      router.push(`${route.detail}${id}`);
    }
  };

  //   useEffect(() => {
  //     router.events.on('routeChangeStart', (url, { shallow }) => {
  //           console.log(`routing to ${url}`, `is shallow routing: ${shallow}`);
  //           if(router.pathname === '/kitchen'){
  //             console.log('yes');
  //           }
  //     });

  //     return () => {
  //         router.events.off('routeChangeStart', () => {
  //         console.log('unsubscribed');
  //         });
  //     };
  // }, []);

  return (
    <>
      <div className="container">
        <div onClick={handleClick} className="itemImg">
          <button className="buttonImg" value="like">
            <img src={like ? ic_heart.fill : ic_heart.empty} alt="like" />
          </button>
          <div className="like">
            {whoList?.map((v: number, i: number) => {
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
        </div>
        <div onClick={handleClick} className="itemText">
          <div className="textComment">{comment}</div>
          <div className="textTitle">{title}</div>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin-bottom: ${marginBottom};
          background: ${colors.grayWhite};
          height: 196px;
          width: 47.5%;
          min-width: ${type === "pick" ? "165px" : ""};
          border-radius: 4px;
          border: solid ${colors.grayBackgroundSub} 1px;
        }

        .itemImg {
          height: 131px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          background-size: cover;
          background-position: center;
          background-image: url(${image});
        }
        .itemText {
          height: 65px;
        }

        .buttonImg {
          margin-right: 12px;
          margin-top: 10px;
          border: none;
          background: none;
          height: 40px;
          width: 40px;
        }

        .like {
          display: ${display};
          flex-direction: row-reverse;
          align-items: center;
          justify-content: center;
          width: ${whoList?.length * 20 + 16}px;
          height: 32px;
          line-height: 13px;
          border-radius: 15px;
          margin-top: 6px;
          margin-right: 8px;
          margin-bottom: 8px;
          float: right;
          color: ${colors.graySubTitle};
          background: ${colors.grayBackgroundSub};
          background-color: rgba(255, 255, 255, 0.5);
        }

        .textComment {
          margin-left: 6px;
          font-size: 14px;
          font-weight: 600;
          color: ${colors.graySubTitle2};
          margin-top: 10px;
          margin-bottom: 2px;
        }
        .textTitle {
          margin-left: 6px;
          font-size: 16px;
          font-weight: 600;
          color: black;
        }
      `}</style>
    </>
  );
}
