import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, createStandaloneToast, FormHelperText, } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { axiosInstance } from '../config/axios.config';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
const { toast } = createStandaloneToast()

interface IProps {
  username: string;
  email: string
  password: string
}
interface IErrors {
  error: {
    message: string
  }
}

export default function Register() {
  
  
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [registerData, setRegisterData] = useState<IProps>({ username: "", email: "", password: "" })
  const [isUserName, setIsUserName] = useState<boolean>(false)
  const [isEmail, setIsEmail] = useState<boolean>(false)
  const [isPassword, setIsPassword] = useState<boolean>(false)
  const navigate = useNavigate()


  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setRegisterData({ ...registerData, [name]: value })
  }

  const submitData = async () => {
    if (!registerData.username && !registerData.email && !registerData.password) {
      setIsUserName(true)
      setIsEmail(true)
      setIsPassword(true)
      return
    }
    if (!registerData.username) {
      setIsUserName(true)
      return
    }
    if (!registerData.email) {
      setIsEmail(true)
      return
    }
    if (!registerData.password) {
      setIsPassword(true)
      return
    }

    try {
      const { status } = await axiosInstance.post(`/api/auth/local/register`, registerData)
      if (status === 200) {
        toast({
          title: 'Successfully registered',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      setTimeout(() => {
        navigate('/login')
      }, 1000);
    }
    catch (error) {
      const errorObject = error as AxiosError<IErrors>
      toast({
        title: errorObject?.response?.data?.error?.message || "Something went wrong",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }


  return (
    <Flex
      minH={'60vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <FormControl id="firstName" isRequired>
                <FormLabel>User Name</FormLabel>
                <Input type="text" name='username' value={registerData.username} onChange={changeHandler} isInvalid={isUserName} />
                {isUserName ? <FormHelperText color={'red.500'}>Username is required</FormHelperText> : null}
              </FormControl>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name='email' value={registerData.email} onChange={changeHandler} isInvalid={isEmail} />
              {isEmail ? <FormHelperText color={'red.500'}>Email is required</FormHelperText> : null}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} name='password' value={registerData.password} onChange={changeHandler} isInvalid={isPassword} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword ? <FormHelperText color={'red.500'}>password is required</FormHelperText> : null}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={submitData}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={() => { navigate('/login') }}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}