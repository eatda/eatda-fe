import { useRouter } from "next/router";
import FooterButton from "../../../components/common/FooterButton";
import Navigation from "../../../components/common/Navigation";

export default function Process() {
  const router = useRouter();
  return (
    <>
      <div>
        <Navigation text="상세정보" />
        {router.asPath}
        <FooterButton text="요리 완료하기" path="/" />
      </div>
      <style jsx>{``}</style>
    </>
  );
}
