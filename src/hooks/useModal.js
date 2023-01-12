import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

const useModal = () => {
	const { componentToOpen, setComponentToOpen, setModalOpened } =
		useContext(ModalContext);

	const openModal = ({ modalName, payload }) => {
		setComponentToOpen({
			...componentToOpen,
			name: modalName, // name of the modal to open. see <Modal />
			payload: payload, // data to be passed as props to the component to be opened
		});
		setModalOpened(true);
	};

	const closeModal = () => {
		setModalOpened(false);
	};

	return { openModal, closeModal };
};

export default useModal;