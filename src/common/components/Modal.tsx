import {createPortal} from "react-dom";
import {ReactNode} from "react";

type Props = {
    showModal: boolean;
    children: ReactNode;
}
const Modal = ({showModal, children}: Props) => {
    return (
        showModal && createPortal(
            children,
            document.body
        )
    )
}

export default Modal;