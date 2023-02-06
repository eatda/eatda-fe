import colors from "../../assets/styles";

export default function Hr() {
  return (
    <>
      <div className="hr" />
      <style jsx>{`
        .hr {
          width: 100%;
          margin: 8px 0px 16px 0px;
          height: 4px;
          background-color: ${colors.grayBackground};
        }
      `}</style>
    </>
  );
}
