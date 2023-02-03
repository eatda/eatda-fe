import colors from "../../assets/styles";

export default function Hr() {
  return (
    <>
      <div className="hr" />
      <style jsx>{`
        .hr {
          margin: 8px -20px 16px -20px;
          height: 4px;
          background-color: ${colors.grayBackground};
        }
      `}</style>
    </>
  );
}
