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
          {back}
        </button>
        <h4>{text}</h4>
      </div>
      <style jsx>{`
        .container {
          height: 56px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }
      `}</style>
    </>
  );
}
