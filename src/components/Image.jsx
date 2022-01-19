import styled from "styled-components";
import PlusIcon from "./PlusIcon";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {useHistory} from "react-router-dom";


const StyledLazyLoadImage = styled(LazyLoadImage)`
  opacity: 0.9;
  vertical-align: top;
  transition: opacity 0.5s;
  
  @media (min-width: 992px) {
    height: 317px;
  }
`;

const StyledLoadImage = styled.img`
  opacity: 0.9;
  vertical-align: top;
  transition: opacity 0.5s;
  
  @media (min-width: 992px) {
    height: 317px;
  }
`;

const ContentContainer = styled.div`
  color: #fff;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  
  &::before,
  &::after {
    position: absolute;
    top: 30px;
    right: 30px;
    bottom: 30px;
    left: 30px;
    content: "";
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s;
  }
  
  &::before {
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    transform: scale(0, 1);
  }

  &::after {
    border-right: 1px solid #fff;
    border-left: 1px solid #fff;
    transform: scale(1, 0);
  }
`

const ContentContainerInner = styled.div`

`

const PlusContainer = styled.div`
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s;
  transform: translate3d(0, -24px, 0);
  margin-bottom: 12px;
  text-align: center;
  height: 36px;
  display: none;
  
  @media (min-width: 576px) {
    display: block;
  }
`

const Title = styled.div`
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s;
  transform: translate3d(0, -24px, 0);
  text-transform: uppercase;
  font-size: 34px;
  word-spacing: -0.15em;
  text-align: center;
  line-height: 34px;
  margin-bottom: 12px;
  font-weight: 300;
`;

const Caption = styled.div`
  margin: 20px 50px 0 50px;
  opacity: 0;
  transition: opacity 0.35s ease 0s, transform 0.35s ease 0s;
  transform: translate3d(0px, 24px, 0px);
  letter-spacing: 1px;
  font-size: 15px;
  text-align: center;
  line-height: 25px;
`;

const StyledImage = styled.div`
  position: relative;
  cursor: pointer;
  background: #000000;
  overflow: hidden;
  
  &:hover ${StyledLazyLoadImage} {
    opacity: 0.5;
  }
  
  &:hover ${ContentContainer}::before,
  &:hover ${ContentContainer}::after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  &:hover ${Title},
  &:hover ${Caption},
  &:hover ${PlusContainer} {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;

const TitleWordBold = styled.span`
  font-weight: 800;
`;

const TitleWordNormal = styled.span`

`;

const Image = ({title, caption, src, srcPreview}) => {
  const history = useHistory();

  return (
    <StyledImage>
      {history.location.pathname === '/' && <StyledLazyLoadImage
        alt={title}
        src={src}
        placeholderSrc={srcPreview}
        width="100%"
      />}
      {history.location.pathname !== '/' && <StyledLoadImage
        alt={title}
        src={src}
        width="100%"
      />}
      <ContentContainer>
        <ContentContainerInner>
          <PlusContainer>
            <PlusIcon size={36}/>
          </PlusContainer>
          <Title>
            {title.split(' ').map((word, index) => index % 2 === 0 ?
              (<TitleWordBold key={index}>
                {word.toUpperCase()}
              </TitleWordBold>)
              :
              (<TitleWordNormal key={index}>
                {word.toUpperCase()}
              </TitleWordNormal>)
            )}
          </Title>
          <Caption>
            {caption}
          </Caption>
        </ContentContainerInner>
      </ContentContainer>
    </StyledImage>
  );
}

export default Image;