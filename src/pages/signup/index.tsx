import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  CTA1Button,
  TextBox2,
  CTA1ButtonSelect,
  CTA1ButtonSelect2,
  CTA1ButtonNoneSelect,
} from "../../components/common/Button";
import Navigation from "../../components/layout/Navigation";
import Image from "next/image";
import colors from "../../assets/styles";

import { login } from "../../store/userSlice";
import { selectUser } from "../../store/userSlice";
import { selectTeam } from "../../store/teamSlice";
import { useSelector, useDispatch } from "react-redux";
import { character } from "../../assets/illust";
import { route } from "../../assets/route";
import { illust } from "../../assets/illust";

interface formI {
  name: string;
  character: number;
  sugar: null | boolean;
}

interface characterI {
  id: number;
  image: string;
}

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const teamDia = useSelector(selectTeam);
  const [characterData, setCharacterData] = useState<characterI[]>();
  const [page, setPage] = useState(0);

  const [form, setForm] = useState<formI>({
    name: "",
    character: -1,
    sugar: null,
  });

  // 유효성 검사
  const [isValid, setIsValid] = useState({
    nameValid: false,
    characterValid: false,
    sugarValid: false,
  });

  useEffect(() => {
    async function fetchCharacter() {
      const URL = `${process.env.NEXT_PUBLIC_API_ROOT}users/character?group=${user.usergroup}`;
      const response = await (await fetch(URL)).json();
      setCharacterData(response);
    }

    if (page === 2) {
      fetchCharacter();
    }
  }, [page]);

  const handleClickNext = () => {
    setPage((prevNumber) => prevNumber + 1);
    if (page >= 3) {
      console.log(form.name, form.character, form.sugar);
      const reduxData = {
        usersocial_id: user.usersocial_id,
        useremail: user.useremail,
        username: form.name,
        usercharacter: form.character,
        isDiabetes: teamDia.teamDiabetes ? false : form.sugar,
        usergroup: user.usergroup,
      };
      dispatch(login(reduxData));
      if (teamDia.teamDiabetes) {
        router.replace(route.loading);
      } else {
        form.sugar
          ? router.replace(route.survey)
          : router.replace(route.loading);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (page) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        const valueCharacter = Number(e.currentTarget.value);
        setForm({ ...form, character: valueCharacter });

        // 유효성 검사
        if (valueCharacter < 0) {
          setIsValid({ ...isValid, characterValid: false });
        } else {
          setIsValid({ ...isValid, characterValid: true });
        }
        break;
      case 3:
        const valueSugar = e.currentTarget.value === "true" ? true : false;
        setForm({ ...form, sugar: valueSugar });

        // 유효성 검사
        if (valueSugar === null) {
          setIsValid({ ...isValid, sugarValid: false });
        } else {
          setIsValid({ ...isValid, sugarValid: true });
        }
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setForm({ ...form, name: value });

    //유효성 검사
    if (value.length < 1 || value.length > 12) {
      setIsValid({ ...isValid, nameValid: false });
    } else {
      setIsValid({ ...isValid, nameValid: true });
    }
  };

  if (page === 0) {
    setTimeout(() => {
      setPage((prevNumber) => prevNumber + 1);
    }, 5000);
  }

  const getPage = (current: number) => {
    switch (current) {
      case 0:
        return (
          <div className="item">
            <img className="animated-gif" src={illust.signuploading}></img>
            <div className="text">
              반갑습니다!
              <br />
              프로필을 완성해봐요
            </div>
            <style jsx>{`
              .animated-gif {
                margin-bottom: -20px;
                width: 100%;
                height: auto;
              }
              .item {
                // margin-top: 150px;
                width: 100%;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                // height: 750px;
                background-image: url(${illust.signup_background});
                background-size: auto;
                background-position: center;
                // background: black;
              }
              .text {
                margin-top: 36px;
                font-size: 24px;
                font-weight: 600;
              }
            `}</style>
          </div>
        );
      case 1:
        return (
          <div className="item">
            <div className="textMain">닉네임을 설정해주세요.</div>
            <div className="textSub">
              가족 공간 내에서는 닉네임으로 활동해요.
            </div>
            <TextBox2
              text="맘스터치"
              onChange={handleChange}
              value={form.name}
            />
            <br />
            <div className="textSub2">최대 12자</div>
            <br />
            <br />
            <style jsx>{`
              .item {
                // margin-left: 20px;
              }
              .textMain {
                font-size: 24px;
                font-weight: 700;
              }
              .textSub {
                font-size: 14px;
                color: ${colors.graySubTitle};
                margin-bottom: 90px;
              }
              .textSub2 {
                display: flex;
                flex-direction: row-reverse;
                margin-right: 20px;
                margin-top: 12px;
                font-size: 12px;
                color: ${colors.graySubTitle2};
              }
            `}</style>
          </div>
        );
      case 2:
        return (
          <div className="item">
            <div className="textMain">활동 캐릭터를 설정해주세요.</div>
            <div className="character">
              {characterData?.map((v: characterI, idx: number) => {
                return (
                  <CTA1ButtonSelect2
                    key={idx}
                    active={form.character === v.id ? true : false}
                    onClick={handleClick}
                    value={v.id}
                    image={character[v.id]}
                  />
                );
              })}
            </div>
            <style jsx>{`
              .item {
                // align-items: center;
                // margin-left: 20px;
              }
              .textMain {
                margin-bottom: 50px;
                margin-right: auto;
                // margin-left: 20px;
                font-size: 24px;
                font-weight: 700;
              }
              .character {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
              }
            `}</style>
          </div>
        );
      case 3:
        return (
          <div className="item">
            <div className="textMain">당뇨인이신가요?</div>
            <div className="textSub">
              당뇨병 환자 &nbsp;
              <div className="textOrange">맞춤형 식단 추천</div>을 위한
            </div>
            <div className="textSub">기본 설문 조사가 이루어집니다.</div>
            <div className="bar" />
            {teamDia.teamDiabetes ? (
              <>
                <CTA1ButtonNoneSelect
                  active={false}
                  value="true"
                  text="네, 당뇨인이에요"
                />
                <div className="bar2" />
                <CTA1ButtonSelect
                  active={form.sugar === null ? false : !form.sugar}
                  value="false"
                  text="아니요, 당뇨인 가족이에요"
                  onClick={handleClick}
                />
              </>
            ) : (
              <>
                <CTA1ButtonSelect
                  active={form.sugar === null ? false : form.sugar}
                  value="true"
                  text="네, 당뇨인이에요"
                  onClick={handleClick}
                />
                <div className="bar2" />
                <CTA1ButtonSelect
                  active={form.sugar === null ? false : !form.sugar}
                  value="false"
                  text="아니요, 당뇨인 가족이에요"
                  onClick={handleClick}
                />
              </>
            )}
            <style jsx>{`
              .item {
                flex-direction: column;
                align-items: center;
              }
              .textMain {
                margin-right: auto;
                // margin-left: 20px;
                font-size: 24px;
                font-weight: 700;
              }
              .textOrange {
                color: ${colors.mainOrange};
              }
              .textSub {
                display: flex;
                margin-right: auto;
                // margin-left: 20px;
                font-size: 14px;
                color: ${colors.graySubTitle};
              }
              .bar {
                height: 60px;
              }
              .bar2 {
                height: 12px;
              }
            `}</style>
          </div>
        );
      default:
        return(
          <div className="item">
            <img className="animated-gif" src={illust.signuploading}></img>
            <div className="text">
              잠시만 기다려주세요!
            </div>
            <style jsx>{`
              .animated-gif {
                margin-bottom: -20px;
                width: 100%;
                height: auto;
              }
              .item {
                margin-top: -100px;
                width: 100%;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
              }
              .text {
                margin-top: 36px;
                font-size: 24px;
                font-weight: 600;
              }
            `}</style>
          </div>
        )
    }
  };

  return (
    <>
      <Navigation text="프로필 설정" />
      <div className="container">
        {getPage(page)}
        <div className="buttonItem">
          {page !== 0 && (
            <CTA1Button
              active={
                (page === 1 && isValid.nameValid) ||
                (page === 2 && isValid.characterValid) ||
                (page === 3 && isValid.sugarValid)
              }
              text="다음"
              onClick={handleClickNext}
            />
          )}
        </div>
        <style jsx>{`
          .container {
            // padding-top: 60px;
            // display: flex;
            // align-items: center;
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
        `}</style>
      </div>
    </>
  );
}
