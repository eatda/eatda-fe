import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CTA1ButtonSmall, CTA1Button } from "../../components/common/Button";
import Navigation from "../../components/common/Navigation";
import colors from "../../../styles";
import Image from "next/image";
import { login } from "../../store/userSlice";
import { selectUser } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { copyCode } from "../../hooks/CopyClipBoard";
import { copy, create } from "../../assets/icon";

export default function CreatePlace() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [code, setCode] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.value) {
      case "true":
        setPage((prevNumber) => prevNumber + 1);
        break;
      case "false":
        router.push("/signup/enter-place");
        break;
      case "enter":
        router.push("/signup");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    async function fetchCode() {
      const URL = `${process.env.NEXT_PUBLIC_API_ROOT}users/group/code/`;
      const response = await (await fetch(URL)).json();
      setCode(response.code);
      const reduxData = {
        usersocial_id: user.usersocial_id,
        useremail: user.useremail,
        username: user.username,
        usercharacter: user.usercharacter,
        isDiabetes: user.isDiabetes,
        usergroup: response.code,
      };
      dispatch(login(reduxData));
    }
    if (page === 1) {
      fetchCode();
    }
  }, [page]);

  return (
    <>
      <Navigation text="가족 공간 생성" />
      <div className="container">
        {page === 0 ? (
          <>
            <div className="textMain">
              가족 중 &nbsp;
              <div className="textOrange">최초로 &nbsp;</div>
              가입하셨나요?
            </div>
            <div className="buttonItem">
              <CTA1ButtonSmall
                active={true}
                value="true"
                onClick={handleClick}
                textMain="네"
                textSub="가족 공간 생성"
              />
              <CTA1ButtonSmall
                active={true}
                value="false"
                onClick={handleClick}
                textMain="아니오"
                textSub="가족 공간 들어가기"
              />
            </div>
          </>
        ) : (
          <>
            <div className="textMain">
              👏👏👏
              <br />
              우리 가족만을 위한 공간을
              <br />
              새롭게 만들었어요!
            </div>
            <br />
            <br />
            <br />
            <div className="groudId">
              <div className="groupText">
                <Image
                  alt="place"
                  width={16}
                  height={16}
                  src={create}
                  priority
                />
                초대 코드를 복사하여 가족에게 공유하세요!
              </div>
              <div className="code">{code}</div>
            </div>
            <button className="copy" onClick={() => copyCode(code)}>
              <Image
                alt="copy"
                width={24}
                height={24}
                src={copy.white}
                priority
              />
              &nbsp; 링크 복사하기
            </button>
            <div className="buttonItem">
              <CTA1Button
                active={true}
                value="enter"
                onClick={handleClick}
                text="입장하기"
              />
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .container {
          padding-top: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .buttonItem {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60px;
          position: fixed;
          bottom: 36px;
          left: 0;
          right: 0;
        }
        .groudId {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 350px;
          height: 134px;
          background: ${colors.grayBackground};
          border-radius: 4px;
        }
        .groupText {
          font-size: 12px;
          color: ${colors.graySubTitle2};
          display: flex;
        }
        .code {
          font-size: 54px;
          font-weight: 700;
          letter-spacing: 5px;
        }
        .subText {
          color: ${colors.graySubTitle};
        }
        .textMain {
          margin-right: auto;
          margin-left: 20px;
          display: flex;
          flex-direction: row;
          font-size: 24px;
          font-weight: 600;
        }
        .textOrange {
          color: ${colors.mainOrange};
        }
        .copy {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 350px;
          height: 40px;
          border: none;
          background: ${colors.mainOrange};
          color: ${colors.grayWhite};
          border-radius: 4px;
          margin-top: 8px;
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
