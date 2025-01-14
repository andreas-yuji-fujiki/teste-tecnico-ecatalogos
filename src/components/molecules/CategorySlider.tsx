// imports
import styled from 'styled-components'
import CategoryBtn from '../atoms/CategoryBtn'
import CategoryText from '../atoms/CategoryText'

interface CategorySliderProps {
    onPrev: () => void;
    onNext: () => void;
    currentCategory: string;
}

// function
export default function CategorySlider({ onPrev, onNext, currentCategory }: CategorySliderProps) {
    return (
        <CategorySliderWrapper>
            <CategoryBtn goTo='prev' onClick={onPrev} />
              <CategoryText text={currentCategory} /> {/* shows current category */}
            <CategoryBtn goTo='next' onClick={onNext} />
        </CategorySliderWrapper>
    )
}

// styles
const CategorySliderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
`
