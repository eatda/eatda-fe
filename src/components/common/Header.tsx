interface HeaderType {
  text: string
}
export default function Header({text}:HeaderType) {
  return (
    <>
    <div className="container">
    {text}
    </div>
    <style jsx>{`
      .container {
        margin-left: 20px;
        padding-top: 27px;
        font-weight: 900;
      }
    `}</style>
    </>
  );
}
