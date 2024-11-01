
export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    category: {  title: string;};
    thumbnail: { url: string }
}