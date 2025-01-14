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
    object-fit: contain;
    width: 90%;
    max-height: 69dvh;
    height: 100%;

    @media (max-height: 945px){
      max-height: 65dvh;
    }

    @media (max-height: 930px){
      max-height: 50dvh;
    }

    @media (max-width: 375px){
      max-width: 30dvh;
    }
    
    @media(max-width: 350px){
      max-height: 45dvh;
    }
`