import Navigation from "../../components/common/Navigation"
export default function MyPage(){
    return(
        <div className="container">
        <Navigation text="마이페이지"/>
        mypage
        <style jsx>{`
        .container {
            width: 390px;
            min-height: 800px;
            padding-top: 60px;
          }
        `}</style>
        </div>
    )
}