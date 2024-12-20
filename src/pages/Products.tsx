import { Grid } from "@chakra-ui/react";
import { useAuthenticatedQuery } from "../hooks/useAuthenticatedQuery";
import ProductCard from "../components/ProductCard";
import { IProduct } from "../interfaces/interface";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import cookieService from "../services/cookieService";
// import { filterUniqueProductsByName } from "../utils/functions";
// import { setUserImage } from "../app/features/userImageSlice";
// import { useDispatch } from "react-redux";

export default function Products() {
  // const dispatch = useDispatch()
  const { isLoading, data, error } = useAuthenticatedQuery({
    queryKey: ['products'],
    url: '/api/products?pagination[pageSize]=7&pagination[page]=1&populate=*',
    config: {
      headers: {
        Authorization: `Bearer ${cookieService.get("jwt")}`
      }
    }
  });

  if (isLoading) return <ProductCardSkeleton />;
  if (error) return <p>{error.message}</p>;

  // const uniqueProducts = data?.products ? filterUniqueProductsByName(data.products) : [];

  console.log(data);

  // dispatch(setUserImage(data.profileImage.formats.thumbnail.url))
  return (
    <Grid
      templateColumns={'repeat(auto-fill,minmax(300px, 1fr))'}
      gap={6}
      margin={30}
      position={'relative'}
      top={'60px'}
    >
      {
        data.data ? data.data.map((productItem: IProduct) => (
          <ProductCard key={productItem.id} product={productItem} />
        )) : (
          <h1>No products yet</h1>
        )
      }
    </Grid>
  );
}
