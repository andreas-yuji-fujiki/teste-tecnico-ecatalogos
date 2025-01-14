// imports
import styled from 'styled-components'

import CartSlider from '../components/organisms/ProductsSlider'

// function
export default function ProductPage() {
  return (
    <ProductPageWrapper>
        <CartSlider/>
    </ProductPageWrapper>
  )
}

// styles
const ProductPageWrapper = styled.div`
    position: relative;
    z-index: 1;
    width: 600px;
    height: 100dvh;
    max-height: 100vh;
    
    margin: 0 auto;
    border: 2px solid #000;
    border-top: none;
    border-bottom: none;
`