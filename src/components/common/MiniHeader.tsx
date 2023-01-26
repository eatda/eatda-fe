import { useRouter } from "next/router";
import Link from "next/link";
import colors from "../../../styles";

interface MiniHeaderType {
  left: string;
  right: string;
  leftURL: string;
  rightURL: string;
  button?: string;
  buttonURL?: string;
}

// 필터 부분 추가해야 함
export default function MiniHeader({
  left,
  right,
  leftURL,
  rightURL,
  button,
  buttonURL,
}: MiniHeaderType) {
  const router = useRouter();

  const handleClick = () => {
    if (buttonURL) {
      router.push(buttonURL);
    }
  };

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
      {button ? (
        <button className="buttonStyle" onClick={handleClick}>
          {button}
        </button>
      ) : null}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          margin-top: 25px;
        }

        .buttonStyle {
          width: 350px;
          height: 34px;
          background: ${colors.grayWhite};
          margin-left: 20px;
          margin-right: 20px;
          margin-top: 12px;
          margin-bottom: 8px;
          border: none;
          border-radius: 20px;
        }

        .trueButton {
          border: none;
          border-bottom: 2px solid ${colors.graySubTitle2};
          color: ${colors.graySubTitle2};
          background: none;
          width: 178px;
          font-size: 16px;
          font-weight: 700;
        }
        .falseButton {
          border: none;
          border-bottom: 2px solid ${colors.mainOrange};
          color: ${colors.mainOrange};
          background: none;
          width: 178px;
          font-size: 16px;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
