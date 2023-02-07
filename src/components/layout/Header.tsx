import { useRouter } from "next/router";
import { route } from "../../assets/route";
import colors from "../../assets/styles";

interface HeaderType {
  text: string;
  left: string;
  right: string;
  leftURL: string;
  rightURL: string;
}

const kitchenHeader: HeaderType = {
  text: "주방",
  left: "추천 식사",
  right: "Our Pick!",
  leftURL: route.kitchen,
  rightURL: route.ourPick,
};

const libraryHeader: HeaderType = {
  text: "서재",
  left: "식후 혈당 기록하기",
  right: "주간레포트",
  leftURL: route.library,
  rightURL: route.report,
};

export default function Header() {
  const router = useRouter();
  const headerData = router.pathname.includes("kitchen")
    ? kitchenHeader
    : libraryHeader;

  const handleButtonClick = (left: boolean) => {
    if (left) {
      router.replace(headerData.leftURL);
    } else {
      router.replace(headerData.rightURL);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">{headerData.text}</div>
        <div className="miniheader">
          <button
            onClick={() => handleButtonClick(true)}
            className={
              router.pathname === headerData.rightURL
                ? "trueButton"
                : "falseButton"
            }
          >
            {headerData.left}
          </button>
          <button
            onClick={() => handleButtonClick(false)}
            className={
              router.pathname === headerData.leftURL
                ? "trueButton"
                : "falseButton"
            }
          >
            {headerData.right}
          </button>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: ${colors.grayWhite};
          padding: 10px 20px 0px 20px;
        }
        .header {
          font-weight: 700;
          font-size: 27px;
          margin-bottom: 30px;
        }
        .miniheader {
          margin-top: 16px;
          display: flex;
          justify-content: center;
        }

        .trueButton {
          border: none;
          border-bottom: 2px solid ${colors.graySubTitle2};
          color: ${colors.graySubTitle2};
          background: none;
          font-size: 16px;
          font-weight: 700;
          flex: 0.5;
        }
        .falseButton {
          border: none;
          border-bottom: 2px solid ${colors.mainOrange};
          color: ${colors.mainOrange};
          background: none;
          font-size: 16px;
          font-weight: 700;
          flex: 0.5;
        }
      `}</style>
    </>
  );
}
