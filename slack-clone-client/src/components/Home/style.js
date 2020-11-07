import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 2rem;
`

export const LeftContent = styled.div`
  background-color: red;
`

export const RightContent = styled.div`
  background-color: #f3f4f7;
`

export const CenterContent = styled.div`
  background-color: blue;
`