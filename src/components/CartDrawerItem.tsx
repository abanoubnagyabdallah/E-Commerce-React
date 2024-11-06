import { Box, Button, Divider, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {  decreaseProduct, increaseProduct, removeProduct } from "../app/features/cartSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ICartDrawer {
    id: number;
    title: string;
    price: number;
    thumbnail: { url: string }
    quantity: number
    stock: number
}

export default function CartDrawerItem({ id, thumbnail, title, price, quantity, stock }: ICartDrawer) {
    const dispatch = useDispatch()

    const handelIncreaseQuantity = () => {
        if (stock > quantity) {
            dispatch(increaseProduct(id))
        }
    }

    const handelDecreaseQuantity = () => {
        dispatch(decreaseProduct(id))
    }

    const handelRemoveProduct=()=>{
        dispatch(removeProduct(id))
    }


    return (
        <>
            <Flex alignItems={'center'} mb={3} py={2} gap={4} >
                <Image src={`${import.meta.env.VITE_SERVER_URL}${thumbnail.url}`} alt={title} w={'80px'} h={"80px"} rounded={'full'} objectFit={'cover'} mr={5} />
                <Stack>
                    <Text fontSize={'sm'}>{title}</Text>
                    <Text fontSize={'sm'}>Price: ${price}</Text>
                    <Text fontSize={'sm'}>Quantity: {quantity}</Text>
                    <Button variant={'outline'} colorScheme={'red'} size={'sm'} w={'fit-content'} leftIcon={<RiDeleteBin6Line />} onClick={handelRemoveProduct} >Remove</Button>
                </Stack>
                <HStack spacing={4}>
                    <Button size="sm" isDisabled={quantity === 1} rounded={'full'} variant={'outline'} onClick={handelDecreaseQuantity}> - </Button>
                    <Box>
                        <Text fontSize="md" fontWeight="bold">
                            {quantity}
                        </Text>
                    </Box>
                    <Button size="sm" variant="outline" rounded={'full'} onClick={handelIncreaseQuantity}> + </Button>
                </HStack>
            </Flex>
            <Divider />
        </>
    )
}

