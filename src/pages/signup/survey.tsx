import Router, { useRouter } from "next/router";
import React, { useState, useCallback } from "react";
import {
  CTA1Button,
  TextBox2,
  CTA1ButtonSelect,
  RadioBox,
  CheckBox,
} from "../../components/common/Button";
import Navigation from "../../components/common/Navigation";
import colors from "../../../styles";
import Image from "next/image";

import { putSurvey } from "../../store/surveySlice";
import { selectSurvey } from "../../store/surveySlice";
import { selectUser } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";

const activityData = [
  {
    id: 0,
    main: "활동이 적거나 운동을 안하는 경우",
    sub: "0~1일",
  },
  {
    id: 1,
    main: "가벼운 활동 및 운동",
    sub: "1~3일 / 1주",
  },
  {
    id: 2,
    main: "보통의 활동 및 운동",
    sub: "3~5일 / 1주",
  },
  {
    id: 3,
    main: "적극적인 활동 및 운동",
    sub: "6~7일 / 1주",
  },
  {
    id: 4,
    main: "매우 적극적인 활동 및 운동",
    sub: "6~7일 적극적인 활동과 운동을 함",
  },
];

interface formI {
  height: number;
  weight: number;
  age: number;
  gender: boolean | null;
  activity: number | null;
}

interface allergyI {
  id: number;
  name: string;
}

interface surveyI {
  allergyResponse: allergyI[];
}

