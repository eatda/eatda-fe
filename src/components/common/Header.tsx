import { useRouter } from "next/router";
import colors from "../../../styles";

interface HeaderType {
  text: string;
  left: string;
  right: string;
  leftURL: string;
  rightURL: string;
}

export default function Header({
  text,
  left,
  right,
  leftURL,
  rightURL,
}: HeaderType) {
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
        <div className="header">{text}</div>
        <div className="miniheader">
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
            className={
              router.pathname === leftURL ? "trueButton" : "falseButton"
            }
          >
            {right}
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
        }
        .header {
          margin-left: 20px;
          padding-top: 27px;
          font-weight: 700;
          font-size: 27px;
        }
        .miniheader {
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
