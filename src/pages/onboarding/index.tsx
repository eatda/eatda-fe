import { signIn, signOut, useSession } from "next-auth/react";
import cookie from 'js-cookie';
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignIn({token}:any) {
  const router = useRouter();
  const session = useSession();

  // console.log('session:',session);
  // console.log(token);
  // console.log('next-auth.session-token:',token['next-auth.session-token']);

  useEffect(() => {
    if (session.status == "authenticated") {
      // router.replace("/signup/create-place", undefined, { shallow: true });
    }
  },[session.status]);

  return (
    <>
      <button onClick={() => signIn("kakao")}>카카오로 로그인하기</button>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
}

export function getServerSideProps({req,res}:any){
  return { props: {token : req.cookies}}
}