// imports
import styled from 'styled-components';
import CategoryBtn from '../atoms/CategoryBtn';
import CategoryText from '../atoms/CategoryText';

interface CategorySliderProps {
    onPrev: () => void; // Função para ação do botão "anterior"
    onNext: () => void; // Função para ação do botão "próximo"
    currentCategory: string; // Categoria atual do produto
}

// function
export default function CategorySlider({ onPrev, onNext, currentCategory }: CategorySliderProps) {
    return (
        <CategorySliderWrapper>
            <CategoryBtn goTo='prev' onClick={onPrev} />
              <CategoryText text={currentCategory} /> {/* Exibe a categoria atual */}
            <CategoryBtn goTo='next' onClick={onNext} />
        </CategorySliderWrapper>
    );
}

// styles
const CategorySliderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
`;
