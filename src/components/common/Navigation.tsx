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
          <Image
            alt="back"
            width={32}
            height={32}
            src={`/button/back.svg`}
            priority
          />
        </button>
        <div className="text">{text}</div>
        <div className="blank"></div>
      </div>
      <style jsx>{`
        .container {
          height: 56px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: white;
        }
        button {
          border: none;
          background: none;
        }
        .text {
          font-size: 18px;
          font-weight: 500;
          text-align: center;
        }
        .blank {
          width: 44px;
          height: 44px;
        }
      `}</style>
    </>
  );
}
