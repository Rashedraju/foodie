import { keyframes } from 'styled-components';

export const slideRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-10rem);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;
