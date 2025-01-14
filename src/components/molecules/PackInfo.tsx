// imports
import styled from 'styled-components';
import { Product } from '../../types/types';

interface PackInfoProps {
    product: Product
}

// function
export default function PackInfo( { product } : PackInfoProps ) {

    // quantity values
    const GSizeQuantity = product.skus.find(sku => sku.size === 'G')?.min_quantity ?? 0
    const GGSizeQuantity = product.skus.find(sku => sku.size === 'GG')?.min_quantity ?? 0
    const MSizeQuantity = product.skus.find(sku => sku.size === 'M')?.min_quantity ?? 0
    const PSizeQuantity = product.skus.find(sku => sku.size === 'P')?.min_quantity ?? 0

    const PackQuantity = GSizeQuantity + GGSizeQuantity + MSizeQuantity + PSizeQuantity;

    return (
        <PackInfoWrapper>
            <PackFlag>
                <PackSpan>
                    G
                </PackSpan> 
                {GSizeQuantity}
            </PackFlag>
            <PackFlag>
                <PackSpan>
                    GG
                </PackSpan> 
                {GGSizeQuantity}
            </PackFlag>
            <PackFlag>
                <PackSpan>
                    M
                </PackSpan> 
                {MSizeQuantity}
            </PackFlag>
            <PackFlag>
                <PackSpan>
                    P
                </PackSpan> 
                {PSizeQuantity}
            </PackFlag>

            <TotalPackFlag>
                <TotalPackSpan>
                    Pack
                </TotalPackSpan> 
                {PackQuantity}
            </TotalPackFlag>
        </PackInfoWrapper>
    )
}

const PackInfoWrapper = styled.div`
    height: 70px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    font-size: 16px;
    
    background-color: #809caa;

    @media(max-height: 600px){
        height: 30px;
        gap: 15px;
    }
`

const PackFlag = styled.div`
    position: relative;
    width: 40px;
    height: 30px;

    border-radius: 5px;
    background-color: #fff;
    color: #6f97ab;

    margin-bottom: -5px;

    display: flex;
    justify-content: center;
    align-items: center;

    @media(max-height: 590px){
        width: 25px;
        height: 20px;
        font-size: 12px;
    }
`
const PackSpan = styled.span`
    position: absolute;
    top: -15px;
    right: -11px;

    width: 25px;
    height: 25px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    color: #fff;
    background-color: #6f97ab;

    border: 1px solid #fff;
    border-radius: 100%;

    @media(max-height: 590px){
        font-size: 9px;
        width: 15px;
        height: 15px;
        top: -7px;
        right: -5px;
    }
`

const TotalPackFlag = styled.div`
    position: relative;
    color: #6f97ab;
    width: 40px;
    height: 30px;
    border-radius: 5px;
    background-color: #fff;

    margin-bottom: -5px;

    display: flex;
    justify-content: center;
    align-items: center;

    &::before{
        content: '=';
        width: 10px;
        height: 10px;
        font-size: 22px;

        position: absolute;
        left: -19px;
        top: 0;
        color: #fff;
    }

    @media(max-height: 590px){
        width: 25px;
        height: 20px;
        font-size: 12px;

        &::before{
            font-size: 15px;
            left: -12px;
            top: -2px;
        }
    }
`
const TotalPackSpan = styled.span`
    position: absolute;
    top: -22px;
    color: #fff;
`
