// imports
import React from 'react';
import styled from 'styled-components';
import Thumbnail from '../atoms/Thumbnail';

interface Image {
    id: number
    path: string
}

interface ThumbnailGalleryProps {
    images: Image[];
    currentImage: string;
    onImageClick: (imagePath: string) => void;
}

// function
const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({ images, currentImage, onImageClick }) => {
    return (
        <StyledImageGallery>
            {images.map(image => (
                <Thumbnail
                    key={image.id}
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
`
