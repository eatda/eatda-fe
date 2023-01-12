import { ValueOf } from "next/dist/shared/lib/constants";
import colors from "../../../styles";
interface CTA1ButtonI {
    text?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    active?: boolean;
    value?: string | number;
}

interface CTA1ButtonSmallI {
    textMain?: string;
    textSub?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    active? : boolean;
    value?: string;
}

interface CTA2ButtonI {
    text?: string;
    onClick?: () => void;
    active? : boolean;
}

interface TextBoxI {
    text?: string;
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    active?: boolean;
    unit?: string;
}

interface RadioBoxI {
    name?: string;
    value?: number;
    mainText?: string;
    subText?: string;
    select?: boolean;
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

interface CheckBoxI {
    name?: string;
    value?: number;
    text?: string;
    select?: boolean;
    onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
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
`


export function CTA1Button({onClick,text,active,value}:CTA1ButtonI){
    return(
        <>
        {
            active ?
            <button onClick={onClick} value={value} >
                {text}
            </button>
            :
            <button onClick={onClick} value={value} disabled>
                {text}
            </button>
        }
        <style jsx>{`
        button {
            ${CTA1Source}
            width: 350px;
            background: ${active ? colors.mainOrange : colors.grayBackgroundSub};
        }
        `}</style>
        </>
    )
}

export function CTA1ButtonSelect({onClick,text,active,value}:CTA1ButtonI){
    return(
        <>
        <button onClick={onClick} value={value}>
            {text}
        </button>
        <style jsx>{`
        button {
            ${CTA1Source}
            width: 350px;
            background: ${active ? colors.mainOrange : colors.grayWhite};
            border: 1px solid ${active ? "none" : colors.grayBackgroundSub};
            color: ${active ? colors.grayWhite : colors.graySubTitle};
        }
        `}</style>
        </>
    )
}

export function CTA1ButtonSmall({onClick,textMain,textSub,active,value}:CTA1ButtonSmallI){
    return(
        <>
        <button onClick={onClick} value={value}>
            {textMain}
            <div className="sub">
            {textSub}
            </div>
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
    )
}


export function CTA2Button({onClick,text,active}:CTA2ButtonI){
    return(
        <>
        <button onClick={onClick}>
        {text}
        </button>
        <style jsx>{`
        button {
            ${CTA2Source}
            background: ${active ? colors.mainOrange : colors.grayBackgroundSub};
        }
        `}</style>
        </>
    )
}


export function TextBox2({text, onChange, value, active, unit} : TextBoxI){
    return(
        <>
        <input
        placeholder={text}
        onChange={onChange}
        value={value}
        />
        {unit}
        <style jsx>{`
        input {
            width: ${unit ? "320px" : "350px"};
            border: none;
            color: ${ value === "" ? colors.grayBackgroundSub : colors.grayMainTitle};
            border-bottom: 2px solid ${colors.grayBackgroundSub};
            background: none;
            text-align: center;
            outline: none;
        }
        input:focus {
            border-bottom: 2px solid ${colors.mainOrange};
        }
        `}</style>
        </>
    )
}

export function RadioBox({name, value, mainText, subText, select, onChange}:RadioBoxI){
    return(
        <div className="container">
        {mainText}
        {subText}
        <input 
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        />
        <style jsx>{`
        .container {
            width: 350px;
            height: 80px;
            background: ${ select ? colors.mainOrange : "none"};
            color: ${ select ? colors.grayWhite : colors.graySubTitle};
            border: 1px solid ${colors.grayBackgroundSub};
            border-radius: 4px;
        }
        `}</style>
        </div>
    )
}

export function CheckBox({name, text, value, select, onChange}:CheckBoxI){
    return(
        <div className="container">
        {text}
        <input
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}
        />
        <style jsx>{`
        .container {
            width: 350px;
            height: 54px;
            background: ${ select ? colors.mainOrange : "none"};
            color: ${ select ? colors.grayWhite : colors.graySubTitle};
            border: 1px solid ${colors.grayBackgroundSub};
        }
        `}</style>
        </div>
    )
}

export default {
    CTA1Button, 
    CTA1ButtonSmall, 
    CTA2Button, 
    CTA1ButtonSelect,
    TextBox2,
    RadioBox
};