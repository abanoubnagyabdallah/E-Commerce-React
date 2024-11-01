import { Grid, Skeleton } from "@chakra-ui/react";


export default function ProductCardSkeleton() {
    return (
        <div>
            <Grid templateColumns={'repeat(auto-fill,minmax(300px, 1fr))'} gap={6} margin={30} >
                <Skeleton height='500px' borderRadius={'10px'} />
                <Skeleton height='500px' borderRadius={'10px'} />
                <Skeleton height='500px' borderRadius={'10px'} />
            </Grid>
        </div>
    )
}
