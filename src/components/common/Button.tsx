import { ValueOf } from "next/dist/shared/lib/constants";
import colors from "../../assets/styles";
import Image from "next/image";
import { check } from "../../assets/icon";

interface CTA1ButtonI {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  value?: string | number;
}

interface CTA1ButtonSelectI {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  value?: string | number;
  image?: string;
}
interface CTA1ButtonSmallI {
  textMain?: string;
  textSub?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  value?: string;
}

interface CTA2ButtonI {
  text?: string;
  onClick?: () => void;
  active?: boolean;
}

interface TextBoxI {
  text?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  active?: boolean;
  unit?: string;
  type?: string;
}

interface RadioBoxI {
  name?: string;
  value?: number;
  mainText?: string;
  subText?: string;
  select?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CheckBoxI {
  name?: string;
  value?: number;
  text?: string;
  select?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CTA1Source = `
    height: 54px;
    border: none;
    border-radius: 6px;
    color: white;
`;

const CTA2Source = `
    width: 350px;
    height: 82px;
    border: none;
    border-radius: 6px;
    color: white;
`;

export function CTA1Button({ onClick, text, active, value }: CTA1ButtonI) {
  return (
    <>
      {active ? (
        <button onClick={onClick} value={value}>
          {text}
        </button>
      ) : (
        <button onClick={onClick} value={value} disabled>
          {text}
        </button>
      )}
      <style jsx>{`
        button {
          ${CTA1Source}
          font-size: 20px;
          font-weight: 600;
          width: 350px;
          background: ${active ? colors.mainOrange : colors.grayBackgroundSub};
        }
      `}</style>
    </>
  );
}

export function CTA1ButtonSelect({
  onClick,
  text,
  active,
  value,
  image,
}: CTA1ButtonSelectI) {
  return (
    <>
      <button onClick={onClick} value={value}>
        {text}
        {image ? (
          <Image src={image} alt="ch" width={30} height={30} priority />
        ) : null}
      </button>
      <style jsx>{`
        button {
          ${CTA1Source}
          font-size: 20px;
          font-weight: 600;
          width: 350px;
          background: ${active ? colors.mainOrange : colors.grayWhite};
          border: 1px solid ${active ? "none" : colors.grayBackgroundSub};
          color: ${active ? colors.grayWhite : colors.graySubTitle};
        }
      `}</style>
    </>
  );
}

export function CTA1ButtonSelect2({
  onClick,
  text,
  active,
  value,
  image,
}: CTA1ButtonSelectI) {
  return (
    <>
      <button onClick={onClick} value={value}>
        {text}
        {image ? (
          <Image src={image} alt="ch" width={78} height={84} priority />
        ) : null}
      </button>
      <style jsx>{`
        button {
          height: 140px;
          border: none;
          border-radius: 100px;
          color: white;
          width: 140px;
          margin: 7px;
          background: ${active ? colors.mainOrange : colors.grayWhite};
          border: 1px solid ${active ? "none" : colors.grayBackgroundSub};
          color: ${active ? colors.grayWhite : colors.graySubTitle};
        }
      `}</style>
    </>
  );
}

export function CTA1ButtonSmall({
  onClick,
  textMain,
  textSub,
  active,
  value,
}: CTA1ButtonSmallI) {
  return (
    <>
      <button onClick={onClick} value={value}>
        {textMain}
        <div className="sub">{textSub}</div>
      </button>
      <style jsx>{`
        button {
          ${CTA1Source}
          width: 170px;
          background: ${active ? colors.mainOrange : colors.grayBackgroundSub};
          margin: 5px;
        }
        .sub {
          color: ${colors.mainYellow};
        }
      `}</style>
    </>
  );
}

export function CTA2Button({ onClick, text, active }: CTA2ButtonI) {
  return (
    <>
      <button onClick={onClick}>{text}</button>
      <style jsx>{`
        button {
          ${CTA2Source}
          background: ${active ? colors.mainOrange : colors.grayBackgroundSub};
        }
      `}</style>
    </>
  );
}

export function TextBox2({
  text,
  onChange,
  value,
  active,
  unit,
  type,
}: TextBoxI) {
  return (
    <div className="container">
      <input type={type} placeholder={text} onChange={onChange} value={value} />
      <div className="text">{unit}</div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .text {
          color: ${colors.graySubTitle2};
          font-size: 24px;
        }
        input {
          font-size: 20px;
          font-weigth: 500;
          width: ${unit ? "300px" : "350px"};
          border: none;
          color: ${value === ""
            ? colors.grayBackgroundSub
            : colors.grayMainTitle};
          border-bottom: 2px solid ${colors.grayBackgroundSub};
          background: none;
          text-align: center;
          outline: none;
        }
        input:focus {
          border-bottom: 2px solid ${colors.mainOrange};
        }
      `}</style>
    </div>
  );
}

export function RadioBox({
  name,
  value,
  mainText,
  subText,
  select,
  onChange,
}: RadioBoxI) {
  return (
    <div className="container">
      <div>
        <div className="textMain">{mainText}</div>
        <div className="textSub">{subText}</div>
      </div>
      <input type="radio" name={name} value={value} onChange={onChange} />
      <style jsx>{`
        input {
          appearance: none;
          outline: ${select ? 4 : 2}px solid
            ${select ? colors.grayWhite : colors.graySubTitle2};
          margin-right: 16px;
          border-radius: 100%;
          width: 24px;
          height: 24px;
          accent-color: ${colors.mainOrange};
        }
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 350px;
          height: 80px;
          background: ${select ? colors.mainOrange : "none"};
          color: ${select ? colors.grayWhite : colors.graySubTitle};
          border: 1px solid ${colors.grayBackgroundSub};
          border-radius: 4px;
          margin-bottom: 8px;
        }
        .textMain {
          color: ${select ? colors.grayWhite : colors.graySubTitle};
          font-size: 18px;
          font-weight: 600;
          margin-left: 16px;
        }
        .textSub {
          color: ${select ? colors.grayWhite : colors.graySubTitle};
          font-size: 16px;
          margin-left: 16px;
        }
      `}</style>
    </div>
  );
}

export function CheckBox({ name, text, value, select, onChange }: CheckBoxI) {
  return (
    <div className="container">
      <div className="textMain">{text}</div>
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}
        checked={select}
      />
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 350px;
          height: 54px;
          background: ${select ? colors.mainOrange : "none"};
          border: 1px solid ${colors.grayBackgroundSub};
        }
        .textMain {
          color: ${select ? colors.grayWhite : colors.graySubTitle};
          font-size: 20px;
          font-weight: 600;
          margin-left: 16px;
        }
        input {
          margin-right: 16px;
          width: 24px;
          height: 24px;
          appearance: none;
          background-color: ${select ? colors.mainOrange : colors.grayWhite};
          outline: ${select ? 4 : 2}px solid
            ${select ? colors.grayWhite : colors.graySubTitle2};
        }
        input:checked {
          background: url(${check});
        }
      `}</style>
    </div>
  );
}

export default {
  CTA1Button,
  CTA1ButtonSmall,
  CTA2Button,
  CTA1ButtonSelect,
  CTA1ButtonSelect2,
  TextBox2,
  RadioBox,
};
