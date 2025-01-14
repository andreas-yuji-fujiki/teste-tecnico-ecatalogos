// imports
import styled from 'styled-components'
import { Product } from '../../types/types'

interface ProductInfoCardProps {
  product: Product;
  onClose: () => void; // close modal function
}

// function
export default function ProductInfoCard({ product, onClose }: ProductInfoCardProps) {
  return (
    <ProductInfoCardWrapper onClick={onClose}>
      <InfoCard onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <p><strong>Nome do produto:</strong> {product.name}</p>
        <p><strong>Referência:</strong> {product.reference}</p>
        <p><strong>Marca:</strong> {product.brand}</p>
        <p><strong>Categoria:</strong> {product.category}</p>
        <p><strong>Gênero:</strong> {product.gender}</p>
      </InfoCard>
    </ProductInfoCardWrapper>
  )
}


// styles
const ProductInfoCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`

const InfoCard = styled.div`
  background-color: white;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #f00;
  }
`
