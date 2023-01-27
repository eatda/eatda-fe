import Navigation from "../../components/common/Navigation";
import colors from "../../../styles";
import { selectToken } from "../../store/tokenSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface myDataI {
    name: string;
    character: number;
    group: string;
    is_diabetes: boolean;

    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    allergy?: any;
}

export default function MyPage(){
    const [myData, setMyData] = useState<myDataI>();
    const token = useSelector(selectToken);
    const router = useRouter();
    const session = useSession();

    const fetchMyPage = async () => {
        const URL = `${process.env.NEXT_PUBLIC_API_ROOT}users/info`;
        try {
            const data = await fetch(URL,{
                method:'GET',
                credentials: 'include',
                headers: {
                    Authorization : token.access_token
                    // Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc0MjExMjA3LCJpYXQiOjE2NzQyMDc2MDcsImp0aSI6IjQzYWYyMGVhNTNiMTQ1YjlhMzZkMjM0YmVhNjM1M2YzIiwidXNlcl9pZCI6ImEyYjhmZjlkLTBkMDUtNDU0Zi1iNmVhLThhMjFkNGJlZDk1NyJ9.cNB5DdU_FAluR73YEqOG2Zq_Emj16YCjZ7cee14JIrE"
                }
            })

            const res = await data.json();
            
            return {data, res};

        } catch (error) {
            return error;
        }   
    }

    useEffect(()=>{
        async function fetchData(){
            const {data, res} :any = await fetchMyPage();
            if(data.ok){
                setMyData(res);
            }else{
                console.log('error');
            }
        }
        fetchData();
    })

    const handleClick = () => {
        signOut();
    }
    
    useEffect(()=>{
        if(session.status === "unauthenticated"){
            router.replace('/onboarding');
        }
    },[session.status]);

    return(
        <>
        <Navigation text="마이페이지"/>
        <div className="container">
        <div className="profile">
            {
            myData?.character &&
            <Image alt="character" width={80} height={80} src={`/character/ch_${myData?.character}.svg`} priority/>
            }
            <br/>
            <div className="profile_dia">
            {myData?.is_diabetes ? "당뇨인" : "당뇨인 가족"}
            </div>
            <br/>
            {myData?.name}
            {myData?.is_diabetes ? 
            <>
            <br/>
            {myData?.height}cm {myData?.weight}kg {myData?.gender}
            </>
            :
            <></>    
            }
        </div>
        <br/>
            {
                myData?.is_diabetes ?
                <>
                <div className="info">
                <div className="infoItem">
                활동량 
                </div>
                <br/>
                <div className="line"></div>
                <div className="infoItem">
                알레르기 {myData?.allergy}
                </div>
                </div>
                </>
                :
                <></>
            }
        <br/>
        <button onClick={handleClick}>
            초대코드 복사하기 {myData?.group}
        </button>
        <button>
            서비스 평가 및 정식 출시 알림 받기
        </button>
        <button onClick={()=>signOut()}>
            로그아웃하기
        </button>
        <button/>
        </div>
        <style jsx>{`
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 390px;
            // min-height: 800px;
            padding-top: 60px;
        }
        
        .profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            
        }
        .profile_dia {
            background: ${colors.mainOrange};
            color: ${colors.grayWhite};
            width: ${myData?.is_diabetes ? "60px" : "80px"};
            border-radius: 2px;
        }

        .info {
            background: ${colors.grayBackground};
            width: 350px;
            height: 124px;
            border-radius: 6px;

            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .infoItem {
            margin-top: 20px;
        }
        .line {
            min-width: 390px;
            height: 2px;
            background: ${colors.grayWhite};
        }
        
        button {
            display: flex;
            // flex-direction: column;
            align-items: center;

            background: none;
            border: none;
            border-top: 2px solid ${colors.grayBackgroundSub};
            height: 62px;
            line-height: 62px;
            min-width: 390px;
        }
        `}</style>
        </>
    )
}
