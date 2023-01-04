import MiniHeader from "../../components/common/MiniHeader"
export default function Report(){
    return(
        <>
        <MiniHeader left="식후 혈당 기록하기" right="주간레포트" left_url="/record" right_url="/record/report"/>
        레포트
        </>
    )
}