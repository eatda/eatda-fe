import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();
  return (
    <>
      <div className="container">
        <button onClick={() => router.back()}>back</button>
        <h4>상세 정보</h4>
      </div>
      <style jsx>{`
        .container {
          height: 56px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
