// imports
import styled from 'styled-components'

interface OptionsBtnProps{
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// function
export default function ProductInfoBtn({ onClick }: OptionsBtnProps) {
  return (
    <ProductInfoBtnWrapper onClick={onClick}>
        <img src="/images/info-btn-icon.svg" alt="Informações do produto" />
    </ProductInfoBtnWrapper>
  )
}

// styles
const ProductInfoBtnWrapper = styled.button`
  display: flex;
  width: 35px;
  height: 35px;

  img{
    width: 100%;
  }
`
