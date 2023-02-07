import { useRouter } from "next/router";
import colors from "../../assets/styles";
import Header from "./Header";
import TabBar from "./TabBar";

interface LayoutProps {
  children?: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const viewType =
    pathname.includes("/add") ||
    pathname.includes("/detail") ||
    pathname.includes("/process") ||
    pathname.includes("/signup") ||
    pathname.includes("/filter") ||
    pathname === "/" ||
    pathname.includes("/onboarding")
      ? "sub"
      : "main";

  const isHeader =
    viewType == "main" &&
    (pathname.includes("kitchen") || pathname.includes("library"))
      ? true
      : false;

  return (
    <>
      <div className="container">
        {isHeader && <Header />}
        <div className={viewType == "main" ? "main content" : "sub content"}>
          {children}
        </div>
        {viewType === "main" && <TabBar />}
      </div>
      <style jsx>{`
        .container {
          max-width: 390px;
          width: 100vw;
          background: ${colors.grayWhite};
        }
        .content {
          padding: 0px 20px;
        }
        .main {
          padding-top: 100px;
          padding-bottom: 60px;
        }
        .sub {
          padding-top: 70px;
          padding-bottom: 70px;
        }
      `}</style>
    </>
  );
}
