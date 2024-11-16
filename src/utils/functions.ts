import { createStandaloneToast } from '@chakra-ui/react'
import { IProduct } from '../interfaces/interface';

interface ICartItem extends IProduct {
    quantity: number;
}

const { toast } = createStandaloneToast()

export const AddItemToShoppingCart = (cartItem: ICartItem, shoppingCartItems: ICartItem[] = []) => {
    const exists = shoppingCartItems.find(item => item.id === cartItem.id)
    if (exists) {
        toast({
            title: "This product already exists in products cart",
            status: 'warning',
            duration: 5000,
            isClosable: true,
        })
        return [...shoppingCartItems]
        // return shoppingCartItems.map(item => item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item)
    }

    toast({
        title: "Added To Cart Successfully",
        status: 'success',
        duration: 5000,
        isClosable: true,
    })
    return [...shoppingCartItems, { ...cartItem, quantity: 1 }]
}

// export const filterUniqueProductsByName = (products: IProduct[]) => {
//     const seenNames = new Set();
//     return products.filter((product) => {
//         const isDuplicate = seenNames.has(product.title);
//         seenNames.add(product.title);
//         return !isDuplicate;
//     });
// };
