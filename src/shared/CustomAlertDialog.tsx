import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react"

interface IDialog {
    isOpen: boolean;
    onOpen: () => void
    onClose: () => void
    dialogHeader: string
    dialogBody: string
    deleteBtn: string
    clickToDeleteProduct:()=>void
    isloading:boolean
}

export default function CustomAlertDialog({ isOpen, onClose, dialogHeader, dialogBody, deleteBtn,clickToDeleteProduct,isloading }: IDialog) {
    const cancelRef = useRef<HTMLButtonElement>(null)

    return (
        <>  
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay bg={"blackAlpha.500"} backdropFilter={"blur(5px) hue-rotate(90deg)"}>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {dialogHeader}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {dialogBody}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={clickToDeleteProduct} ml={3} isLoading={isloading}>
                                {deleteBtn}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
