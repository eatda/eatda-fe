import Image from "next/image";
import { useRouter } from "next/router";
import colors from "../../../styles";

interface PushPageButtonProps {
  name?: string;
  src: string;
  page: string;
}
export default function PushPageButton({
  name,
  src,
  page,
}: PushPageButtonProps) {
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.push(page)}>
        <Image alt="character" width={56} height={24} src={src} priority />
      </button>
      <style jsx>{`
        button {
          display: flex;
          justify-content: center;
          align-items:center;
          color: ${colors.graySubTitle};
          // width: 350px;
          // width: 300px;
          width: 99%;
          height: 34px;
          background: ${colors.grayWhite};
          margin-top: 12px;
          margin-bottom: 8px;
          border: solid ${colors.grayBackgroundSub} 1.5px;
          border-radius: 20px;
        }
      `}</style>
    </>
  );
}
