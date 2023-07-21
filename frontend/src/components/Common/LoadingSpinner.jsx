import styled, { keyframes } from 'styled-components';

// 로딩 스피너
const LoadingSpinner = ({ width, height, children}) => {
  return (
    <LoaderStyled
      width={width}
      height={height}
    >
      {children}
    </LoaderStyled>
  );
};

export default LoadingSpinner;


// 회전 애니메이션 키프레임
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 로딩 스피너 스타일
const LoaderStyled = styled.div`
 border: 4px solid transparent; /* 테두리를 초기에 투명으로 설정 */
  border-radius: 50%; /* 원 모양 */
  width: ${(props) => props.width || '50px'};
  height: ${(props) => props.height || '50px'};
  animation: ${spin} 1.5s linear infinite, gradientBorder 3s linear infinite; /* 회전 애니메이션 및 그라데이션 애니메이션 적용 */
  
  @keyframes gradientBorder {
    0% {
      border-top: 4px solid rgba(59, 178, 184, 0.7) 96.4%
    }
    50% {
      border-top: 4px solid #8BD4D3;
    }
    100% {
      border-top: 4px solid rgba(66, 230, 149, 0.7) 95.5%,;
    }
  }
`;