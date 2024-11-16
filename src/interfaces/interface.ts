
export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    categories: { title: string; }[];
    thumbnail: {
        url: string
    }
}

export interface IProductToEdit {
    title: string;
    description: string;
    price: number;
    stock: number;
    thumbnail: string;
}

export interface IUserResponse {
    id: number;
    username: string;
    email: string;
    products: IProduct[];
}