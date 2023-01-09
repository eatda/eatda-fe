import colors from "../../../styles";
interface CTA1ButtonI {
    text?: string;
    onClick?: () => void;
    active?: boolean;
}

interface CTA1ButtonSmallI {
    textMain?: string;
    textSub?: string;
    onClick?: () => void;
    active? : boolean;
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


export function CTA1Button({onClick,text,active}:CTA1ButtonI){
    return(
        <>
        <button onClick={onClick}>
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

export function CTA1ButtonSmall({onClick,textMain,textSub,active}:CTA1ButtonSmallI){
    return(
        <>
        <button onClick={onClick}>
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


export function TextBoxOn({text, onChange, value} : TextBoxI){
    return(
        <>
        <input
        placeholder={text}
        onChange={onChange}
        value={value}
        />
        <style jsx>{`
        input {
            width: 350px;
            border: none;
            border-bottom: 2px solid ${colors.mainOrange};
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
    TextBoxOn
};