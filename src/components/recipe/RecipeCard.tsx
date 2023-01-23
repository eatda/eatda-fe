import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import colors from "../../../styles";
import { heart_full } from "../../assets/imagePath";
import { heart_empty } from "../../assets/imagePath";
import { ch_0, ch_1, ch_2, ch_3, ch_4, ch_5 } from "../../assets/imagePath";
import Image from "next/image";
import { selectToken } from "../../store/tokenSlice";
import { useSelector, useDispatch } from "react-redux";

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

export default function RecipeCard({ id, type, popular, image, comment, title, is_me_liked, who_liked }: RecipeCardType) {
  const router = useRouter();
  const token = useSelector(selectToken);
  const marginBottom =
    popular === true && router.pathname === "/kitchen/ourpick" ? "45px" : "9px";
  const display =
    popular === true && router.pathname === "/kitchen/ourpick"
      ? "flex"
      : "none";
  const [like, setLike] = useState<boolean | undefined>(()=>is_me_liked);

  // console.log(id,type, name, image, comment, title, is_me_liked, who_liked, like)

  const fetchLike = async (method:string) => {
    const URL = `${process.env.NEXT_PUBLIC_API_ROOT}users/diet/like/`;
    let bodyData = {
      diet_id: id
    }
    try {
      const data = await fetch(URL, {
        method: method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization : token.access_token
        },
        body: JSON.stringify(bodyData)
      })

      const res = await data.json();

      return {data, res};
    } catch (error) {
      return error;
    }
  }

  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    async function fetchData(method: string){
      const {data, res} : any = await fetchLike(method);
    }
    const target = e.target as HTMLInputElement;
    if(target.value === 'like' || target.alt === 'like'){
      if(like){ // like 삭제
        fetchData('DELETE');
      }else{
        fetchData('POST');
      }
      setLike(!like);
    }else{
      router.push("/kitchen/detail/1");
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
            <img src={like ? heart_full : heart_empty} alt="like" />
          </button>
          <div className="like">
            {
              who_liked?.map((v:number,i:number)=>{
                return(
                  <div key={v}>
                    <Image alt="character" width={20} height={20} src={`/character/like_${v}.svg`} priority/>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div onClick={handleClick} className="itemText">
          <div className="textComment">
          {comment}
          </div>
          <div className="textTitle">
          {title}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          // margin-left: 5px;
          margin-right: 10px;
          margin-bottom: ${marginBottom};
          background: ${colors.grayWhite};
          height: 196px;
          width: 170px;
          border-radius: 4px;
          border: solid ${colors.grayBackgroundSub} 1px;
        }

        .itemImg {
          height: 131px;
          width: 170px;

          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          background-image: url(${image});
        }
        .itemText {
          height: 65px;
          width: 170px;
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
          background-color: rgba( 255, 255, 255, 0.5 );
        }

        .textComment {
          margin-left: 6px;
          font-size: 14px;
          font-weight: 600;
          color: ${colors.graySubTitle2};
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
