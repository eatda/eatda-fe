import MiniHeader from "../../components/common/MiniHeader"
import Header from "../../components/common/Header"
export default function Report(){
    return(
        <>
        <div className="container">
            <Header text="서재"/>
            <MiniHeader left="식후 혈당 기록하기" right="주간레포트" leftURL="/library" rightURL="/library/report"/>
            레포트
        </div>
        <style jsx>{`
            .container {
                width: 390px;
            }
        `}</style>
        </>
    )
}