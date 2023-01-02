import { useRouter } from "next/router";
import colors from "../../../styles";
import { GetScreenWidth } from "../../assets/getScreenWidth";
import Header from "./Header";
import Navigation from "./Navigation";
import TabBar from "./TabBar";

interface LayoutProps {
  children?: JSX.Element;
  viewType: "main" | "sub";
}

export default function Layout({ children }: LayoutProps) {
  const { pathname, route } = useRouter();
  const viewType =
    pathname === "/record/add" || pathname.includes("/detail") ? "sub" : "main";
  const screenWidth = GetScreenWidth();

  return (
    <>
      <div className="container">
        {viewType === "main" ? <Header /> : <Navigation />}
        {children}
        <TabBar />
      </div>

      <style jsx>{`
        .container {
          background: ${colors.grayBackground};
          width: ${screenWidth}px;
          height: 650px;
        }
      `}</style>
    </>
  );
}
