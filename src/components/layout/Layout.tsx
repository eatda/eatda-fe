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
    pathname === "/record/add" ||
    pathname.includes("/detail") ||
    pathname.includes("/signup") ||
    pathname.includes("/filter") ||
    pathname.includes("/onboarding")
      ? "sub"
      : "main";
  
  // const [screenWidth, setScreenWidth] = useState(390);
  // const [isInitialRender, setIsInitialRender] = useState(true);
  // useEffect(() => {
  //   if (isInitialRender) {
  //     setIsInitialRender(false);
  //     setScreenWidth(GetScreenWidth());
  //   }
  // }, [screenWidth, isInitialRender]);
  // useEffect(()=>{
  //   setScreenWidth(GetScreenWidth());
  // },[])
  const screenWidth = GetScreenWidth();

  return (
    <>
      <div className="container">
        <div className="content">{children}</div>
        {viewType === "main" && <TabBar />}
      </div>
      <style jsx>{`
        .container {
          background: ${colors.grayWhite};
          // background: ${colors.grayBackgroundSub};
          // width: ${screenWidth}px;
          width: 390px;
        }
        .content {
          padding-bottom: 60px;
        }
      `}</style>
    </>
  );
}
