import { useState } from 'react';
import { Product } from '../../types/types';
import styled from 'styled-components';
import ProductImage from '../atoms/ProductImage';

interface ProductCardProps {
    product: Product;
    onInfoClick: () => void;
    onSearchClick: () => void;
    currentImage: string; // Adiciona a prop currentImage
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onInfoClick, onSearchClick, currentImage }) => {
    return (
        <ProductCardWrapper>
            {/* main image */}
            <MainImageWrapper>
                {product.images.length > 0 && (
                    <ProductImage src={currentImage} alt={product.name} />
                )}
            </MainImageWrapper>
        </ProductCardWrapper>
    );
};

export default ProductCard;

// styles
const ProductCardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const MainImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 69dvh;
    width: 100%;
    max-height: 69dvh;

    @media(max-width: 414px){
        align-items: flex-start;
    }
`
