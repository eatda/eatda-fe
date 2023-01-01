import colors from "../../../styles";
import { GetScreenWidth } from "../../assets/getScreenWidth";

interface LayoutProps {
    children?: JSX.Element;
}

export default function Layout({ children }: LayoutProps){
    const screenWidth = GetScreenWidth();

    return(
        <>
        <div className="container">
            {children}
        </div>

        <style jsx>{`
            .container {
                background: ${colors.grayBackground};
                width: ${screenWidth}px;
                height: 650px;
            }
        `}</style>
        </>
    )
}