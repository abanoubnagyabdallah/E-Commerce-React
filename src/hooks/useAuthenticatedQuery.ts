import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";

interface IProps {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig
}

export const useAuthenticatedQuery = ({ queryKey, url, config }: IProps) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const res = await axiosInstance.get(url, config)
            return res.data
        }
    })
}