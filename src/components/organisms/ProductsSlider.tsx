import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

// swiper
import { Navigation, A11y } from 'swiper/modules'
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// components
import AppHeader from './AppHeader'
import ProductCard from './ProductCard'
import ProductInfoCard from '../molecules/ProductInfoCard'

import SearchCard from '../molecules/SearchCard'

// types
import { Product, ProductData } from '../../types/types'

const ProductsSlider: React.FC = () => {
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<ProductData | null>(null)
    const [searchRef, setSearchRef] = useState<string>('')

    const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0)
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)

    const [categoryCounts, setCategoryCounts] = useState<Map<string, number>>(new Map())
    const swiperRef = useRef<SwiperType | null>(null)

    // product info card state
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    // searchbox visibility state
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)

    // State to handle dynamic height
    const [sliderHeight, setSliderHeight] = useState<number>(0)

    const showProductInfo = (product: Product) => {
        setSelectedProduct(product)
    }

    const hideProductInfo = () => {
        setSelectedProduct(null)
    }

    const showSearchBox = () => {
        setIsSearchVisible(true)
    }

    const hideSearchBox = () => {
        setIsSearchVisible(false)
    }

    const handleSearch = () => {
        if (products && searchRef) {
            const searchRefString = String(searchRef)

            const productIndex = products.products.findIndex((product) => {
                return String(product.reference) === searchRefString
            })

            if (productIndex !== -1) {
                swiperRef.current?.slideTo(productIndex)
                hideSearchBox()
            } else {
                alert('Produto não encontrado!')
            }
        }
    }

    useEffect(() => {
        // Set dynamic height for the slider based on window height minus the header height
        const updateHeight = () => {
            const headerHeight = 45
            setSliderHeight(window.innerHeight - headerHeight)
        }

        // Initial height setup
        updateHeight()

        // Listen for window resize
        window.addEventListener('resize', updateHeight)

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', updateHeight)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/products.json')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data: ProductData = await response.json()
                setProducts(data)

                const counts = new Map<string, number>()
                data.products.forEach((product) => {
                    counts.set(product.category, (counts.get(product.category) || 0) + 1)
                })
                setCategoryCounts(counts)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('Erro desconhecido!')
                }
            }
        }
        fetchData()
    }, [])

    const categories = products ? Array.from(new Set(products.products.map((product) => product.category))) : []

    const navigateToCategory = (direction: 'prev' | 'next') => {
        if (!products || !swiperRef.current) return

        const newIndex =
            direction === 'prev'
                ? (activeCategoryIndex - 1 + categories.length) % categories.length
                : (activeCategoryIndex + 1) % categories.length

        if (newIndex !== activeCategoryIndex) {
            const newCategory = categories[newIndex]
            const firstItemIndex = products.products.findIndex((product) => product.category === newCategory)

            if (firstItemIndex !== -1) {
                setActiveCategoryIndex(newIndex)
                swiperRef.current.slideTo(firstItemIndex)
            }
        }
    }

    const currentCategory = products ? products.products[activeSlideIndex]?.category : ''
    const currentCategoryCount = currentCategory ? categoryCounts.get(currentCategory) ?? 0 : 0
    const formattedCategoryDisplay = currentCategory ? `(${currentCategoryCount}) ${currentCategory}` : ''

    return (
        <ProductsSliderWrapper style={{ height: `${sliderHeight}px` }}>
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
                onSwiper={(swiperInstance: SwiperType) => {
                    swiperRef.current = swiperInstance
                }}
                onSlideChange={(swiper: SwiperType) => {
                    setActiveSlideIndex(swiper.activeIndex)

                    if (products) {
                        const currentCategory = products.products[swiper.activeIndex]?.category
                        const categoryIndex = categories.indexOf(currentCategory || '')
                        if (categoryIndex !== -1 && categoryIndex !== activeCategoryIndex) {
                            setActiveCategoryIndex(categoryIndex)
                        }
                    }
                }}
                spaceBetween={1200}
                slidesPerView={1}
                speed={300}
                touchRatio={1.5}
                freeMode={false}
                modules={[Navigation, A11y]}
                pagination={{ clickable: true }}
                navigation
            >
                {products?.products.map((product) => (
                    <StyledSlide key={product.id}>
                        <ProductCard
                            product={product}
                            onInfoClick={() => showProductInfo(product)}
                            onSearchClick={showSearchBox}
                        />
                    </StyledSlide>
                ))}
            </StyledSwiper>

            {selectedProduct && <ProductInfoCard product={selectedProduct} onClose={hideProductInfo} />}

            {isSearchVisible && (
                <SearchCard
                    searchRef={searchRef}
                    setSearchRef={setSearchRef}
                    onSearch={handleSearch}
                    onClose={hideSearchBox}
                />
            )}
        </ProductsSliderWrapper>
    )
}

export default ProductsSlider

const ProductsSliderWrapper = styled.div``

const StyledSlide = styled(SwiperSlide)`
    position: relative;
    z-index: 1;
`

const StyledSwiper = styled(SwiperComponent)`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;

    display: block;

    .swiper-button-next,
    .swiper-button-prev {
        width: 28px;
        height: 28px;
        overflow: hidden;

        color: #809caa;
        background-color: #809caa;
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
`
