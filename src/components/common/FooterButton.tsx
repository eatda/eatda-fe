import colors from "../../../styles";

interface FooterButtonProps {
  onClick: any;
  text: string;
}
export default function FooterButton({ onClick, text }: FooterButtonProps) {
  return (
    <>
      <div className="footer">
        <div className="button" onClick={onClick}>
          {text}
        </div>
      </div>
      <style jsx>{`
        .footer {
          position: fixed;
          bottom: 0;
          right: 0;
          left: 0;
          padding: 10px 20px;
          display: flex;
          justify-content: center;
        }
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          flex: 1;
          background-color: ${colors.mainOrange};
          color: ${colors.grayWhite};
          font-weight: 700;
          font-size: 20px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
