import { signIn, signOut, useSession } from "next-auth/react";
import cookie from 'js-cookie';
import { useRouter } from "next/router";
import { useEffect } from "react";

import { login } from "../../store/userSlice";
import { selectUser } from "../../store/userSlice";
import { delToken, putToken } from "../../store/tokenSlice";
import { selectToken } from "../../store/tokenSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SignIn() {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  console.log('session:',session);

  const fetchLogin = async () =>{
    const URL = `${process.env.NEXT_PUBLIC_API_ROOT}accounts/login/`;
    let bodyData = {
      social_id: user.usersocial_id,
      email: user.useremail
    }

    try {
      const data = await fetch(URL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
      });

      const res = await data.json();
      return {data, res}
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    async function fetchData(){
      const {data, res} : any = await fetchLogin();
      if(data.ok){
        console.log('로그인 완료')
        const reduxData = {
          usersocial_id: user.usersocial_id,
          useremail: user.useremail,
          username: user.username,
          usercharacter: res.user_info.character,
          isDiabetes: res.user_info.is_diabetes,
          group_id: user.group_id,
        }
        dispatch(login(reduxData));
        dispatch(putToken({access_token: res.access_token}));
        router.replace('/home', undefined, { shallow: true });
      }else{
        console.log('회원가입하기')
        router.replace("/signup/create-place", undefined, { shallow: true });
      }
    }
    if (session.status == "authenticated") {
      const reduxData = {
        usersocial_id: session.data.user?.userId,
        useremail: session.data.user?.email,
        username: user.username,
        usercharacter: user.usercharacter,
        isDiabetes: user.isDiabetes,
        group_id: user.group_id,
      }
      dispatch(login(reduxData));
      fetchData();
    }
  },[session.status]);

  return (
    <>
      <button onClick={() => signIn("kakao")}>카카오로 로그인하기</button>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
}