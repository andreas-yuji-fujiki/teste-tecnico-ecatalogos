// imports
import React, { useState } from 'react'
import styled from 'styled-components'

interface ProductSearchCardProps {
    onClose: () => void;
}

// function
const ProductSearchCard: React.FC<ProductSearchCardProps> = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    };

    return (
        <SearchCardWrapper>
            <SearchCardContent>
                <h2>Pesquisar Produto</h2>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Digite o nome do produto"
                />
                <button onClick={onClose}>Fechar</button>
            </SearchCardContent>
        </SearchCardWrapper>
    )
}
export default ProductSearchCard


// styles
const SearchCardWrapper = styled.div`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
`

const SearchCardContent = styled.div`
    background-color: white;
    width: 400px;
    margin: 20% auto;
    padding: 20px;
    border-radius: 8px;
    text-align: center;

    h2 {
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 10px 20px;
        background-color: #809caa;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`
