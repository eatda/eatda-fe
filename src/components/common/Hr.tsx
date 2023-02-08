import colors from "../../assets/styles";

export default function Hr() {
  return (
    <>
      <div className="hr" />
      <style jsx>{`
        .hr {
          margin: 8px -25px 16px -25px;
          height: 4px;
          // background-color: ${colors.grayBackground};
          background-color: none;
        }
      `}</style>
    </>
  );
}
