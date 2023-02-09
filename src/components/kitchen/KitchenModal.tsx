import { useEffect } from "react";
import colors from "../../assets/styles";
import { copyCode } from "../../hooks/CopyClipBoard";
import Image from "next/image";
import { copy, create, x_button } from "../../assets/icon";
import { useRouter } from "next/router";
import { route } from "../../assets/route";

interface IChild {
    id: number;
    modal: boolean;
    setModal: (v: boolean) => void;
    text?: string;
}

const KitchenModal = ({ id, modal, setModal, text }: IChild) => {
    const router = useRouter();
    const onClickButton = () => {
        setModal(!modal);
        if(id === 1){
            router.replace(route.timer);
        }
    };
    useEffect(() => {
        console.log(modal);
    }, [modal]);

  return (
    <div>
        <div className="modal">
            <div className="modal_section">
                <Image
                    alt="place"
                    width={16}
                    height={16}
                    src={create}
                    priority
                />
                <div className="modal_text">
                    {text}
                </div>
                <div className="modal_button" onClick={onClickButton}>
                    확인
                </div>
            </div>
        </div>
        <style jsx>{`
        .modal {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 99;
            background-color: rgba(0, 0, 0, 0.6);
        }
        .modal_section {
            width: 90%;
            height: 132px;
            max-width: 450px;
            border-radius: 10px;
            background-color: #fff;
            /* 팝업이 열릴때 스르륵 열리는 효과 */
            animation: modal-show 0.3s;
            overflow: hidden;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        .modal_text {
            font-size: 14px;
            font-family: pretendard-medium;
            font-weight: 500;
            color: ${colors.graySubTitle};
            margin-top: 9px;
        }
        .modal_button {
            width: 90%;
            height: 40px;
            background: ${colors.mainOrange};
            border-radius: 4px;
            border: none;
            color: white;
            line-height: 40px;
            font-family: pretendard-medium;
            margin-top: 15px;
        }


      `}</style>
    </div>
  );
};

export default KitchenModal;
