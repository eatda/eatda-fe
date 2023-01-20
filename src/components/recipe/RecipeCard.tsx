import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import colors from "../../../styles";
import { heart_full } from "../../assets/imagePath";
import { heart_empty } from "../../assets/imagePath";
import { ch_0, ch_1, ch_2, ch_3, ch_4, ch_5 } from "../../assets/imagePath";
import Image from "next/image";

interface RecipeCardType {
  type: string;
  name?: string;

  image?: string;
  comment?: string;
  title?: string;
  is_me_liked?: boolean;
  
  who_liked?: any;
}

export default function RecipeCard({ type, name, image, comment, title, is_me_liked, who_liked }: RecipeCardType) {
  const router = useRouter();
  const marginBottom =
    name === "popular" && router.pathname === "/kitchen/ourpick" ? "45px" : "9px";
  const display =
    name === "popular" && router.pathname === "/kitchen/ourpick"
      ? "flex"
      : "none";
  const [like, setLike] = useState<boolean | undefined>(()=>is_me_liked);

  console.log(type, name, image, comment, title, is_me_liked, who_liked, like)
  useEffect(()=>{
    setLike(()=>is_me_liked);
  },[like])

  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    if(target.value === 'like' || target.alt === 'like'){
      setLike(prev => !prev);
    }else{
      router.push("/kitchen/detail/1");
    }
  };

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
                    <Image alt="character" width={20} height={20} src={`/character/ch_${v}.svg`} priority/>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div onClick={handleClick} className="itemText">
          {comment}
          {title}
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
          width: 107px;
          height: 30px;
          border-radius: 15px;
          margin-top: 6px;
          margin-right: 8px;
          margin-bottom: 8px;
          background: ${colors.grayBackgroundSub};
          float: right;
          color: ${colors.graySubTitle};
        }
      `}</style>
    </>
  );
}
