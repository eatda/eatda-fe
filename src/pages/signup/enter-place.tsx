import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../../styles";
import { login } from "../../store/userSlice";
import { selectUser } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { enter } from "../../assets/icon";
import { route } from "../../assets/route";

type JSONValue = string | number | boolean | Response | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

export default function EnterPlace() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const codeLength = 6;
  const inputRef = useRef<null[] | HTMLDivElement[]>([]);
  const idxArray = Array.from({ length: codeLength }, (v, i) => i);

  const [code, setCode] = useState(() => Array(codeLength).fill(""));

  const [test, setTest] = useState(0);

  const fetchGroup = async (code: string) => {
    const URL = `${process.env.NEXT_PUBLIC_API_ROOT}users/group/code/`;
    let bodyData = {
      code: code,
    };

    try {
      const data: Response = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const res = await data.json();
      return { data, res };
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { data, res }: any = await fetchGroup(code.join(""));
      console.log(data);
      console.log(res);
      if (data.ok) {
        const reduxData = {
          usersocial_id: user.usersocial_id,
          useremail: user.useremail,
          username: user.username,
          usercharacter: user.usercharacter,
          isDiabetes: res.is_diabetes,
          usergroup: code.join(""),
        };
        dispatch(login(reduxData));
        router.replace(route.signup);
      } else {
        alert(res.error);
      }
    }

    let flag = true;
    code.map((v, i) => {
      if (v === "") {
        flag = false;
      }
    });

    if (flag) {
      console.log(code);
      console.log("확인");
      const reduxData = {
        usersocial_id: user.usersocial_id,
        useremail: user.useremail,
        username: user.username,
        usercharacter: user.usercharacter,
        isDiabetes: user.isDiabetes,
        usergroup: code.join(""),
      };
      dispatch(login(reduxData));
      fetchData();
    }
  }, [test]);

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    let arr = code;
    arr.splice(idx, 1, e.target.value);
    setCode(arr);
    if (e.target.value != "") {
      inputRef.current[++idx]?.focus();
    }

    setTest((prev) => prev + 1);
  };

  return (
    <div className="container">
      <div className="subText">가족 구성원이 이미 가입하셨군요!</div>
      <div className="mainText">초대코드를 입력해주세요</div>
      <br />
      <div>
        {idxArray.map((v, i) => {
          return (
            <input
              key={i}
              maxLength={1}
              ref={(el) => (inputRef.current[i] = el)}
              onChange={(e) => handleFocus(e, i)}
            />
          );
        })}
      </div>
      <div className="codeText">
        <Image alt="enter" width={16} height={16} src={enter} priority />
        초대코드는 &nbsp;
        <div className="codeOrange">먼저 가입한 가족 구성원</div>
        에게 문의하세요.
      </div>
      <br />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 60px;
        }
        .subText {
          color: ${colors.graySubTitle};
          font-size: 14px;
          font-weight: 500;
          margin-right: auto;
          margin-left: 20px;
        }
        .mainText {
          margin-bottom: 72px;
          font-weight: 600;
          font-size: 24px;
          margin-right: auto;
          margin-left: 20px;
        }
        .codeText {
          margin-top: 12px;
          display: flex;
          font-size: 12px;
          font-weight: 500;
          margin-left: auto;
          margin-right: 20px;
          color: ${colors.graySubTitle2};
        }
        .codeOrange {
          color: ${colors.mainOrange};
        }

        input {
          width: 12%;
          height: 72px;
          font-weight: 700;
          font-size: 48px;
          text-align: center;
          background: ${colors.grayBackgroundSub};
          border: none;
          margin-left: 5px;
          margin-right: 5px;
          border-radius: 4px;
        }
        input:focus {
          outline: none;
          border: 1px solid ${colors.mainOrange};
          background: ${colors.grayWhite};
        }
      `}</style>
    </div>
  );
}
