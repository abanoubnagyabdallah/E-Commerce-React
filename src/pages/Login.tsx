import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormHelperText,
    Link,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { selectLogin, userLogin } from '../app/features/LoginSlice';
// import { AppDispatch } from '../app/store';
import { axiosInstance } from '../config/axios.config';
import { createStandaloneToast } from '@chakra-ui/react'
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import cookieService from '../services/cookieService';
// import { Navigate } from 'react-router-dom';

const { toast } = createStandaloneToast()

interface IUserLogin {
    identifier: string;
    password: string;
}

interface IErrors {
    error: {
        message: string
    }
}


export default function Login() {
    // ============== start state ==============
    
    const [user, setUser] = useState<IUserLogin>({ identifier: "", password: "" })
    const [isIdentifier, setIsIdentifier] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    const navigate = useNavigate()

    // const [showPassword, setShowPassword] = useState<boolean>(false)
    // const dispatch: AppDispatch = useDispatch()
    // const { loading, data, error } = useSelector(selectLogin)
    // ============== end state ==============

    // ============== start handel ==============
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setUser({ ...user, [name]: value })
    }

    const clickSubmit = async () => {
        console.log(user);
        if (!user.identifier && !user.password) {
            setIsIdentifier(true)
            setIsPassword(true)
            return;
        }
        if (!user.identifier) {
            setIsIdentifier(true)
            return;
        }
        if (!user.password) {
            setIsPassword(true)
            return
        }
        setIsIdentifier(false)
        setIsPassword(false)
        // dispatch(userLogin(user))
        // console.log(data,error);
        try {
            const response = await axiosInstance.post(`/api/auth/local`, user)
            toast({
                title: 'Logged in Successfully',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            
            const date = new Date()
            const expiresAt = 1000 * 60 * 60 * 24 * 5
            date.setTime(date.getTime() + expiresAt)
            cookieService.set('jwt', response.data.jwt, { path: '/', expires: date })

            setTimeout(() => {
                navigate('/products')
            }, 1000);

        } catch (error) {
            const errorObject = error as AxiosError<IErrors>
            toast({
                title: errorObject?.response?.data?.error?.message || "Something went wrong",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }


    // ============== end handel ==============


    return (
        <Flex
            minH={'80vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="identifier">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name='identifier' value={user.identifier} onChange={onChangeHandler} isInvalid={isIdentifier} />
                            {isIdentifier ? <FormHelperText color={'red.500'}>email is required</FormHelperText> : null}
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name='password' value={user.password} onChange={onChangeHandler} isInvalid={isPassword} />
                            {isPassword ? <FormHelperText color={'red.500'}>password is required</FormHelperText> : null}
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'blue.400'}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={isIdentifier && isPassword ? 'red.500' : 'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: isIdentifier && isPassword ? 'red.500' : 'blue.400',
                                }}
                                onClick={clickSubmit}
                            // isLoading={loading}
                            >
                                Sign in
                            </Button>
                            <Text align={'center'}>
                                Don't have an account? <Link color={'blue.400'} onClick={() => { navigate('/register') }}>Register</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
