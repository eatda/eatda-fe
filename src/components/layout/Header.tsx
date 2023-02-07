import { useRouter } from "next/router";
import colors from "../../assets/styles";

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

  const handleButtonClick = (left: boolean) => {
    if (left) {
      router.replace(leftURL);
    } else {
      router.replace(rightURL);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">{text}</div>
        <div className="miniheader">
          <button
            onClick={() => handleButtonClick(true)}
            className={
              router.pathname === rightURL ? "trueButton" : "falseButton"
            }
          >
            {left}
          </button>
          <button
            onClick={() => handleButtonClick(false)}
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
          padding: 10px 20px 0px 20px;
        }
        .header {
          font-weight: 700;
          font-size: 27px;
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
