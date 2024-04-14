'use client'
import { useAppStore } from "@/store";
import { MultipleProductCarousel } from ".";

const CompareProductCarousel = () => {
    const {compareProduct} = useAppStore();
    return ( 
        <MultipleProductCarousel products={compareProduct} isCompareProduct={true}/>
     );
}
 
export default CompareProductCarousel;