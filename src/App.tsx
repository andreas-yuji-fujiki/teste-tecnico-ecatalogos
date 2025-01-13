// imports
import styled from 'styled-components';
import CartSlider from './components/organisms/CartSlider'; // Importando o CartSlider

// function
const App: React.FC = () => {
    return (
        <AppWrapper>
            <CartSlider />
        </AppWrapper>
    );
};

export default App;

// styles:
const AppWrapper = styled.div`
    max-width: 600px;
    height: 100dvh;
    max-height: 100dvh;
    
    margin: 0 auto;
    border: 2px solid #000;
    border-top: none;
    border-bottom: none;
`;
