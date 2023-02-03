import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import { splash } from "../assets/icon";

export default function Home() {
  const router = useRouter();
  console.log(router);
  const session = useSession();
  useEffect(() => {
    if (session.status == "authenticated") {
      router.replace("/home", undefined, { shallow: true });
    } else {
      setTimeout(() => {
        router.replace("/onboarding", undefined, { shallow: true });
      }, 2000);
    }
  }, []);

  return (
    <div className="container">
      <Image alt="character" width={176} height={148} src={splash} priority />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 600px;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
