// imports
import styled from 'styled-components';
import ReturnButton from '../atoms/ReturnButton';
import CategorySlider from '../molecules/CategorySlider'; // Importando CategorySlider
import ConfigBtn from '../atoms/ConfigBtn';

interface AppHeaderProps {
    onReturnClick?: () => void; // Função opcional para o botão de retorno
    onConfigClick?: () => void; // Função opcional para o botão de configuração
    onPrev: () => void; // Função para ação do botão "anterior"
    onNext: () => void; // Função para ação do botão "próximo"
    currentCategory: string; // Categoria atual do produto
}

// function
export default function AppHeader({ 
    onReturnClick, 
    onConfigClick, 
    onPrev, 
    onNext, 
    currentCategory 
}: AppHeaderProps) {
    return (
        <AppHeaderWrapper>
            <ReturnButton onClick={onReturnClick || (() => alert('Clicou.'))} />
            <CategorySlider 
                onPrev={onPrev} 
                onNext={onNext} 
                currentCategory={currentCategory} 
            />
            <ConfigBtn onClick={onConfigClick || (() => alert('Clicou.'))} />
        </AppHeaderWrapper>
    );
}

// styles
const AppHeaderWrapper = styled.header`
    padding: 9px 26px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    background-color: #809caa;
`;
