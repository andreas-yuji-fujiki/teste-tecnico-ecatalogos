import React from 'react';
import styled from 'styled-components';
import Thumbnail from '../atoms/Thumbnail';

interface Image {
    id: number; // Alterando para number
    path: string;
}

interface ThumbnailGalleryProps {
    images: Image[];
    currentImage: string;
    onImageClick: (imagePath: string) => void;
}

const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({ images, currentImage, onImageClick }) => {
    return (
        <StyledImageGallery>
            {images.map(image => (
                <Thumbnail
                    key={image.id} // Agora funciona com id do tipo number
                    src={image.path}
                    alt=""
                    onClick={() => onImageClick(image.path)}
                    isSelected={currentImage === image.path}
                />
            ))}
        </StyledImageGallery>
    )
}

export default ThumbnailGallery;

const StyledImageGallery = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
`
