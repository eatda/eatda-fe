import { useRouter } from "next/router";
import colors from "../../../styles";
import { GetScreenWidth } from "../../assets/getScreenWidth";
import TabBar from "./TabBar";

interface LayoutProps {
  children?: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname, route } = useRouter();
  const viewType =
    pathname === "/record/add" || pathname.includes("/detail") ? "sub" : "main";
  const screenWidth = GetScreenWidth();

  return (
    <>
      <div className="container">
        <div className="content">{children}</div>
        {viewType === "main" && <TabBar />}
      </div>
      <style jsx>{`
        .container {
          background: ${colors.grayBackground};
          width: ${screenWidth}px;
        }
        .content {
          padding-bottom: 60px;
        }
      `}</style>
    </>
  );
}
