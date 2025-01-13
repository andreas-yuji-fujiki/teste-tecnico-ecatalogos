// imports
import styled from 'styled-components'

interface ProductImageProps{
    src: string
    alt: string
}

// function
export default function ProductImage( { src, alt } : ProductImageProps) {
  return (  
    <ProductImageWrapper src={src} alt={alt}/>
  )
}

// styles
const ProductImageWrapper = styled.img`
    width: 100%;
    object-fit: contain;
    max-height: 55dvh;
`