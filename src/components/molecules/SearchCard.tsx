// SearchBox.tsx (Molécula)
import React from 'react';
import SearchBoxInput from '../atoms/SearchBoxInput';
import SearchButton from '../atoms/SearchButton';
import styled from 'styled-components';

interface SearchBoxProps {
    searchRef: string;
    setSearchRef: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchRef, setSearchRef, onSearch }) => {
    return (
        <SearchCardWrapper>
            <SearchBoxInput
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Digite o REF do produto..."
            />
            <SearchButton onClick={onSearch}>Buscar</SearchButton>
        </SearchCardWrapper>
    )
}

export default SearchBox;

const SearchCardWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background: #fff;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    margin: 20px auto;
`
