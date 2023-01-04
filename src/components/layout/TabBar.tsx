import Link from "next/link";
import Image from "next/image";

export default function TabBar() {
  return (
    <>
      <div className="container">
        <Link href="recipe">
          <Image
            src="/img/kitchen_empty.svg"
            alt="주방"
            width= {25.13}
            height= {26}
            priority
          />
        </Link>
        <Link href="home">
          <Image
            src="/img/home_empty.svg"
            alt="홈"
            width= {28}
            height= {28}
            priority
          />
        </Link>
        <Link href="record">
          <Image
            src="/img/record_empty.svg"
            alt="서재"
            width= {34}
            height= {25.58}
            priority
          />
        </Link>
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
        }
      `}</style>
    </>
  );
}
