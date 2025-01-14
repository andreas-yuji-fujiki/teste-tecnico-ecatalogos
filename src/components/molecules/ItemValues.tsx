// CartWrapper.tsx
import styled from 'styled-components';

import AddIconSvg from '/images/add-btn-icon.svg'
import RemoveIconSvg  from '/images/remove-btn-icon.svg'

interface CartWrapperProps {
    addedQuantity: number;
    cartValue: number;
    PackValue: number;
    onAdd: () => void;
    onRemove: () => void;
}

const ItemValues: React.FC<CartWrapperProps> = ({
    addedQuantity,
    cartValue,
    PackValue,
    onAdd,
    onRemove,
}) => {
    return (
        <ItemValuesWrapper>
            <ValueWrapper>
                <ValueTitle>Atual:</ValueTitle> 
                <span>R$ {(addedQuantity * PackValue).toFixed(2)}</span>
            </ValueWrapper>

            <QuantityControlsWrapper>
                <button onClick={onRemove}>
                    <img src={RemoveIconSvg} alt="Adicionar item" />
                </button>

                <QuantitySpan>
                    {addedQuantity}
                </QuantitySpan>
                
                <button onClick={onAdd}>
                    <img src={AddIconSvg} alt="Remover item" />
                </button>
            </QuantityControlsWrapper>

            <ValueWrapper>
                <ValueTitle>Acumulado:</ValueTitle> 
                <span>R$ {cartValue.toFixed(2)}</span>
            </ValueWrapper>
        </ItemValuesWrapper>
    );
};

export default ItemValues;

// styles
const ItemValuesWrapper = styled.div`
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    gap: 20px;

    margin-bottom: 15px;

    @media(max-height: 590px){
        margin-bottom: 0;
    }
`

const ValueWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.8vh;
`
const ValueTitle = styled.span`
    font-weight: 450;
    font-size: 1.8vh;
`

const QuantityControlsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const QuantitySpan = styled.span`
    color: #809cab;
    font-size: 25px;
    padding: 0 5px;
    border: 1px solid #809cab;

    @media(max-width: 590px){
        font-size: 20px;
    }
`