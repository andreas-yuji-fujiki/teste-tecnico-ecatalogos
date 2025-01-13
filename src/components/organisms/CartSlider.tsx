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
    // use states
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductData | null>(null);

    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0); // active index
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

    // Contagem de itens por categoria
    const [categoryCounts, setCategoryCounts] = useState<Map<string, number>>(new Map());

    // swiper ref
    const swiperRef = useRef<SwiperType | null>(null);

    // fetching dumps
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/products.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ProductData = await response.json();
                setProducts(data);

                // Contagem de itens por categoria
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

    // Extraindo categorias dos produtos
    const categories = products ? Array.from(new Set(products.products.map(product => product.category))) : [];

    // Navegação entre as categorias com comportamento cíclico
    const navigateToCategory = (direction: 'prev' | 'next') => {
        if (!products || !swiperRef.current) return;

        const newIndex =
            direction === 'prev'
                ? (activeCategoryIndex - 1 + categories.length) % categories.length // Navegação cíclica para "Anterior"
                : (activeCategoryIndex + 1) % categories.length; // Navegação cíclica para "Próxima"

        if (newIndex !== activeCategoryIndex) {
            const newCategory = categories[newIndex];
            const firstItemIndex = products.products.findIndex(product => product.category === newCategory);

            if (firstItemIndex !== -1) {
                setActiveCategoryIndex(newIndex);
                swiperRef.current.slideTo(firstItemIndex);
            }
        }
    };

    // Atualizando a categoria atual e sua contagem
    const currentCategory = products ? products.products[activeSlideIndex]?.category : '';
    const currentCategoryCount = currentCategory ? categoryCounts.get(currentCategory) ?? 0 : 0;

    // Exibindo no formato desejado: (1) Botas
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
                    currentCategory={formattedCategoryDisplay} // Exibindo a categoria formatada
                    currentCategoryCount={currentCategoryCount} // Passando o número de itens
                />
            )}

            <StyledSwiper
                onSwiper={(swiperInstance: SwiperType) => {
                    swiperRef.current = swiperInstance;
                }}
                onSlideChange={(swiper: SwiperType) => {
                    setActiveSlideIndex(swiper.activeIndex);

                    if (products) {
                        const currentCategory = products.products[swiper.activeIndex]?.category;
                        const categoryIndex = categories.indexOf(currentCategory || '');
                        if (categoryIndex !== -1 && categoryIndex !== activeCategoryIndex) {
                            setActiveCategoryIndex(categoryIndex); // Sincroniza a categoria ativa
                        }
                    }
                }}
                spaceBetween={10}
                slidesPerView={1}
                modules={[Navigation, A11y]}
                pagination={{ clickable: true }}
                navigation
            >
                {products?.products.map(product => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </StyledSwiper>
        </>
    );
};

export default CartSlider;

// styles
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
