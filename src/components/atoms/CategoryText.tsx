// imports
import styled from 'styled-components'

interface CategoryTextProps {
    text: string
}

// function
export default function CategoryText( { text } : CategoryTextProps) {
  return (
    <CategoryTextWrapper>
        { text }
    </CategoryTextWrapper>
  )
}

// styles
const CategoryTextWrapper = styled.h3`
    padding: 3px 5px;
    
    color: #809caa;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;

    background-color: #fff;
    border-radius: 5px;
`