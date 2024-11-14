import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { NavLink, useNavigate } from "react-router-dom";
import cookieService from '../services/cookieService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import CartDrawer from './CartDrawer';
import { useRef } from 'react';
import { onOpenCartDrawerAction } from '../app/features/globalSlice';



const Links: { title: string; tab: string }[] = [
  { title: 'Dashboard', tab: "/dashboard" },
  // { title: 'About', tab: 'about' },
  { title: 'Products', tab: "products" },
]

const Login_And_Register: { title: string; tab: string }[] = [
  { title: "Login", tab: "login" }, { title: "Register", tab: "register" }
]

export default function NavBar() {

  const { cartProducts } = useSelector((state: RootState) => state.cart)

  const token = cookieService.get('jwt')
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()

  const logoutHandel = () => {
    cookieService.remove('jwt')
    navigate('/login')
    window.location.reload()
  }

  const btnRef = useRef<HTMLButtonElement | null>(null)
  const dispatch = useDispatch()
  const handelOpenDrawer = () => dispatch(onOpenCartDrawerAction())

  const {userImage}=useSelector((state:RootState)=>state.image)
// console.log(userImage);

  return (
    <>
      <CartDrawer />
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position="fixed" top={0} left={0} right={0} zIndex={1}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <NavLink to={'/'}>
              E-Commerce
              {/* <Image src='https://i.pinimg.com/474x/15/96/e3/1596e3b738d6e32dbd700844ed062488.jpg' width={35} height={35} borderRadius={50} /> */}
            </NavLink>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink to={link.tab} key={link.title} >{link.title}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>

              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Button ref={btnRef} onClick={handelOpenDrawer}>
                Cart ({cartProducts.length})
              </Button>


              {
                token ?
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}>
                      <Avatar
                        size={'sm'}
                        // src={'https://avatars.dicebear.com/api/male/username.svg'}
                        src={`${import.meta.env.VITE_SERVER_URL}${userImage}`}
                      />
                    </MenuButton>
                    <MenuList alignItems={'center'}>
                      <br />
                      <Center>
                        <Avatar
                          size={'2xl'}
                          // src={'https://avatars.dicebear.com/api/male/username.svg'}
                          src={`${import.meta.env.VITE_SERVER_URL}${userImage}`}
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>Username</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem onClick={logoutHandel}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                  : <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                    {Login_And_Register.map((link) => (
                      <NavLink to={link.tab} key={link.title} >{link.title}</NavLink>
                    ))}
                  </HStack>
              }

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}