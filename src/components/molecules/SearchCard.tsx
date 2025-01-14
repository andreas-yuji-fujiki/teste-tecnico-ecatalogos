import React from 'react';
import SearchBoxInput from '../atoms/SearchBoxInput';
import SearchButton from '../atoms/SearchButton';
import styled from 'styled-components';

interface SearchCardProps {
    searchRef: string;
    setSearchRef: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
    onClose: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ searchRef, setSearchRef, onSearch, onClose }) => {
    return (
        <SearchCardWrapper onClick={onClose}>
            <SearchCardContent onClick={(e) => e.stopPropagation()}>
                <SearchHeader>
                    <SearchHeaderTitle>Buscar Produto</SearchHeaderTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </SearchHeader>
                <SearchBody>
                    <SearchBoxInput
                        value={searchRef}
                        onChange={(e) => setSearchRef(e.target.value)}
                        placeholder="Digite a referência (ex: 00.00.000)"
                    />
                    <SearchButton onClick={onSearch}>Buscar</SearchButton>
                </SearchBody>
            </SearchCardContent>
        </SearchCardWrapper>
    );
};

export default SearchCard;

// styles
const SearchCardWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchCardContent = styled.div`
    background-color: #fff;
    width: 90%;
    max-width: 400px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
`;

const SearchHeader = styled.header`
    background-color: #809caa;
    padding: 10px 15px;
    text-align: center;
`;

const SearchHeaderTitle = styled.h3`
    color: #fff;
    font-size: 18px;
    margin: 0;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 8px;
    right: 10px;
    background: none;
    border: none;
    color: #fff;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        color: #ff4d4d;
    }
`;

const SearchBody = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    button {
        margin-top: 10px;
    }
`;
