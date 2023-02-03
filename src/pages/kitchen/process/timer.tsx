import { useRouter } from "next/router";
import { CTA1Button } from "../../../components/common/Button";
import Image from "next/image";
import { illust } from "../../../assets/illust";

export default function Timer() {
  const router = useRouter();

  const handleClick = () => {
    router.replace("/home");
  };
  return (
    <div className="container">
      <Image
        alt="character"
        width={184}
        height={194}
        src={illust.signup}
        priority
      />
      <div className="text">
        식사 완료 2시간 후 <br />
        혈당을 기록해주세요
      </div>
      <div className="buttonItem">
        <CTA1Button text="홈으로" active={true} onClick={handleClick} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }
        .text {
          margin-top: 32px;
          font-size: 24px;
          font-weight: 600;
          text-align: center;
        }
        .buttonItem {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60px;
          position: fixed;
          bottom: 36px;
          left: 0;
          right: 0;
        }
      `}</style>
    </div>
  );
}
