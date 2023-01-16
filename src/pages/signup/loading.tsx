import { useRouter } from "next/router"
import { CTA1Button } from "../../components/common/Button"
import { selectUser } from "../../store/userSlice";
import { selectSurvey } from "../../store/surveySlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

interface bodyDataI {
    social_id: string;
    email: string;
    name: string;
    character_id: number;
    group_id: number;
    is_diabetes: boolean | null;

    height?: number;
    weight?: number;
    gender?: string | null;
    activity?: number | null;
    allergy?: string[] | null;
}

export default function Loading(){
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const survey = useSelector(selectSurvey);

    const handleClick = () => {
        router.push('/home')
    }

    const fetchSignup = async () => {
        const URL = `${process.env.NEXT_PUBLIC_API_ROOT}/accounts/register/`;
        let bodyData : bodyDataI = {
            social_id: user.usersocial_id,
            email: user.useremail,
            name: user.username,
            character_id: user.usercharacter,
            group_id: user.group_id,
            is_diabetes: user.isDiabetes
        }
        if(user.isDiabetes){
            // 당뇨인일 때 설문조사 정보 추가
            console.log('survey:',survey);
            bodyData.height = survey.height;
            bodyData.weight = survey.weight;
            bodyData.gender = survey.gender;
            bodyData.activity = survey.activity;
            bodyData.allergy = survey.allergy;

        }
        try {
            console.log('bodyData:',JSON.stringify(bodyData));
            // const data = await (await fetch(URL,{
            //     method: 'POST',
            //     // mode: 'cors',
            //     headers:{
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(bodyData)
            // }))

            const data2 = await (await fetch(URL,{
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData)
            })).json();

            return data2;

        } catch (error) {
            return error;
        }
    }

    useEffect(()=>{
        const response = fetchSignup();
        console.log(response);
    },[])

    return(
        <>
        Loading page
        <CTA1Button active={true} text="식단 만들러 가기" onClick={handleClick}/>
        </>
    )
}