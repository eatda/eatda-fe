import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="container">
        <Link href="recipe">주방</Link>
        <Link href="home">홈</Link>
        <Link href="record">서재</Link>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
