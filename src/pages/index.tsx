import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { illust } from "../assets/illust";
import { route } from "../assets/route";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  if (session.status == "authenticated") {
    setTimeout(() => {
      router.replace(route.home, undefined, { shallow: true });
    }, 2000);
  } else if (session.status === "unauthenticated") {
    setTimeout(() => {
      router.replace(route.onboarding, undefined, { shallow: true });
    }, 5000);
  }

  return (
    <div className="container">
      <Image
        alt="character"
        width={360}
        height={740}
        src={illust.splash_gif}
        priority
      />
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
