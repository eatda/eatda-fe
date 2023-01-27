import Navigation from "../../components/common/Navigation";
import colors from "../../../styles";
import { selectToken } from "../../store/tokenSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Get } from "../../hooks/Fetch";
import { copyCode } from "../../hooks/CopyClipBoard";

interface myDataI {
  name: string;
  character: number;
  group: string;
  is_diabetes: boolean;

  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  allergy?: { id: number; name: string }[];
}

export default function MyPage() {
  const [myData, setMyData] = useState<myDataI>();
  const token = useSelector(selectToken);
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    async function fetchData() {
      const { data, res }: any = await Get({
        url: "users/info/",
        token: token.access_token,
      });
      if (data.ok) {
        setMyData(res);
        console.log("🚀 ~ file: mypage.tsx:59 ~ fetchData ~ res", res);
      } else {
        console.log("error");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace("/onboarding");
    }
  }, [session.status]);

  return (
    <>
      <Navigation text="마이페이지" />
      <div className="container">
        <div className="profile">
          {myData?.character && (
            <Image
              alt="character"
              width={80}
              height={80}
              src={`/character/ch_${myData?.character}.svg`}
              priority
            />
          )}
          <br />
          <div className="profile_dia">
            {myData?.is_diabetes ? "당뇨인" : "당뇨인 가족"}
          </div>
          <br />
          {myData?.name}
          {myData?.is_diabetes ? (
            <>
              <br />
              {myData?.height}cm {myData?.weight}kg {myData?.gender}
            </>
          ) : (
            <></>
          )}
        </div>
        <br />
        {myData?.is_diabetes ? (
          <>
            <div className="info">
              <div className="infoItem">활동량</div>
              <br />
              <div className="line"></div>
              <div className="infoItem">
                알레르기
                <div>
                  {myData?.allergy?.map((allergy, idx) => (
                    <span key={idx}>{allergy.name} </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <br />
        {myData && (
          <button onClick={() => copyCode(myData.group)}>
            초대코드 복사하기 {myData.group}
          </button>
        )}
        <button>서비스 평가 및 정식 출시 알림 받기</button>
        <button onClick={() => signOut()}>로그아웃하기</button>
        <button />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 390px;
          // min-height: 800px;
          padding-top: 60px;
        }

        .profile {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .profile_dia {
          background: ${colors.mainOrange};
          color: ${colors.grayWhite};
          width: ${myData?.is_diabetes ? "60px" : "80px"};
          border-radius: 2px;
        }

        .info {
          background: ${colors.grayBackground};
          width: 350px;
          height: 124px;
          border-radius: 6px;

          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .infoItem {
          margin-top: 20px;
        }
        .line {
          min-width: 390px;
          height: 2px;
          background: ${colors.grayWhite};
        }

        button {
          display: flex;
          // flex-direction: column;
          align-items: center;

          background: none;
          border: none;
          border-top: 2px solid ${colors.grayBackgroundSub};
          height: 62px;
          line-height: 62px;
          min-width: 390px;
        }
      `}</style>
    </>
  );
}
