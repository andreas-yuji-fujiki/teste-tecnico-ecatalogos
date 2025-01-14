import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/types';
import styled from 'styled-components';
import ProductImage from '../atoms/ProductImage';
import ThumbnailGallery from '../molecules/ThumbnailGalery';
import ProductInfoBtn from '../atoms/ProductInfoBtn';
import ProductSearchBtn from '../atoms/ProductSearchBtn';
import CartButton from '../atoms/CartButton';
import ProductInfo from '../molecules/ProductInfo';
import ItemValues from '../molecules/ItemValues'
import PackInfo from '../molecules/PackInfo';

interface ProductCardProps {
    product: Product;
    onInfoClick: () => void;
    onSearchClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onInfoClick, onSearchClick }) => {
    const { cartValue, setCartValue } = useCart(); // Contexto do carrinho
    const GSizeQuantity = product.skus.find(sku => sku.size === 'G')?.min_quantity ?? 0;
    const GGSizeQuantity = product.skus.find(sku => sku.size === 'GG')?.min_quantity ?? 0;
    const MSizeQuantity = product.skus.find(sku => sku.size === 'M')?.min_quantity ?? 0;
    const PSizeQuantity = product.skus.find(sku => sku.size === 'P')?.min_quantity ?? 0;

    const PackQuantity = GSizeQuantity + GGSizeQuantity + MSizeQuantity + PSizeQuantity;
    const PackValue = PackQuantity * product.price;

    const [addedQuantity, setAddedQuantity] = useState<number>(0); // Quantidade atual adicionada do produto
    const [currentImage, setCurrentImage] = useState<string>(product.images[0]?.path || '');

    const handleAdd = () => {
        setAddedQuantity(prev => prev + 1);
    
        if (PackQuantity === 0) {
            setCartValue(prev => prev + product.price); // Adiciona o valor de product.price se PackQuantity for 0
        } else {
            setCartValue(prev => prev + PackValue); // Caso contrário, adiciona o valor de PackValue
        }
    };
    
    const handleRemove = () => {
        if (addedQuantity > 0) {
            setAddedQuantity(prev => prev - 1);
    
            if (PackQuantity === 0) {
                setCartValue(prev => prev - product.price); // Subtrai product.price se PackQuantity for 0
            } else {
                setCartValue(prev => prev - PackValue); // Caso contrário, subtrai PackValue
            }
        }
    };

    return (
        <ProductCardWrapper>
            {/* main image */}
            {product.images.length > 0 && (
                <ProductImage src={currentImage} alt={product.name} />
            )}

            <ProductDataWrapper>
                {/* item buttons */}
                <ProductButtonsWrapper>
                    <ProductInfoBtn onClick={onInfoClick} />
                    <ProductSearchBtn onClick={onSearchClick} />

                    <ThumbnailGallery
                        images={product.images}
                        currentImage={currentImage}
                        onImageClick={setCurrentImage}
                    />

                    <CartButton/>
                </ProductButtonsWrapper>

                {/* product data */}
                <ProductInfo product={product}/>

                {/* item values (curremt, acumulated) */}
                <ItemValues
                    addedQuantity={addedQuantity}
                    cartValue={cartValue}
                    PackValue={PackQuantity === 0 ? product.price : PackValue}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />

                {/* pack quantity info */}
                {PackQuantity === 0 ? null : <PackInfo product={product} />}
            </ProductDataWrapper>
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

const ProductDataWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`

const ProductButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding-top: 10px;
    border-top: 3px solid #809caa;
`