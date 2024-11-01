import { Button, Card, CardBody, Flex, Grid, Heading, Image, Skeleton, Stack, Text, useColorMode } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthenticatedQuery } from '../hooks/useAuthenticatedQuery';
import { useEffect } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { addToCart } from '../app/features/cartSlice';
// import { RootState } from '../app/store';

export default function SingleProduct() {
    const dispatch = useDispatch()
    // const { cartProducts } = useSelector((state: RootState) => state.cart)

    const { id } = useParams();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();

    const { isLoading, data, error } = useAuthenticatedQuery({
        queryKey: [`ProductView${id}`],
        url: `/api/products?populate=*&[filters][id]=${id}&fields=title,description,price`
    });

    const singleProduct = data?.data?.[0];

    useEffect(() => {
        if (singleProduct) {
            document.title = `Products Store | ${singleProduct.title || 'Product'}`;
        }
    }, [singleProduct]);

    const goBack = () => navigate(-1);

    if (isLoading) {
        return (
            <Grid templateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={6} margin={30}>
                <Skeleton height='500px' borderRadius={'10px'} />
            </Grid>
        );
    }

    if (error) {
        return <Button onClick={goBack}>Back</Button>;
    }

    if (!singleProduct) {
        return <Text>No product data available.</Text>;
    }


    const handelAddToCart = () => {
        dispatch(addToCart(singleProduct))
    }

    const { title, description, price, thumbnail } = singleProduct;
    const imageUrl = `${import.meta.env.VITE_SERVER_URL}${thumbnail?.url || ''}`;

    return (
        <>
            <Flex alignItems={'center'} maxW={'sm'} mx={'auto'} my={7} fontSize={'lg'} cursor={'pointer'} onClick={goBack}>
                <IoIosArrowRoundBack />
                <Text ml={2}> Back </Text>
            </Flex>
            <Card bg="none" border="1px solid #a8b5c8" maxW="sm" margin="auto">
                <CardBody>
                    <Image
                        src={imageUrl}
                        alt={title || 'Product Image'}
                        width={'full'}
                        height={200}
                        objectFit="cover"
                    />
                    <Stack mt="6" spacing="3">
                        <Heading size="md" color={colorMode == 'dark' ? "white" : 'purple.600'} textAlign="center" p={3} mb={2}>
                            {title || 'Product Title'}
                        </Heading>
                        <Text color={colorMode == 'dark' ? "white" : 'purple.600'} fontSize="sm" textAlign="center">
                            {description || 'No description available.'}
                        </Text>
                        <Text color="purple.600" fontSize="3xl" textAlign="center" >
                            ${price || '0.00'}
                        </Text>
                        <Button
                            // borderTop={'1px solid white'}
                            bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
                            color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
                            size="xl"
                            variant="outline"
                            py={5}
                            width="full"
                            _hover={{
                                bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
                                color: colorMode === "light" ? 'white' : "#9f7aea",
                            }}
                            onClick={handelAddToCart}
                        >
                            Add To Cart
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
}
