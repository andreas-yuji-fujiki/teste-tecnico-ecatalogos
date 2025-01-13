import { Product } from '../../types/types'

import ProductImage from '../atoms/ProductImage';
interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const GSizeQuantity = product.skus.find(sku => sku.size === 'G')?.min_quantity ?? 0
    const GGSizeQuantity = product.skus.find(sku => sku.size === 'GG')?.min_quantity ?? 0
    const MSizeQuantity = product.skus.find(sku => sku.size === 'M')?.min_quantity ?? 0
    const PSizeQuantity = product.skus.find(sku => sku.size === 'P')?.min_quantity ?? 0

    const PackQuantity = GSizeQuantity + GGSizeQuantity + MSizeQuantity + PSizeQuantity
    
    return (
        <div className="product-card">
            {product.images.length > 0 && (
                <ProductImage src={product.images[0].path} alt={product.name} />
            )}

            <h2>{product.name}</h2>
            <p>R$ {product.price.toFixed(2)}</p>
            <p>REF: {product.reference}</p>
            <p>G: {GSizeQuantity}</p>
            <p>GG: {GGSizeQuantity}</p>
            <p>M: {MSizeQuantity}</p>
            <p>P: {PSizeQuantity}</p>
            <p>PACK: {PackQuantity}</p>
        </div>
    );
};

export default ProductCard;