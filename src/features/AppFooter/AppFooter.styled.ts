import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Footer = styled.footer`
    box-shadow: 0px -4px 7px -4px rgb(0 0 0 / 20%);
    min-height: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FooterLink = styled(Link)`
    color: rgb(0 0 0 );
`;