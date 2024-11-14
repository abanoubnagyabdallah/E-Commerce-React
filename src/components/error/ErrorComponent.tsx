import { Box, VStack, Icon, Text, Heading, Button, HStack } from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

interface IErrorComponentProps {
  statusCode?: number;
  title?: string;
}

export const ErrorComponent = ({ statusCode = 500, title = "An unexpected error occurred" }: IErrorComponentProps) => {
  const { pathname } = useLocation();

  return (
    <Box position="fixed" inset={0} display="flex" alignItems="center" justifyContent="center" p={5} w="full">
      <VStack spacing={5} textAlign="center">
        <Box bg="red.100" p={4} borderRadius="full">
          <Box bg="red.200" p={4} borderRadius="full">
            <Icon as={FiAlertTriangle} w={16} h={16} color="red.600" />
          </Box>
        </Box>
        
        <Heading as="h2" fontSize={{ base: "3xl", lg: "5xl" }} fontWeight="bold">
          {statusCode} - {title}
        </Heading>
        
        <Text fontSize={{ base: "md", lg: "lg" }}>
          Oops, something went wrong. Try refreshing this page or contact support if the issue persists.
        </Text>

        <HStack spacing={4} my={6}>
          <Button as={Link} to="/dashboard/" colorScheme="purple">
            Home
          </Button>
          <Button as={Link} to={pathname} colorScheme="purple" reloadDocument>
            Refresh
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
