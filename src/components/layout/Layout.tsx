import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import colors from "../../../styles";
import { GetScreenWidth } from "../../assets/getScreenWidth";
import TabBar from "./TabBar";

interface LayoutProps {
  children?: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname, route } = useRouter();
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

  const screenWidth = GetScreenWidth();

  return (
    <>
      <div className="container">
        <div className={viewType == "main" ? "main content" : "sub content"}>
          {children}
        </div>
        {viewType === "main" && <TabBar />}
      </div>
      <style jsx>{`
        .container {
          max-width: 390px;
          width: 100vw;
          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          // align-items: center;
          // padding-left: 32px;
          background: ${colors.grayWhite};
          // background: ${colors.grayBackgroundSub};
          // width: ${screenWidth}px;
        }
        .content {
          padding: 0px 20px;
        }
        .main {
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
