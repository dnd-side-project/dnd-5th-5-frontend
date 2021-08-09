import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ModalWrapper, ModalOverlay, ModalContents } from '@components/main/Style';
import HeaderContainer from '@containers/common/HeaderContainer';
import useResponsive from '../../hooks/useResponsive';
import secretWord from '@assets/img/alacard/secretWord.svg';
import bigCardCloseBtn from '@assets/img/alacard/bigCardCloseBtn.svg';
import linkBtn from '@assets/img/alacard/linkBtn.svg';
import maximizeBtn from '@assets/img/alacard/maximize.svg';

const StyledSlider = styled(Slider)`
  .slick-slide > div {
    overflow-y: scroll;
  }
`;

const Wrapper = styled.div`
  width: 57.6rem;
  height: 102.4rem;
  @media screen and (max-width: 1023px) {
    margin: 0 auto;
    width: 36rem;
    height: 64rem;
  }
`;

const MoreButtonWrapper = styled.div`
  height: 10.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3.83rem;
  img {
    width: 3.8rem;
    height: 3.8rem;
  }
  @media screen and (max-width: 1023px) {
    height: 6.4rem;
    padding-right: 2.4rem;
    img {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

const MoreButton = styled.div`
  cursor: pointer;
  width: 3.8rem;
  height: 3.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 1023px) {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const ContentFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentsWrapper = styled.div`
  display: table;
  width: 57.6rem;
  height: 70rem;
  line-height: 1.6;
  letter-spacing: -0.8px;
  font-size: 5.8rem;
  font-weight: 300;
  padding-left: 3.84rem;
  padding-right: 3.84rem;
  @media screen and (max-width: 1023px) {
    width: 36rem;
    height: 42rem;
    line-height: 1.6;
    letter-spacing: -0.5px;
    font-size: 3.6rem;
    padding-left: 2.4rem;
    padding-right: 2.4rem;
  }
`;

const InnerContents = styled.div`
  display: table-cell;
  vertical-align: middle;
  height: ${(props) => props.height || ''};
  text-align: left;
`;

const ModalContentsWrapper = styled.div`
  width: 312px;
  height: 420px;
  margin-left: 24px;
  margin-right: 24px;
  line-height: 1.6;
  letter-spacing: -0.5px;
  font-size: 36px;
`;

const ButtonWrapper = styled.div`
  width: 57.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 3.84rem;
  margin-bottom: 3.84rem;
  padding-right: 3.84rem;
  height: 9.6rem;
  @media screen and (max-width: 1023px) {
    margin-top: 2.4rem;
    margin-bottom: 2.4rem;
    width: 36rem;
    padding-right: 2.4rem;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36.8rem;
  height: 7.7rem;
  border-radius: 99px;
  cursor: pointer;
  border: solid 1px white;
  background: transparent;
  color: white;
  line-height: 1.6;
  font-size: 2.56rem;
  @media screen and (max-width: 1023px) {
    width: 230px;
    height: 48px;
    border-radius: 62px;
    font-size: 15px;
  }
  img {
    @media screen and (max-width: 1023px) {
      width: 18px;
      height: 18px;
      margin-left: 8px;
    }
    width: 26px;
    height: 26px;
    margin-left: 14px;
  }
`;

const CloseBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 24px 24px 0px 0px;
  img {
    cursor: pointer;
  }
`;

const MyPageComponent = ({ state }) => {
  const { alacardData, nickname } = state;
  const [showModal, setShowModal] = useState(false);
  const [sentence, setSentence] = useState('');
  const [bigAlaCardStyle, setBigAlaCardStyle] = useState('');
  const [fontColorStyle, setFontColorStyle] = useState('');
  const viewSize = useResponsive();
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openModal = (e) => {
    setShowModal(true);
    document.body.style = `overflow: hidden`;
    setSentence(e.target.getAttribute('sentence'));
    const index = e.target.getAttribute('idx');

    if (alacardData[index].isCompleted) {
      const { backgroundImgUrl, fontColor } = alacardData.alaCardSettingDto;
      setBigAlaCardStyle({
        backgroundImage: 'url(' + backgroundImgUrl + ')',
        backgroundSize: '360px 640px',
        width: '360px',
        height: '640px',
        color: fontColor,
        display: 'table',
        lineHeight: '1.6',
        letterSpacing: '-0.5px',
        fontSize: '36px',
        fontWeight: '300',
      });
      setFontColorStyle({
        color: fontColor,
      });
    } else {
      setBigAlaCardStyle({
        width: '360px',
        height: '640px',
        backgroundColor: '#121212',
        color: '#b9ff46',
        lineHeight: '1.6',
        letterSpacing: '-0.5px',
        fontSize: '36px',
        fontWeight: '300',
      });
      setFontColorStyle({
        color: '#b9ff46',
      });
    }
  };

  const closeModal = () => {
    document.body.style = `overflow: visible`;
    setShowModal(false);
  };

  const onClickShare = () => {
    const text = document.createElement('textarea');
    document.body.appendChild(text);
    text.value = `https://www.ala.monster/select/${nickname}`;

    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);
  };

  return (
    <>
      <Wrapper>
        <HeaderContainer />
        <StyledSlider {...settings}>
          {alacardData.map((card, idx) => {
            const { backgroundImgUrl, fontColor } = card.alaCardSettingDto;
            let cardStyle;
            let fontStyle;
            // 카드가 완성된 경우
            if (card.isCompleted) {
              if (!card.sentence.includes('strong')) {
                card.selectedWordList.forEach((word) => {
                  card.sentence = card.sentence.replaceAll(word.wordName, '<strong>' + word.wordName + '</strong>');
                });
              }
              cardStyle = {
                backgroundImage: 'url(' + backgroundImgUrl + ')',
                backgroundSize: 'cover',
                width: viewSize > '1023' ? '57.6rem' : '36rem',
                // height: '100vh',
              };
              fontStyle = {
                color: fontColor,
              };
            } else {
              card.sentence = card.sentence.replaceAll('???', '<img src="' + secretWord + '" alt="비밀 단어" />');
              cardStyle = {
                backgroundColor: '#121212',
                width: viewSize > '1023' ? '57.6rem' : '36rem',
                // height: '100vh',
              };
              fontStyle = {
                color: '#b9ff46',
              };
            }

            card.sentence = card.sentence.replaceAll(', ', ',<br />');
            if (!card.sentence.includes('!')) {
              card.sentence += '!';
            }
            return (
              <>
                <div key={idx} style={cardStyle}>
                  <MoreButtonWrapper>
                    <MoreButton onClick={openModal}>
                      <img src={maximizeBtn} idx={idx} sentence={card.sentence} alt="확대 버튼" />
                    </MoreButton>
                  </MoreButtonWrapper>
                  <ContentFlexWrapper>
                    <ContentsWrapper>
                      <InnerContents style={fontStyle} dangerouslySetInnerHTML={{ __html: card.sentence }} />
                    </ContentsWrapper>
                  </ContentFlexWrapper>
                  <ButtonWrapper>
                    <StyledButton onClick={onClickShare} value={idx}>
                      키워드 PICK 요청하기
                      <img src={linkBtn} alt="링크 버튼" />
                    </StyledButton>
                  </ButtonWrapper>
                </div>
              </>
            );
          })}
        </StyledSlider>
        {showModal && (
          <ModalWrapper>
            <ModalOverlay onClick={() => closeModal()} />
            <ModalContents style={bigAlaCardStyle}>
              <CloseBtnWrapper>
                <img src={bigCardCloseBtn} width="24px" height="24px" alt="닫기 버튼" onClick={closeModal} />
              </CloseBtnWrapper>
              <ModalContentsWrapper style={fontColorStyle}>
                <InnerContents height="592px" dangerouslySetInnerHTML={{ __html: sentence }} />
              </ModalContentsWrapper>
            </ModalContents>
          </ModalWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default MyPageComponent;
