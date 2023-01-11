import colors from "../../../styles";
interface CTA1ButtonI {
    text?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    active?: boolean | null;
    value?: string;
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
        <button onClick={onClick} value={value}>
            {text}
        </button>
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
            color: ${active ? colors.grayMainTitle : colors.grayBackgroundSub};
            border-bottom: 2px solid ${active ? colors.mainOrange : colors.grayBackgroundSub};
            background: none;
            text-align: center;
        }
        `}</style>
        </>
    )
}

export default {
    CTA1Button, 
    CTA1ButtonSmall, 
    CTA2Button, 
    CTA1ButtonSelect,
    TextBox2
};