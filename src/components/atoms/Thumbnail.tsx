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
            isSelected={isSelected} 
        />
    )
}
export default Thumbnail;

// styles
const StyledThumbnail = styled.img<{ isSelected: boolean }>`
    width: 50px;
    height: 50px;
    object-fit: cover;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border 0.3s;

    &:hover {
        border: 2px solid #007bff;
    }

    ${({ isSelected }) =>
        isSelected &&
        `
        border: 2px solid #007bff;
    `}
`
