import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {
  const session = useSession();
  console.log(session);
  return (
    <>
      <button onClick={() => signIn("kakao")}>카카오로 로그인하기</button>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
}
