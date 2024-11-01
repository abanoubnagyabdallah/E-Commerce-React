import { Button, Card, CardBody, Heading, Image, Stack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/interface";

interface IProps {
    product: IProduct
}
export default function ProductCard({ product }: IProps) {
    const { colorMode } = useColorMode()
    // console.log(import.meta.env.VITE_SERVER_URL);
    // console.log(product.thumbnail.url);

    // const navigate=useNavigate()

    return (
        <Card bg={"none"} border={'1px solid #a8b5c8'} /* position={"relative"}*/ >
            <CardBody >
                <Image
                    src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`}
                    alt='Green double couch with wooden legs'
                    borderRadius='50%'
                    width={200}
                    height={200}
                    mx={'auto'}
                    objectFit={'cover'}
                />
                <Stack mt='6' spacing='3' >
                    <Heading size='md' color={colorMode=='light'?'purple.600': "white"} textAlign={'center'} p={3} mb={2}>{product.title}</Heading>
                    <Text color={colorMode=='light'?'purple.600': "white"} fontSize={'sm'} textAlign={'center'}> {product.description} </Text>
                    <Text color='purple.600' fontSize='3xl' textAlign={'center'}> ${product.price}</Text>
                    <Button
                        as={Link}
                        to={`/products/${product.id}`}
                        bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
                        color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
                        size={'xl'}
                        variant={"outline"}
                        border={"none"}
                        py={5}
                        overflow={'hidden'}
                        width={'full'}
                        _hover={{
                            bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
                            color: colorMode === "light" ? 'white' : "#9f7aea",
                            border: "transparent"
                        }}
                        // position={"absolute"}
                        // bottom={'10px'}
                        >
                        View Details
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    )
}
