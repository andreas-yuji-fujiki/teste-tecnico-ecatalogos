// imports
import styled from 'styled-components'
import CartIconSvg from '/images/cart-btn-icon.svg'

// function
export default function CartButton() {
  function handleClick(){
    alert('Carrinho')
  }
  return (
    <CartButtonWrapper onClick={handleClick}>
        <img src={CartIconSvg} alt="Ir para o carrinho" />
    </CartButtonWrapper>
  )
}

// styles
const CartButtonWrapper = styled.button`
  display: flex;
  width: 35px;
  height: 35px;

  img{
    width: 100%;
  }
`