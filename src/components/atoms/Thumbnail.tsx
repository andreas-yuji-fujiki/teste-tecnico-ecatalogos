// imports:
import styled from 'styled-components'

interface ThumbnailProps {
    src: string;
    alt: string;
    onClick: () => void;
    isSelected: boolean;
}

// function:
const Thumbnail: React.FC<ThumbnailProps> = ({ src, alt, onClick, isSelected }) => {
    return (
        <StyledThumbnail 
            src={src} 
            alt={alt} 
            onClick={onClick} 
            $isSelected={isSelected}
        />
    )
}
export default Thumbnail;

// styles
const StyledThumbnail = styled.img<{ $isSelected: boolean }>`
    width: 44px;
    height: 44px;
    object-fit: contain;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border 0.3s;

    &:hover {
        border: 1px solid #5da0ad;
    }

    ${({ $isSelected }) =>
        $isSelected &&
        `
        border: 1px solid #5da0ad;
    `}
`
