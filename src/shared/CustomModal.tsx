import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { ReactNode } from "react";
// import { IProductToEdit } from "../interfaces/interface";

interface ICustomModal {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    // cancelTxt: string;
    // okTxt: string;
    // passEditProductToModal: IProductToEdit;
    // thumbnail: {
    //     lastModified: number;
    //     lastModifiedDate: Date;
    //     name: string;
    //     size: number;
    //     type: string;
    //     webkitRelativePath: string;
    // };
    // loading: boolean;
    // updateProductFunction: ({ id, body }: { id: number; body: FormData }) => void;
    // updateId: number;
}

export default function CustomModal({ isOpen, onClose, title, children}: ICustomModal) {

    // const handelClickToUpdate = () => {
    //     const formData = new FormData();

    //     formData.append("data", JSON.stringify({
    //         title: passEditProductToModal.title,
    //         description: passEditProductToModal.description,
    //         price: passEditProductToModal.price,
    //         stock: passEditProductToModal.stock,
    //     }));

    //     // if (thumbnail && thumbnail.size > 0) {
    //     //     formData.append("thumbnail", thumbnail);  
    //     // }

    //     updateProductFunction({ id: updateId, body: formData });
    // };

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
                <ModalOverlay bg={"blackAlpha.500"} backdropFilter={"blur(5px) hue-rotate(90deg)"} />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>{cancelTxt}</Button>
                        <Button type="submit" variant={'ghost'} isLoading={loading} >{okTxt}</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
}
