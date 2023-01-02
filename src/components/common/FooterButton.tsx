import Link from "next/link";

interface FooterButtonProps {
  path: string;
  text: string;
}
export default function FooterButton({ path, text }: FooterButtonProps) {
  return (
    <>
      <div className="footer">
        <Link href={path}>
          <button>{text}</button>
        </Link>
      </div>
      <style jsx>{`
        .footer {
          position: fixed;
          bottom: 0;
          right: 0;
          left: 0;
          display: flex;
          justify-content: center;
        }
        .footer button {
          background-color: tomato;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          width: 350px;
        }
      `}</style>
    </>
  );
}
