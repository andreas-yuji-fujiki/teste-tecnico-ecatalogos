// imports
import styled from 'styled-components'
import { Product } from '../../types/types'

import CloseIconSvg from '/images/close-btn-icon.svg'

interface ProductInfoCardProps {
  product: Product;
  onClose: () => void;
}

// function
export default function ProductInfoCard({ product, onClose }: ProductInfoCardProps) {
  return (
    <ProductInfoCardWrapper onClick={onClose}>
      <InfoCard onClick={(e) => e.stopPropagation()}>
        <InfoHeader>
          <InfoHeaderTitle>
            Informações
          </InfoHeaderTitle>
          <CloseButton onClick={onClose}>
            <img src={CloseIconSvg} alt="Fechar" />
          </CloseButton>
        </InfoHeader>

        <AboutProduct>
          <p><strong>Nome do produto:</strong> {product.name}</p>
          <p><strong>Referência:</strong> {product.reference}</p>
          <p><strong>Marca:</strong> {product.brand}</p>
          <p><strong>Categoria:</strong> {product.category}</p>
          <p><strong>Gênero:</strong> {product.gender}</p>
        </AboutProduct>
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
  position: relative;
  background-color: white;
  width: 90%;
  max-width: 500px;
`

const InfoHeader = styled.header`
  background-color: #809caa;
  padding: 8px 20px;
`
const InfoHeaderTitle = styled.h3`
  text-align: center;
  font-weight: 300;
  font-size: 20px;
  padding: 8px 0;
  color: #fff;
`

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #f00;
  }
`

const AboutProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`