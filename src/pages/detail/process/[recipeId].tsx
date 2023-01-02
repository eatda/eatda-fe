import { useRouter } from "next/router";

export default function Process() {
  const router = useRouter();
  return (
    <>
      <div>{router.asPath}</div>
      <style jsx>{``}</style>
    </>
  );
}
