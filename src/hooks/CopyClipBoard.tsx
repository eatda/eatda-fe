export const copyCode = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("가족코드가 복사되었습니다.");
  } catch (error) {
    alert("다시 링크 복사 버튼을 눌러주세요.");
  }
};
