import { useRouter } from "next/router";
import colors from "../../../styles";

interface MiniHeaderType {
  left: string;
  right: string;
  leftURL: string;
  rightURL: string;
}

// 필터 부분 추가해야 함
export default function MiniHeader({
  left,
  right,
  leftURL,
  rightURL,
}: MiniHeaderType) {
  const router = useRouter();

  const handleButtonClick = () => {
    if (router.pathname === leftURL) {
      router.replace(rightURL);
    } else {
      router.replace(leftURL);
    }
  };

  return (
    <>
      <div className="container">
        <button
          onClick={handleButtonClick}
          className={
            router.pathname === rightURL ? "trueButton" : "falseButton"
          }
        >
          {left}
        </button>
        <button
          onClick={handleButtonClick}
          className={router.pathname === leftURL ? "trueButton" : "falseButton"}
        >
          {right}
        </button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          margin-top: 25px;
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
