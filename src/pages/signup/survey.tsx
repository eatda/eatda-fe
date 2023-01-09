import { useRouter } from "next/router";
import { useState } from "react"
import { CTA1Button } from "../../components/common/Button";

export default function Survey(){
    const [page,setPage] = useState(0);
    const router = useRouter();

    const handleClick = () => {
        let num = page;
        setPage(++num);
        if(page > 5){
            router.replace('/signup/loading');
        }
    }

    return(
        <>
        {
            page === 0 ?
            <>
            맘스터치님, <br/>
            키를 알려주세요.
            </>
            :
            page === 1 ?
            <>
            맘스터치님, <br/>
            몸무게를 알려주세요.
            </>
            :
            page === 2 ?
            <>
            맘스터치님, <br/>
            성별은 무엇인가요?
            </>
            :
            page === 3 ?
            <>
            이제 습관 관련 <br/>
            추가 질문을 드리겠습니다.
            </>
            :
            page === 4 ?
            <>
            맘스터치님, 평균적인 <br/>
            일주일 활동량이 어떤가요?
            </>
            :
            <>
            맘스터치님, 못드시는 음식을<br/>
            모두 선택해주세요.
            </>
        }
        <br/>
        <CTA1Button text="다음" active={true} onClick={handleClick}/>
        </>
    )
}