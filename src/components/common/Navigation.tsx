import { useRouter } from "next/router";
import Image from "next/image";

interface NavigationProps {
  text: string;
}
export default function Navigation({ text }: NavigationProps) {
  const router = useRouter();
  const back = "<";
  return (
    <>
      <div className="container">
        <button onClick={() => router.back()}>
          <Image alt="back" width={32} height={32} src={`/button/back.svg`} priority/>
        </button>
        <div className="text">
          {text}
        </div>
      </div>
      <style jsx>{`
        .container {
          height: 56px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }
        button {
          // float: left;
          border: none;
          // margin-right: auto; 
          background: none;
        }
        text {
          font-size: 18px;
          font-weight: 500;
          text-align: center;
        }
      `}</style>
    </>
  );
}
