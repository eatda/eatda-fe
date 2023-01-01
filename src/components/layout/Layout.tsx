import { useRouter } from "next/router";
import colors from "../../../styles";
import { GetScreenWidth } from "../../assets/getScreenWidth";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";

interface LayoutProps {
  children?: JSX.Element;
  viewType: "main" | "sub";
}

export default function Layout({ children }: LayoutProps) {
  const { pathname, route } = useRouter();
  const viewType = pathname === "/record/add" || "/detail" ? "main" : "sub";
  const screenWidth = GetScreenWidth();

  return (
    <>
      <div className="container">
        {viewType === "main" ? <Header /> : <Navigation />}
        {children}
        <Footer />
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
