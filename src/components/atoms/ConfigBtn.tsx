// imports
import styled from 'styled-components'

interface ConfigBtnProps{
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// function
export default function ConfigBtn( { onClick } : ConfigBtnProps) {
  return (
    <ConfigBtnWrapper onClick={onClick}>
        <span>
          F
        </span>
    </ConfigBtnWrapper>
  )
}

// styles
const ConfigBtnWrapper = styled.button`
    width: 24px;
    height: 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 700;

    color: #809caa;
    background-color: #fff;
    border-radius: 100%;
`