export default function Survey({ allergyResponse }: surveyI) {
  const dispatch = useDispatch();
  const survey = useSelector(selectSurvey);
  const user = useSelector(selectUser);

  const [page, setPage] = useState<number>(0);
  const router = useRouter();

  const [form, setForm] = useState<formI>({
    height: -1,
    weight: -1,
    age: -1,
    gender: null,
    activity: null,
  });
  const [allergy, setAllergy] = useState<Array<number>>([]);

  // 유효성 검사
  const [isValid, setIsValid] = useState({
    isHeight: false,
    isWeight: false,
    isAge: false,
    isGender: false,
    isActivity: false,
    isAllergy: false,
  });

  const handleClickNext = () => {
    let num = page;
    setPage(++num);
    if (page >= 6) {
      console.log(
        form.height,
        form.weight,
        form.age,
        form.gender,
        form.activity,
        allergy
      );
      let genderQuery = form.gender ? "f" : "m";
      let allergyQuery: any[] = [];
      allergy.forEach((v, i) => {
        allergyQuery.push({ id: Number(v) });
      });
      console.log(allergyQuery);
      const reduxData = {
        height: form.height,
        weight: form.weight,
        age: form.age,
        gender: genderQuery,
        activity: form.activity,
        allergy: allergyQuery,
      };
      dispatch(putSurvey(reduxData));
      router.replace("/signup/loading");
    }
  };

  const handleClickGender = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    setIsValid({ ...isValid, isGender: true });

    if (value === "f") {
      setForm({ ...form, gender: true });
    } else if (value === "m") {
      setForm({ ...form, gender: false });
    }
  };

  const handleChangeActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, activity: Number(e.target.value) });
    setIsValid({ ...isValid, isActivity: true });
  };

  const handleChangeAllergy = useCallback(
    (checked: boolean, value: number) => {
      if (checked) {
        setAllergy((prev) => [...prev, value]);
      } else if (!checked) {
        setAllergy(allergy.filter((el) => el !== value));
      }
      console.log(allergy);
    },
    [allergy]
  );

  const handleAll = (checked: boolean) => {
    console.log("해당없음", checked);
    if (checked) {
      setAllergy([]);
    }
    console.log(allergy);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    e.preventDefault();
    switch (idx) {
      case 0:
        const heightValue = e.target.value;
        setForm({ ...form, height: Number(heightValue) });
        const regexH = /^\d{3}[.]\d{1}$/;

        if (regexH.test(heightValue)) {
          setIsValid({ ...isValid, isHeight: true });
        } else {
          setIsValid({ ...isValid, isHeight: false });
        }
        break;

      case 1:
        const weightValue = e.target.value;
        setForm({ ...form, weight: Number(weightValue) });
        const regexW = /^\d{2}[.]\d{1}$/;

        if (regexW.test(weightValue)) {
          setIsValid({ ...isValid, isWeight: true });
        } else {
          setIsValid({ ...isValid, isWeight: false });
        }
        break;
      case 2:
        const ageValue = e.target.value;
        setForm({ ...form, age: Number(ageValue) });
        const regexA = /^\d{1,3}$/;

        if (regexA.test(ageValue)) {
          setIsValid({ ...isValid, isAge: true });
        } else {
          setIsValid({ ...isValid, isAge: false });
        }
        break;
      default:
        break;
    }
  };

  const getPage = (current: number) => {
    switch (current) {
      case 0:
        return (
          <div className="item">
            <div className="textMain">{user.username}님,</div>
            <div className="textMain">
              <div className="textOrange">키</div>를 알려주세요.
            </div>
            <div className="bar" />
            <TextBox2
              text="000.0"
              value={form.height === -1 ? "" : String(form.height)}
              active={false}
              unit="CM"
              onChange={(e) => handleChange(e, current)}
              type="number"
            />
            <br />
            <style jsx>{`
              .item {
                display: flex;
                align-items: center;
                flex-direction: column;
              }
              .textMain {
                display: flex;
                margin-right: auto;
                margin-left: 20px;
                font-size: 24px;
                font-weight: 600;
              }
              .textOrange {
                color: ${colors.mainOrange};
              }
              .bar {
                height: 60px;
              }
            `}</style>
          </div>
        );
      case 1:
        return (
          <div className="item">
            <div className="textMain">
              {user.username}님, <br />
            </div>
            <div className="textMain">
              <div className="textOrange">몸무게</div>를 알려주세요.
            </div>
            <div className="bar" />
            <TextBox2
              text="00.0"
              value={form.weight === -1 ? "" : String(form.weight)}
              active={false}
              unit="KG"
              onChange={(e) => handleChange(e, current)}
              type="number"
            />
            <br />
            <style jsx>{`
              .item {
                display: flex;
                align-items: center;
                flex-direction: column;
              }
              .textMain {
                display: flex;
                margin-right: auto;
                margin-left: 20px;
                font-size: 24px;
                font-weight: 600;
              }
              .textOrange {
                color: ${colors.mainOrange};
              }
              .bar {
                height: 60px;
              }
            `}</style>
          </div>
        );
      case 2:
        return (
          <div className="item">
            <div className="textMain">{user.username}님,</div>
            <div className="textMain">
              <div className="textOrange">만 나이</div>를 알려주세요.
            </div>
            <div className="bar" />
            <TextBox2
              text="00"
              value={form.age === -1 ? "" : String(form.age)}
              active={false}
              unit="세"
              onChange={(e) => handleChange(e, current)}
              type="number"
            />
            <br />
            <style jsx>{`
              .item {
                display: flex;
                align-items: center;
                flex-direction: column;
              }
              .textMain {
                display: flex;
                margin-right: auto;
                margin-left: 20px;
                font-size: 24px;
                font-weight: 600;
              }
              .textOrange {
                color: ${colors.mainOrange};
              }
              .bar {
                height: 60px;
              }
            `}</style>
          </div>
        );
      case 3:
        return (
          <div className="item">
            <div className="textMain">
              {user.username}님, <br />
            </div>
            <div className="textMain">
              <div className="textOrange">성별</div>은 무엇인가요?
            </div>
            <div className="bar" />
            <CTA1ButtonSelect
              text="여성"
              value="f"
              active={form.gender === null ? false : form.gender}
              onClick={handleClickGender}
            />
            <div className="bar2" />
            <CTA1ButtonSelect
              text="남성"
              value="m"
              active={form.gender === null ? false : !form.gender}
              onClick={handleClickGender}
            />
            <br />
            <style jsx>{`
              .item {
                display: flex;
                align-items: center;
                flex-direction: column;
              }
              .textMain {
                display: flex;
                margin-right: auto;
                margin-left: 20px;
                font-size: 24px;
                font-weight: 600;
              }
              .textOrange {
                color: ${colors.mainOrange};
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
      case 4:
        return (
          <div className="item">
            <Image
              alt="character"
              width={184}
              height={194}
              src={`/img/signup.svg`}
              priority
            />
            <div className="bar" />
            <div className="textMain">이제 습관 관련</div>
            <div className="textMain">추가 질문을 드리겠습니다.</div>
            <div className="textSub">거의 다 왔어요!!</div>
            <style jsx>{`
              .item {
                margin-top: 150px;
                display: flex;
                align-items: center;
                flex-direction: column;
                text-align: center;
              }
              .textMain {
                display: flex;
                font-size: 24px;
                font-weight: 600;
              }
              .textSub {
                font-size: 16px;
                color: #878787;
              }
              .bar {
                height: 32px;
              }
            `}</style>
          </div>
        );
      case 5:
        return (
          <div className="item">
            <div className="textMain">
              {user.username}님, 평균적인 <br />
            </div>
            <div className="textMain">
              <div className="textOrange">일주일 활동량이 어떤가요?</div>
            </div>
            <div className="textSub">
              일주일 활동량을 통해 활동대사량을 도출합니다.
            </div>
            {activityData.map((v, i) => {
              return (
                <div key={i}>
                  <RadioBox
                    name="activity"
                    value={i}
                    mainText={v.main}
                    subText={v.sub}
                    select={i === form.activity}
                    onChange={handleChangeActivity}
                  />
                </div>
              );
            })}
            <style jsx>{`
              .item {
                display: flex;
                align-items: center;
                flex-direction: column;
              }
              .textMain {
                display: flex;
                margin-right: auto;
                margin-left: 20px;
                font-size: 24px;
                font-weight: 600;
              }
              .textOrange {
                color: ${colors.mainOrange};
              }
              .textSub {
                font-size: 14px;
                color: ${colors.graySubTitle};
                margin-right: auto;
                margin-left: 20px;
                margin-bottom: 55px;
              }
              .bar {
                height: 60px;
              }
            `}</style>
          </div>
        );
      case 6:
        return (
          <div className="item">
            <div className="textMain">
              {user.username}님, 못드시는 음식을
              <br />
            </div>
            <div className="textMain">
              <div className="textOrange">모두 선택해주세요.</div>
            </div>
            <div className="bar" />
            {allergyResponse.map((v, i) => {
              return (
                <div key={i}>
                  <CheckBox
                    name="allergy"
                    value={v.id}
                    text={v.name}
                    select={allergy.includes(v.id) ? true : false}
                    onChange={(e) => {
                      handleChangeAllergy(
                        e.target.checked,
                        Number(e.target.value)
                      );
                    }}
                  />
                </div>
              );
            })}
            <CheckBox
              name="allergy"
              value={allergyResponse.length + 1}
              text="해당 없음"
              select={allergy.length === 0 ? true : false}
              onChange={(e) => {
                handleAll(e.target.checked);
              }}
            />
            <style jsx>{`
              .item {
                display: flex;
                align-items: center;
                flex-direction: column;
              }
              .textMain {
                display: flex;
                margin-right: auto;
                margin-left: 20px;
                font-size: 24px;
                font-weight: 600;
              }
              .textOrange {
                color: ${colors.mainOrange};
              }
              .textSub {
                font-size: 14px;
                color: ${colors.graySubTitle};
                margin-right: auto;
                margin-left: 20px;
                margin-bottom: 55px;
              }
              .bar {
                height: 60px;
              }
            `}</style>
          </div>
        );
      default:
        break;
    }
  };
  return (
    <>
      {page < 3 && <Navigation text="기본 정보" />}
      {page >= 3 && <Navigation text="습관 정보" />}
      <div className="container">
        {getPage(page)}
        <br />
        <div className="buttonItem">
          <CTA1Button
            text="다음"
            active={
              (page === 0 && isValid.isHeight) ||
              (page === 1 && isValid.isWeight) ||
              (page === 2 && isValid.isAge) ||
              (page === 3 && isValid.isGender) ||
              page === 4 ||
              (page === 5 && isValid.isActivity) ||
              page === 6
            }
            onClick={handleClickNext}
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          padding-top: 60px;
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
    </>
  );
}

export const getServerSideProps = async () => {
  const URL = `${process.env.NEXT_PUBLIC_API_ROOT}diets/allergy`;
  const allergyResponse = await (await fetch(URL)).json();

  return {
    props: {
      allergyResponse,
    },
  };
};
