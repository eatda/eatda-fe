import { useRouter } from "next/router"
import { CTA1Button } from "../../components/common/Button"
import { selectUser } from "../../store/userSlice";
import { selectSurvey } from "../../store/surveySlice";
import { selectToken } from "../../store/tokenSlice";
import { putToken } from "../../store/tokenSlice";
import { login } from "../../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

interface bodyDataI {
    social_id: string;
    email: string;
    name: string;
    character: number;
    group: string;
    is_diabetes: boolean | null;

    height?: number;
    weight?: number;
    age?: number;
    gender?: string | null;
    activity?: number | null;
    allergy?: string[] | null;
}

export default function Loading(){
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const survey = useSelector(selectSurvey);

    const [page, setPage] = useState<number>(0);

    const handleClick = () => {
        router.push('/home')
    }

    const fetchSignup = async () => {
        const URL = `${process.env.NEXT_PUBLIC_API_ROOT}accounts/register/`;
        let bodyData : bodyDataI = {
            // social_id: user.usersocial_id,
            social_id: 'testtdt21s28257',
            // email: user.useremail,
            email: 'testntotdita@gmail.com',
            name: user.username,
            character: user.usercharacter,
            group: user.usergroup,
            is_diabetes: user.isDiabetes
        }
        if(user.isDiabetes){
            // 당뇨인일 때 설문조사 정보 추가
            console.log('survey:',survey);
            bodyData.height = survey.height;
            bodyData.weight = survey.weight;
            bodyData.age = survey.age;
            bodyData.gender = survey.gender;
            bodyData.activity = survey.activity;
            bodyData.allergy = survey.allergy;

        }
        try {
            console.log('bodyData:',JSON.stringify(bodyData));

            const data =  (await fetch(URL,{
                method: 'POST',
                credentials: 'include',
                // mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData)
            }));

            const res = await data.json();
            
            return {data, res};

        } catch (error) {
            return error;
        }
    }

    useEffect( ()=>{
        async function fetchData(){
            const {data, res} : any = await fetchSignup();
            if(data.ok){
                setPage(1);
                console.log(res);
                const reduxData = {
                    usersocial_id: user.usersocial_id,
                    useremail: user.useremail,
                    username: user.username,
                    usercharacter: res.user_info.character,
                    isDiabetes: res.user_info.is_diabetes,
                    usergroup: user.usergroup,
                }
                dispatch(login(reduxData));
                dispatch(putToken({access_token: res.access_token}));
                console.log('회원가입 완료');
            }else{
                console.log('회원가입 실패');
                console.log(res);
            }
        }
        fetchData();
    },[])

    return(
        <>
        {
            page === 0 ?
            <>
            loading page
            </>
            :
            <CTA1Button active={true} text="식단 만들러 가기" onClick={handleClick}/>

        }
        </>
    )
}