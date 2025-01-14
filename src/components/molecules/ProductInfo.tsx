// imports
import styled from 'styled-components'

import { Product } from '../../types/types'

interface ProductInfoProps {
    product: Product
}

// function
export default function ProductInfo( { product } : ProductInfoProps) {
  return (
    <ProductInfoWrapper>
        <ProductTitle>{product.name}</ProductTitle>

        <InfoText>
            <InfoSpan>Ref:</InfoSpan> {product.reference}
        </InfoText>

        <InfoText>
            <InfoSpan>R$</InfoSpan> {product.price.toFixed(2)}
        </InfoText>
    </ProductInfoWrapper>
  )
}

// styles
const ProductInfoWrapper = styled.div`
    width: 95%;
    height: 55px;
    margin: 10px auto 0 auto;
    
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 22px;

    border-top: 1.5px solid lightgray;
`

const ProductTitle = styled.h2`
    font-size: 2vh;
    font-weight: 450;
`

const InfoSpan = styled.span`
    text-transform: uppercase;
    color: #024650;
`

const InfoText = styled.span`
    font-size: 2vh;
`