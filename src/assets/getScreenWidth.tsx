import { useState, useEffect } from "react";

export function GetScreenWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  // resize될 때만 함수 불러오기
  let timer: NodeJS.Timeout;
  const resizeWindow = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      //현재 window width 값
      setWindowWidth(window.innerWidth);
    }, 500);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, [windowWidth]);

  return windowWidth < 390 ? windowWidth : 390;
  // return windowWidth;
}
