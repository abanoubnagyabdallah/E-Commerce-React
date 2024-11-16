import { Box, Button, FormControl, FormLabel, Image, Input, ModalFooter, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure, WrapItem } from "@chakra-ui/react";
import { useDeleteDashboardProductsMutation, useGetAdminDashboardProductsQuery, useUpdateDashboardProductsMutation } from "../app/services/apiSlice";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import CustomAlertDialog from "../shared/CustomAlertDialog";
import TableSkeleton from "./DashboardSkeleton";
import { ErrorComponent } from "./error/ErrorComponent";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import CustomModal from "../shared/CustomModal";
import { IProductToEdit } from "../interfaces/interface";

interface ApiError {
    status: number;
    message: string;
}

export default function DashboardProductsTable() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const [DeletedProductId, setDeletedProductId] = useState<number>(0);
    const [UpdateProductId, setupdateProductId] = useState<number>(0);
    const { isLoading, data, error } = useGetAdminDashboardProductsQuery(1);
    const [destroyProduct, { isLoading: isDestroyed, isSuccess }] = useDeleteDashboardProductsMutation();
    const [updateProduct, { isLoading: isUpdating, isSuccess: SuccessUpdate }] = useUpdateDashboardProductsMutation();
    const [productToEdit, setProductToEdit] = useState<IProductToEdit>({ title: "", description: "", price: 0, stock: 0, thumbnail: "" });
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    useEffect(() => {
        if (isSuccess) {
            setDeletedProductId(0);
            onClose();
        }
        if (SuccessUpdate) {
            setupdateProductId(0)
            onModalClose()
        }
    }, [isSuccess]);

    if (isLoading) return <TableSkeleton />;
    if (error) {
        if ("data" in error && error.data && typeof error.data === "object" && "error" in error.data) {
            const fetchError = error as { data: { error: ApiError } };
            return (
                <ErrorComponent
                    statusCode={fetchError.data.error.status || 500}
                    title={fetchError.data.error.message || "An unexpected error occurred"}
                />
            );
        } else {
            return <ErrorComponent statusCode={500} title="An unexpected error occurred" />;
        }
    }

    const handelDeleteProduct = async () => {
        await destroyProduct(DeletedProductId);
    };

    const handleChangeThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setThumbnail(files[0]);
        }
    };

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProductToEdit({ ...productToEdit, [name]: value });
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("data", JSON.stringify({
            title: productToEdit.title,
            description: productToEdit.description,
            price: productToEdit.price,
            stock: productToEdit.stock,
        }));

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        updateProduct({ id: UpdateProductId, body: formData });
    };

    return (
        <div>
            <WrapItem>
                <Button colorScheme='green'>Create</Button>
            </WrapItem>
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>TITLE</Th>
                            <Th>DESCRIPTION</Th>
                            <Th>IMAGE</Th>
                            <Th isNumeric>PRICE</Th>
                            <Th isNumeric>STOCK</Th>
                            <Th>CATEGORY</Th>
                            <Th>ACTION</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.data.map(row => (
                            <Tr key={row.id}>
                                <Td>{row.id}</Td>
                                <Td>{row.title}</Td>
                                <Td>{row.description}</Td>
                                <Td>
                                    <Image
                                        src={`${import.meta.env.VITE_SERVER_URL}${row.thumbnail.url}`}
                                        alt={row.title || "Product Image"}
                                        borderRadius="full"
                                        objectFit="cover"
                                        boxSize="40px"
                                    />
                                </Td>
                                <Td>{row.price}</Td>
                                <Td>{row.stock}</Td>
                                <Td>{row.categories[0].title}</Td>
                                <Td>
                                    <Button as={Link} to={`/products/${row.id}`} colorScheme="purple" variant="solid" mr={3}>
                                        <AiOutlineEye />
                                    </Button>
                                    <Button colorScheme="red" variant="solid" mr={3} onClick={() => {
                                        onOpen();
                                        setDeletedProductId(row.id);
                                    }}>
                                        <BsTrash />
                                    </Button>
                                    <Button colorScheme="blue" variant="solid" mr={3} onClick={() => {
                                        setProductToEdit({
                                            title: row.title,
                                            description: row.description,
                                            price: row.price,
                                            stock: row.stock,
                                            thumbnail: row.thumbnail.url,
                                        });
                                        onModalOpen();
                                        setupdateProductId(row.id);
                                    }}>
                                        <FiEdit2 />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot>Total: {data?.data.length}</Tfoot>
                </Table>
            </TableContainer>

            <CustomAlertDialog
                isloading={isDestroyed}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                dialogHeader="Are you sure?"
                dialogBody="Do you really want to delete this product? This action cannot be undone."
                deleteBtn="Delete"
                clickToDeleteProduct={handelDeleteProduct}
            />

            <CustomModal isOpen={isModalOpen} onClose={onModalClose} title="Update Product" >
                <Box as="form" onSubmit={handleFormSubmit}>
                    <FormControl mb={3}>
                        <FormLabel>Title</FormLabel>
                        <Input placeholder="Product Title" name="title" value={productToEdit.title} onChange={handleChangeEvent} />
                    </FormControl>

                    <FormControl my={3}>
                        <FormLabel>Description</FormLabel>
                        <Input placeholder="Product Description" name="description" value={productToEdit.description} onChange={handleChangeEvent} />
                    </FormControl>

                    <FormControl my={3}>
                        <FormLabel>Price</FormLabel>
                        <NumberInput defaultValue={productToEdit.price} precision={2} step={0.2}>
                            <NumberInputField name="price" onChange={handleChangeEvent} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl my={3}>
                        <FormLabel>Stock</FormLabel>
                        <NumberInput defaultValue={productToEdit.stock} precision={2} step={1}>
                            <NumberInputField name="stock" onChange={handleChangeEvent} />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Thumbnail</FormLabel>
                        <Input type="file" name="thumbnail" onChange={handleChangeThumbnail} />
                    </FormControl>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant={'ghost'} isLoading={isUpdating} >Update</Button>
                    </ModalFooter>
                </Box>
            </CustomModal>
        </div>
    );
}
