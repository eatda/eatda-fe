import colors from "../../../styles";
interface CTA1ButtonI {
    text?: string;
    onClick?: () => void;
}

interface CTA1ButtonSmallI {
    textMain?: string;
    textSub?: string;
    onClick?: () => void;
}

interface CTA2ButtonI {
    text?: string;
    onClick?: () => void;
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


export function CTA1ButtonOn({onClick,text}:CTA1ButtonI){
    return(
        <>
        <button onClick={onClick}>
            {text}
        </button>
        <style jsx>{`
        button {
            ${CTA1Source}
            width: 350px;
            background: ${colors.mainOrange};
        }
        `}</style>
        </>
    )
}

export function CTA1ButtonOff({onClick,text}:CTA1ButtonI){
    return(
        <>
        <button onClick={onClick}>
            {text}
        </button>
        <style jsx>{`
        button {
            ${CTA1Source}
            width: 350px;
            background: ${colors.grayBackgroundSub};
        }
        `}</style>
        </>
    )
}

export function CTA1ButtonOnSmall({onClick,textMain,textSub}:CTA1ButtonSmallI){
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
            background: ${colors.mainOrange};
            margin: 5px;
        }
        .sub {
            color: ${colors.mainYellow};
        }
        `}</style>
        </>
    )
}

export function CTA1ButtonOffSmall({onClick,text}:CTA1ButtonI){
    return(
        <>
        <button onClick={onClick}>
            {text}
        </button>
        <style jsx>{`
        button {
            ${CTA1Source}
            width: 170px;
            background: ${colors.grayBackgroundSub};
        }
        `}</style>
        </>
    )
}

export function CTA2ButtonOn({onClick,text}:CTA2ButtonI){
    return(
        <>
        <button onClick={onClick}>
        {text}
        </button>
        <style jsx>{`
        button {
            ${CTA2Source}
            background: ${colors.mainOrange};
        }
        `}</style>
        </>
    )
}

export function CTA2ButtonOff({onClick,text}:CTA2ButtonI){
    return(
        <>
        <button onClick={onClick}>
        {text}
        </button>
        <style jsx>{`
        button {
            ${CTA2Source}
            background: ${colors.grayBackgroundSub};
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
    CTA1ButtonOff, 
    CTA1ButtonOn, 
    CTA1ButtonOnSmall, 
    CTA1ButtonOffSmall, 
    CTA2ButtonOff, 
    CTA2ButtonOn,
    TextBoxOn
};