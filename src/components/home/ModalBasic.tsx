import { useEffect } from "react";
import colors from "../../assets/styles";
import { copyCode } from "../../hooks/CopyClipBoard";

interface IChild {
  data: boolean;
  setData: (v: boolean) => void;
  group: string;
}

const ModalBasic = ({ data, setData, group }: IChild) => {
  const onClickButton = () => {
    setData(!data);
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="container">
      <span className="close" onClick={onClickButton}>
        X close
      </span>
      <div className="box">
        {/* <div className="sub">
            초대코드를 복사하여 가족에게 공유하세요!
            </div> */}
        <div className="code">
          <div className="sub">초대코드를 복사하여 가족에게 공유하세요!</div>
          <div className="main">{group}</div>
        </div>
      </div>
      <div className="copy" onClick={() => copyCode(group)}>
        링크 복사하기
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          /* 모달창 크기 */
          width: 300px;
          height: 400px;

          /* 최상단 위치 */
          z-index: 999;

          /* 중앙 배치 */
          /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
          /* translate는 본인의 크기 기준으로 작동한다. */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          /* 모달창 디자인 */
          background-color: ${colors.grayWhite};
          border: 1px solid ${colors.grayBackgroundSub};
          border-radius: 8px;
          backdrop-filter: blur(5px);
          box-shadow: 2px 3px 5px 3px ${colors.grayBackgroundSub};
        }

        /* 모달창 내부 X버튼 */
        .close {
          background: ${colors.mainOrange};
          width: 100px;
          height: 30px;
          border-radius: 4px;
          text-align: center;
          color: white;
          position: absolute;
          top: 5px;
          line-height: 30px;
        }

        .copy {
          margin-top: 5px;
          width: 95%;
          height: 40px;
          background: ${colors.mainOrange};
          border-radius: 4px;
          border: none;
          color: white;
          line-height: 40px;
        }

        .box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-item: center;
          text-align: center;
          width: 95%;
          border-radius: 4px;
          height: 150px;
          background: ${colors.grayBackground};
        }

        .main {
          text-align: center;
          font-weight: 800;
          font-size: 54px;
          line-height: 70px;
          letter-spacing: 4px;
        }
        .sub {
          color: ${colors.graySubTitle2};
          font-size: 12px;
          font-weight: 600;
          line-height: 10px;
        }
      `}</style>
    </div>
  );
};

export default ModalBasic;
