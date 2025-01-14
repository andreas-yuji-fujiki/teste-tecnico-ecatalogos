// imports
import styled from 'styled-components'
import ReturnSvg from '/images/return-btn-icon.svg'

interface ReturnButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// function
export default function ReturnButton({ onClick } : ReturnButtonProps) {
  return (
    <ReturnButtonWrapper onClick={onClick}>
        <img src={ReturnSvg} alt="Botão para voltar." />
    </ReturnButtonWrapper>
  )
}

// styles
const ReturnButtonWrapper = styled.button`
  display: flex;
`