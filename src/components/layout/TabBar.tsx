import Link from "next/link";

export default function TabBar() {
  return (
    <>
      <div className="container">
        <Link href="recipe">주방</Link>
        <Link href="home">홈</Link>
        <Link href="record">서재</Link>
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
