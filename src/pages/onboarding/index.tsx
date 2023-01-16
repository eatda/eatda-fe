import { signIn, signOut, useSession } from "next-auth/react";
import cookie from 'js-cookie';
import { useRouter } from "next/router";
import { useEffect } from "react";

import { login } from "../../store/userSlice";
import { selectUser } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SignIn({token}:any) {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  console.log('session:',session);
  // console.log(token);
  // console.log('next-auth.session-token:',token['next-auth.session-token']);

  useEffect(() => {
    if (session.status == "authenticated") {
      // router.replace("/signup/create-place", undefined, { shallow: true });
      const reduxData = {
        usersocial_id: session.data.user?.userId,
        useremail: session.data.user?.email,
        username: user.username,
        usercharacter: user.usercharacter,
        isDiabetes: user.isDiabetes,
        group_id: user.group_id,
      }
      dispatch(login(reduxData));
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