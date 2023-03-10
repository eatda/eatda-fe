import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import colors from "../../assets/styles";

export default function TabBar() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.pathname);

  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router]);

  const handleRouting = (src: string) => {
    setCurrentPath(`/${src}`);
    router.replace(`/${src}`);
  };

  const TabBarItems = [
    {
      id: 1,
      src: "kitchen",
      title: "주방",
    },
    {
      id: 2,
      src: "home",
      title: "홈",
    },
    {
      id: 3,
      src: "library",
      title: "서재",
    },
  ];

  return (
    <>
      <div className="container">
        {TabBarItems.map((item, idx) => {
          const isSelected = currentPath.includes(`/${item.src}`);

          return (
            <div key={idx} onClick={() => handleRouting(item.src)}>
              <Image
                src={`/img/tabbar/${item.src}${isSelected ? "" : "_empty"}.svg`}
                alt={item.title}
                width={30}
                height={45}
                priority
              />
              <br />
              {/* <div className={isSelected ? "select" : "empty"}>
                {item.title}
              </div> */}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 60px;
          box-shadow: 0px -1px 1px 0px lightgray;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: ${colors.grayWhite};
        }
        .select {
          color: ${colors.mainOrange};
        }
        .empty {
          color: ${colors.graySubTitle};
        }
      `}</style>
    </>
  );
}
