import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  console.log(router);
  const session = useSession();
  useEffect(() => {
    if (session.status == "authenticated") {
      router.replace("/home", undefined, { shallow: true });
    } else {
      router.replace("/onboarding", undefined, { shallow: true });
    }
  },[]);

  return <>home</>;
}
