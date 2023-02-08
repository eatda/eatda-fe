import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { login } from "../../store/userSlice";
import { selectUser } from "../../store/userSlice";
import { putToken } from "../../store/tokenSlice";
import { useSelector, useDispatch } from "react-redux";
import { route } from "../../assets/route";
import { illust } from "../../assets/illust";

export default function SignIn() {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const fetchLogin = async () => {
    const URL = `${process.env.NEXT_PUBLIC_API_ROOT}accounts/login/`;
    let bodyData = {
      social_id: user.usersocial_id,
      email: user.useremail,
    };
    try {
      const data = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      const res = await data.json();
      return { data, res };
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const { data, res }: any = await fetchLogin();
      console.log("data.status:", data.status);
      if (data.ok) {
        const reduxData = {
          usersocial_id: user.usersocial_id,
          useremail: user.useremail,
          username: user.username,
          usercharacter: res.user_info.character,
          isDiabetes: res.user_info.is_diabetes,
          usergroup: user.usergroup,
        };
        console.log(user.usersocial_id);
        dispatch(login(reduxData));
        dispatch(putToken({ access_token: res.access_token }));
        console.log("로그인 완료");
        router.replace(route.home, undefined, { shallow: true });
      } else if (data.status === 404) {
        console.log(user.usersocial_id);
        console.log("회원가입하기");
        router.replace(route.createPlace, undefined, { shallow: true });
      } else {
        console.log("로그인 다시 시도");
        router.replace(route.onboarding, undefined, { shallow: true });
      }
    }
    if (session.status == "authenticated") {
      const reduxData = {
        usersocial_id: session.data.user?.userId,
        useremail: session.data.user?.email,
        username: user.username,
        usercharacter: user.usercharacter,
        isDiabetes: user.isDiabetes,
        usergroup: user.usergroup,
      };
      dispatch(login(reduxData));
      fetchData();
    }
  }, [session.status]);

  return (
    <div className="container">
      <div className="buttonItem">
        <button onClick={() => signIn("kakao")}>카카오로 시작하기</button>
      </div>

      <style jsx>{`
        .container {
          height: 100vh;
          // margin-top: 100px;
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          background-image: url(${illust.signin});
          background-size: auto;
          background-position: center;
        }
        .buttonItem {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60px;
          width: 100%;
          position: fixed;
          bottom: 36px;
          left: 0;
          right: 0;
        }
        button {
          background: #fbe64d;
          border: none;
          width: 90%;
          height: 54px;
          font-size: 16px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
