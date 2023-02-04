import Navigation from "../../components/layout/Navigation";
import colors from "../../assets/styles";
import { selectToken } from "../../store/tokenSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Get } from "../../hooks/Fetch";
import ModalBasic from "../../components/home/ModalBasic";
import { copy, logout, next, notice } from "../../assets/icon";
import { character } from "../../assets/illust";
import { route } from "../../assets/route";

const activityData = [
  "활동이 적거나 운동을 안하는 경우",
  "가벼운 활동 및 운동",
  "보통의 활동 및 운동",
  "적극적인 활동 및 운동",
  "매우 적극적인 활동 및 운동",
];

interface myDataI {
  name: string;
  character: number;
  group: string;
  is_diabetes: boolean;

  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  activity?: number;
  allergy?: { id: number; name: string }[];
}

export default function MyPage() {
  const [myData, setMyData] = useState<myDataI>();
  const [data, setData] = useState<boolean>(false);
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
      router.replace(route.onboarding);
    }
  }, [session.status]);

  return (
    <>
      <Navigation text="마이페이지" />
      <div className="container">
        <div className="profile">
          {myData?.character !== undefined && (
            <div className="image">
              <Image
                alt="character"
                width={55}
                height={55}
                src={character[myData?.character]}
                priority
              />
            </div>
          )}
          <br />
          <div className="profile_dia">
            {myData?.is_diabetes ? "당뇨인" : "당뇨인 가족"}
          </div>
          <div className="name">{myData?.name}</div>
          <div className="survey">
            {myData?.is_diabetes ? (
              <>
                {myData?.height}cm &nbsp; &nbsp; &nbsp;
                {myData?.weight}kg &nbsp; &nbsp; &nbsp;
                {myData?.gender === "f" ? "여성" : "남성"}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <br />
        {myData?.is_diabetes ? (
          <>
            <div className="info">
              <div className="infoGroup">
                <div className="infoItem">활동량</div>
                <div className="infoVal">
                  {typeof myData?.activity === "number"
                    ? activityData[myData?.activity]
                    : ""}
                </div>
              </div>
              <div className="line"></div>
              <div className="infoGroup">
                <div className="infoItem">알레르기</div>
                <div className="infoVal">
                  {myData?.allergy?.map((allergy, idx) => (
                    <span key={idx}>{allergy.name}, </span>
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
          <button className="buttonStyle" onClick={() => {}}>
            {data && (
              <ModalBasic
                group={myData.group}
                data={data}
                setData={(v: boolean) => {
                  setData(v);
                }}
              />
            )}
            <Image
              alt="character"
              width={24}
              height={24}
              src={copy.black}
              priority
            />
            &nbsp;
            <div className="textButton" onClick={() => setData(true)}>
              초대코드 복사하기
            </div>
            <div className="go" onClick={() => setData(true)}>
              <Image alt="" width={32} height={32} src={next} priority />
            </div>
          </button>
        )}
        <button className="buttonStyle">
          <Image alt="" width={24} height={24} src={notice} priority />
          &nbsp;
          <div className="textButton">서비스 평가 및 정식 출시 알림 받기</div>
          <div className="go">
            <Image alt="" width={32} height={32} src={next} priority />
          </div>
        </button>
        <button className="buttonStyle" onClick={() => signOut()}>
          <Image alt="" width={24} height={24} src={logout} priority />
          &nbsp;
          <div className="textButton">로그아웃하기</div>
          <div className="go">
            <Image alt="character" width={32} height={32} src={next} priority />
          </div>
        </button>
        <button />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: -40px;
        }

        .image {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100px;
          border: 2px solid ${colors.mainOrange};
          margin-top: 20px;
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
          font-size: 14px;
        }

        .info {
          background: ${colors.grayBackground};
          width: 98%;
          height: 124px;
          border-radius: 6px;

          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 36px;
          margin-top: 24px;
        }
        .infoGroup {
          display: flex;
          height: 61px;
          width: 85%;
          align-items: center;
        }
        .infoItem {
          font-size: 16px;
          font-weight: 700;
          margin-right: auto;
        }
        .infoVal {
          font-size: 16px;
          color: ${colors.graySubTitle};
        }
        .line {
          width: 98%;
          height: 2px;
          background: ${colors.grayWhite};
        }
        .name {
          margin-top: 7px;
          font-size: 20px;
          font-weight: 900;
        }
        .survey {
          display: flex;
          color: ${colors.graySubTitle};
          font-size: 14px;
          margin-top: 4px;
        }

        button {
          display: flex;
          align-items: center;

          background: none;
          border: none;
          border-top: 2px solid ${colors.grayBackgroundSub};
          height: 62px;
          line-height: 62px;
          width: 98%;
        }

        .textButton {
          color: ${colors.grayTextBlack};
          font-size: 16px;
          font-weight: 600;
        }

        .go {
          margin-left: auto;
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
}
