import colors from "../../../styles";

interface LayoutProps {
    children?: JSX.Element;
}

export default function Layout({ children }: LayoutProps){
    return(
        <>
        <div className="container">
            {children}
        </div>

        <style jsx>{`
            .container {
                background: ${colors.grayBackground};
                width: 390px;
                height: 650px;
            }
        `}</style>
        </>
    )
}