// imports
import { useState } from 'react'
import { Product } from '../../types/types'
import styled from 'styled-components'

import ProductImage from '../atoms/ProductImage'
import ProductInfoBtn from '../atoms/ProductInfoBtn'
import ProductSearchBtn from '../atoms/ProductSearchBtn'
import ThumbnailGallery from '../molecules/ThumbnailGalery'

interface ProductCardProps {
    product: Product;
    onInfoClick: () => void
    onSearchClick: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onInfoClick, onSearchClick }) => {
    const GSizeQuantity = product.skus.find(sku => sku.size === 'G')?.min_quantity ?? 0
    const GGSizeQuantity = product.skus.find(sku => sku.size === 'GG')?.min_quantity ?? 0
    const MSizeQuantity = product.skus.find(sku => sku.size === 'M')?.min_quantity ?? 0
    const PSizeQuantity = product.skus.find(sku => sku.size === 'P')?.min_quantity ?? 0

    const PackQuantity = GSizeQuantity + GGSizeQuantity + MSizeQuantity + PSizeQuantity;

    const [currentImage, setCurrentImage] = useState<string>(product.images[0]?.path || '')

    const handleImageClick = (imagePath: string) => {
        setCurrentImage(imagePath)
    };

    return (
        <ProductCardWrapper>
            {/* Imagem principal do produto */}
            {product.images.length > 0 && (
                <ProductImage src={currentImage} alt={product.name} />
            )}

            {/* Renderizando as miniaturas com o ThumbnailGallery */}
            <ThumbnailGallery
                images={product.images}
                currentImage={currentImage}
                onImageClick={handleImageClick}
            />

            <ProductInfoBtn onClick={onInfoClick} />
            <ProductSearchBtn onClick={onSearchClick} />

            <p>{product.name}</p>
            <p>REF: {product.reference}</p>
            <p>R$ {product.price.toFixed(2)}</p>
            <p>G: {GSizeQuantity}</p>
            <p>GG: {GGSizeQuantity}</p>
            <p>M: {MSizeQuantity}</p>
            <p>P: {PSizeQuantity}</p>
            <p>PACK: {PackQuantity}</p>
        </ProductCardWrapper>
    )
}

export default ProductCard

const ProductCardWrapper = styled.div`
    z-index: 2
`