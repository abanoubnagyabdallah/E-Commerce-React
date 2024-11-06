import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading } from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { onCloseCartDrawerAction } from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clearAll } from "../app/features/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function CartDrawer() {
    const btnRef = useRef<HTMLElement>(null)
    const { isOpenCartDrawer } = useSelector((state: RootState) => state.global)
    const { cartProducts } = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handelCloseBtn = () => {
        dispatch(onCloseCartDrawerAction())
    }

    // console.log(cartProducts);


    return (
        <>
            <Drawer
                size={'sm'}
                isOpen={isOpenCartDrawer}
                placement='right'
                onClose={handelCloseBtn}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Shopping Cart</DrawerHeader>

                    <DrawerBody>
                        {
                            cartProducts.length
                                ? cartProducts.map(product => <CartDrawerItem key={product.id} {...product} />)
                                : <Flex direction={'column'} alignItems={'center'}>
                                    <Heading fontSize={'xl'} mb={'20px'} >Your cart is currently empty.</Heading>
                                    <Button variant='outline' colorScheme="gray" mr={3} leftIcon={<FaArrowLeft />}
                                        onClick={() => {
                                            navigate("/products")
                                            dispatch(onCloseCartDrawerAction())
                                        }}> Continue Shopping
                                    </Button>
                                </Flex>
                        }
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' colorScheme="red" mr={3} onClick={() => { dispatch(clearAll()) }}>
                            Clear All
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
