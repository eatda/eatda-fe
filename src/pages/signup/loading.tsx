import { useRouter } from "next/router"
import { CTA1Button } from "../../components/common/Button"
export default function Loading(){
    const router = useRouter();
    const handleClick = () => {
        router.push('/home')
    }
    return(
        <>
        Loading page
        <CTA1Button active={true} text="식단 만들러 가기" onClick={handleClick}/>
        </>
    )
}