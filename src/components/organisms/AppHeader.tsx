// imports
import styled from 'styled-components'

import ReturnButton from '../atoms/ReturnButton'
import CategorySlider from '../molecules/CategorySlider'
import ConfigBtn from '../atoms/ConfigBtn'

interface AppHeaderProps {
    onReturnClick: () => void;
    onConfigClick: () => void;
    onPrev: () => void;
    onNext: () => void;
    currentCategory: string;
    currentCategoryCount: number;
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
    )
}

// styles
const AppHeaderWrapper = styled.header`
    width: 100%;
    z-index: 1;
    padding: 9px 26px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    background-color: #809caa;
`
