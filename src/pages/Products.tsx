import { Grid } from "@chakra-ui/react";
import { useAuthenticatedQuery } from "../hooks/useAuthenticatedQuery";
import ProductCard from "../components/ProductCard";
import { IProduct } from "../interfaces/interface";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

export default function Products() {

  const { isLoading, data, error } = useAuthenticatedQuery({ queryKey: ['products'], url: '/api/products?populate=*'})
  // console.log(data);

  if (isLoading) return <ProductCardSkeleton />
  if (error) return <p>{error.message}</p>

  return (
    <Grid templateColumns={'repeat(auto-fill,minmax(300px, 1fr))'} gap={6} margin={30} position={'relative'} top={'60px'} >
      {
        data.data.length ? data.data.map((productItem: IProduct) => <ProductCard key={productItem.id} product={productItem} />)
          : <h1>no products yet</h1>
      }
    </Grid>
  )
}

