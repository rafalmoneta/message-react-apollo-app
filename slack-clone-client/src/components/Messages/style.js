import styled from 'styled-components';

export const ContentBox = styled.div`
  grid-column: 3;
  grid-row: 2;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  height: 100%;
  flex-direction: column-reverse;
  overflow-y: auto;
`

// export const OuterBox = styled.div`
//   display: flex;
//   overflow-y: auto;
//   flex-direction: column-reverse;

// `

// export const InnerBox = styled.div`
//   ${'' /* flex-wrap: wrap; */}
//   display: flex;
//   ${'' /* flex: 1; */}
//   flex-direction: column;
//   margin-top: auto;
// `;