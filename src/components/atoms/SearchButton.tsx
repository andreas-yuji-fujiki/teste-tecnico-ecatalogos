// imports
import styled from 'styled-components'

interface SearchButtonProps {
    children: any
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

// function
export default function SearchButton( { onClick, children } : SearchButtonProps ) {
  return (
    <SearchButtonWrapper onClick={onClick}>
        { children }
    </SearchButtonWrapper>
  )
}

// styles
const SearchButtonWrapper = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`