// imports
import styled from 'styled-components'

import categoryIconSvg from '/images/category-changer-btn-icon.svg'

interface CategoryBtnProps {
    goTo: 'prev' | 'next'
    onClick: (event: React.MouseEvent<HTMLImageElement>) => void
}

// function
export default function CategoryBtn( { goTo, onClick } : CategoryBtnProps ) {
  return (
    <CategoryBtnWrapper>
        <CategoryBtnIcon className={ goTo } src={categoryIconSvg} onClick={onClick} />
    </CategoryBtnWrapper>
  )
}

// styles
const CategoryBtnWrapper = styled.button`
  display: flex;
`

const CategoryBtnIcon = styled.img`
    &.next{
        transform: rotate(180deg);
    }
`