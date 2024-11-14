import { Box, Button, Skeleton, SkeletonText, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";

function TableSkeleton({ rows = 5 }) {
  return (
    <TableContainer>
      <Table variant="simple">
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
          {Array.from({ length: rows }).map((_, index) => (
            <Tr key={index}>
              <Td><Skeleton height="20px" /></Td>
              <Td><SkeletonText noOfLines={1} width="100px" /></Td>
              <Td><SkeletonText noOfLines={2} width="150px" /></Td>
              <Td><Skeleton  height="40px" width="40px" /></Td>
              <Td isNumeric><Skeleton height="20px" width="60px" /></Td>
              <Td isNumeric><Skeleton height="20px" width="60px" /></Td>
              <Td><SkeletonText noOfLines={1} width="100px" /></Td>
              <Td>
                <Box display="flex" gap="8px">
                  <Skeleton height="32px" width="32px">
                    <Button size="sm"><AiOutlineEye /></Button>
                  </Skeleton>
                  <Skeleton height="32px" width="32px">
                    <Button size="sm"><BsTrash /></Button>
                  </Skeleton>
                  <Skeleton height="32px" width="32px">
                    <Button size="sm"><FiEdit2 /></Button>
                  </Skeleton>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableSkeleton;
