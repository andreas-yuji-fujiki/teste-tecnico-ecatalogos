import { Product } from '../../types/types'

import ProductImage from '../atoms/ProductImage';
interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            {product.images.length > 0 && (
                <ProductImage src={product.images[0].path} alt={product.name} />
            )}

            <h2>{product.name}</h2>
            <p>R$ {product.price.toFixed(2)}</p>
            <p>REF: {product.reference}</p>
        </div>
    );
};

export default ProductCard;