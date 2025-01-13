import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

// swiper
import { Navigation, A11y } from 'swiper/modules';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// components
import AppHeader from './AppHeader';
import ProductCard from './ProductCard';

// types
import { ProductData } from '../../types/types';

// function
const CartSlider: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductData | null>(null);

    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

    const [categoryCounts, setCategoryCounts] = useState<Map<string, number>>(new Map());
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/products.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ProductData = await response.json();
                setProducts(data);

                const counts = new Map<string, number>();
                data.products.forEach(product => {
                    counts.set(product.category, (counts.get(product.category) || 0) + 1);
                });
                setCategoryCounts(counts);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Erro desconhecido! ( X-X WTF?! )');
                }
            }
        };
        fetchData();
    }, []);

    const categories = products ? Array.from(new Set(products.products.map(product => product.category))) : [];

    const navigateToCategory = (direction: 'prev' | 'next') => {
        if (!products || !swiperRef.current) return;

        const newIndex =
            direction === 'prev'
                ? (activeCategoryIndex - 1 + categories.length) % categories.length 
                : (activeCategoryIndex + 1) % categories.length;

        if (newIndex !== activeCategoryIndex) {
            const newCategory = categories[newIndex];
            const firstItemIndex = products.products.findIndex(product => product.category === newCategory);

            if (firstItemIndex !== -1) {
                setActiveCategoryIndex(newIndex);
                swiperRef.current.slideTo(firstItemIndex);
            }
        }
    };

    const currentCategory = products ? products.products[activeSlideIndex]?.category : '';
    const currentCategoryCount = currentCategory ? categoryCounts.get(currentCategory) ?? 0 : 0;
    const formattedCategoryDisplay = currentCategory ? `(${currentCategoryCount}) ${currentCategory}` : '';

    return (
        <>
            {error && <p>Error: {error}</p>}

            {products && (
                <AppHeader
                    onReturnClick={() => alert('Retornar')}
                    onConfigClick={() => alert('Configurações')}
                    onPrev={() => navigateToCategory('prev')}
                    onNext={() => navigateToCategory('next')}
                    currentCategory={formattedCategoryDisplay} 
                    currentCategoryCount={currentCategoryCount}
                />
            )}

            <StyledSwiper
                lazy={true}
                preloadImages={false} // Desabilita o carregamento automático de imagens
                onSwiper={(swiperInstance: SwiperType) => {
                    swiperRef.current = swiperInstance;
                }}
                onSlideChange={(swiper: SwiperType) => {
                    setActiveSlideIndex(swiper.activeIndex);

                    if (products) {
                        const currentCategory = products.products[swiper.activeIndex]?.category;
                        const categoryIndex = categories.indexOf(currentCategory || '');
                        if (categoryIndex !== -1 && categoryIndex !== activeCategoryIndex) {
                            setActiveCategoryIndex(categoryIndex);
                        }
                    }
                }}
                spaceBetween={10}
                slidesPerView={1}
                modules={[Navigation, A11y]}
                pagination={{ clickable: true }}
                navigation
            >
                {products?.products.map((product, index) => (
                    <SwiperSlide key={product.id}>
                        {/* Renderiza o ProductCard apenas quando o slide for ativo ou os próximos 2 */}
                        {index >= activeSlideIndex - 1 && index <= activeSlideIndex + 1 ? (
                            <ProductCard product={product} />
                        ) : null}
                    </SwiperSlide>
                ))}
            </StyledSwiper>
        </>
    );
};

export default CartSlider;

const StyledSwiper = styled(SwiperComponent)`
    width: 100%;
    height: 100%;

    .swiper-button-next,
    .swiper-button-prev {
        width: 28px;
        height: 28px;
        overflow: hidden;
        padding: 10px;
        color: #809CAA;
        background-color: #809CAA;
        border-radius: 100%;
    }

    .swiper-button-next::after,
    .swiper-button-prev::after {
        content: '';
        width: 28px;
        height: 28px;
        border-radius: 100%;
        position: absolute;
        background-image: url('/images/swiper-btn-icon.svg');
    }

    .swiper-button-prev::after {
        transform: rotate(180deg);
    }
`;
