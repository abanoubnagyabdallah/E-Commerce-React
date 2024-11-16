import { ReactNode, useEffect, useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { BsWifiOff } from "react-icons/bs";

export default function InternetConnectionProvider({ children }: { children: ReactNode }) {
    const toast = useToast()
    const toastIdRef = useRef<string | number | undefined>(undefined);
    const [isOnline, setIsOnline] = useState<boolean>(true)

    function addToast() {
        toastIdRef.current = toast({
            title: "You'r offline",
            description: "please sure you have internet connection",
            status: "warning",
            duration: null,
            isClosable: true,
            icon: <BsWifiOff />
        })
    }

    function close() {
        if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
            toast.close(toastIdRef.current);
        }
    }

    const setOnLine = () => {
        setIsOnline(true)
        close()
    }

    const setOffline = () => {
        setIsOnline(false)
    }

    useEffect(() => {
        window.addEventListener("online", setOnLine)
        window.addEventListener("offline", setOffline)
        return () => {
            // cleanup
            window.removeEventListener("online", setOnLine)
            window.removeEventListener("offline", setOffline)
        }
    }, [])

    if (!isOnline) return <>
        {children}
        {addToast()}
    </>

    return children
}
