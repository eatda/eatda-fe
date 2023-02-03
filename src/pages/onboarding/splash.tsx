import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { route } from "../../assets/route";
import { CTA1Button } from "../../components/common/Button";

export default function Splash() {
  const [page, setPage] = useState(0);
  const router = useRouter();

  const handleClickNext = () => {
    setPage((prevNumber) => prevNumber + 1);
    if (page === 2) {
      router.replace(route.onboarding);
    }
  };

  return (
    <>
      <div className="container">
        {page === 0 ? (
          <>
            당신의 사기를 <br />
            UP! 하고
          </>
        ) : (
          <>
            함께 레시피를 <br />
            PICK! 하는
          </>
        )}
        <div className="buttonItem">
          {page > 0 && (
            <CTA1Button text="다음" active={true} onClick={handleClickNext} />
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 600px;
          align-items: center;
          justify-content: center;
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
    </>
  );
}
