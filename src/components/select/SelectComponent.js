import React, { useEffect, useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import {
  HintOfItem,
  WordNameOfItem,
  EachSelectViewLine,
  SelectViewWrapper,
  MainWrapper,
  EachSelectViewItem,
  WhiteBox,
  GetMoreWordButton,
  KeywordIntro,
  SubmitButton,
  HeaderIconWrapper,
  HeaderLogoWrapper,
  HeaderInnerWrapper,
  HeaderWrapper,
  ToastWrapper,
  Toast,
  ButtonWrapper,
} from './style';
import logo from '@assets/img/nav/logo.svg';
import closeBtnWhite from '@assets/img/my-profile/closeBtnWhite.svg';
import { withRouter, useParams } from 'react-router-dom';
import client from '@lib/api/client';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useTitle, useMetaTegs } from '@hooks/useMeta';

const SelectComponent = ({ history }) => {
  // 주소창에서 가져오기
  const owner = useParams().nickname;
  const [offset, setOffset] = useState(0);
  const [wordList, setWordList] = useState([[], [], [], []]);
  const [idList, setIdList] = useState([]);
  const [cookieId, setcookieId] = useState('');
  const [showToast, setShowToast] = useState(false);
  const COLUMN = 4;
  const backgroundGradientList = [
    'linear-gradient(to right, #bf5ae0, #a811da)',
    'linear-gradient(to right, #ff0016, #ff7a00)',
    'linear-gradient(to right, #2ce375, #0098ac)',
    'linear-gradient(to right, #ed4264, #fedc7f)',
    'linear-gradient(to right, #00b562, #b7e306)',
    'linear-gradient(to right, #0533da, #05c1da)',
    'linear-gradient(to right, #8e2de2, #4a00e0)',
    'linear-gradient(to right, #8e2de2, #ff004d)',
    'linear-gradient(to right, #ff512f, #dd2476)',
    'linear-gradient(to right, #ef5600, #ffc837)',
  ];
  const emojiList = ['🤗', '😼', '😋', '😎', '👀', '✋', '😜', '🍿', '😳', '😗', '👻'];

  useEffect(() => {
    getWord();
  }, []);

  //axios사용해서 데이터 받아오기
  const getWord = async () => {
    //여기 리덕스로 바꾸기
    const response = await client.get(
      `/api/v2/alacard/wordlist`,
      cookieId ? { params: { nickname: owner, offset, cookieId } } : { params: { nickname: owner, offset } },
    );
    const setData = await response.data.data.wordList;
    setcookieId(response.data.data.cookieId);
    if (setData.length > 15) {
      const newWordList = setData.map((i) => ({ ...i, clicked: false }));

      // 여기부터 리펙토링 필요
      const slicedNumberOfWordList = [];
      const indexOfEmoji = [];
      for (let i = 0; i < 4; i++) {
        let [num1, num2] = [Math.floor(Math.random() * 4 + i * 4), Math.floor(Math.random() * 4 + i * 4)];
        let [num3, num4] = [Math.floor(Math.random() * 11), Math.floor(Math.random() * 11)];
        while (num1 === num2) {
          num2 = Math.floor(Math.random() * 4 + i * 4);
        }
        slicedNumberOfWordList.push(num1, num2);
        indexOfEmoji.push(num3, num4);
      }
      const emojiIndexOfWordList = slicedNumberOfWordList.sort((a, b) => a - b);
      // 여기까지 리팩토링 해보고싶음

      //
      if (wordList.length > 2) {
        setWordList([
          [
            ...wordList[0],
            ...newWordList.slice(0, emojiIndexOfWordList[0]),
            { url: emojiList[0] },
            ...newWordList.slice(emojiIndexOfWordList[0], emojiIndexOfWordList[1]),
            { url: emojiList[1] },
            ...newWordList.slice(emojiIndexOfWordList[1], COLUMN),
          ],
          [
            ...wordList[1],
            ...newWordList.slice(COLUMN, emojiIndexOfWordList[2]),
            { url: emojiList[2] },
            ...newWordList.slice(emojiIndexOfWordList[2], emojiIndexOfWordList[3]),
            { url: emojiList[3] },
            ...newWordList.slice(emojiIndexOfWordList[3], COLUMN * 2),
          ],
          [
            ...wordList[2],
            ...newWordList.slice(COLUMN * 2, emojiIndexOfWordList[4]),
            { url: emojiList[4] },
            ...newWordList.slice(emojiIndexOfWordList[4], emojiIndexOfWordList[5]),
            { url: emojiList[5] },
            ...newWordList.slice(emojiIndexOfWordList[5], COLUMN * 3),
          ],
          [
            ...wordList[3],
            ...newWordList.slice(COLUMN * 3, emojiIndexOfWordList[6]),
            { url: emojiList[6] },
            ...newWordList.slice(emojiIndexOfWordList[6], emojiIndexOfWordList[7]),
            { url: emojiList[7] },
            ...newWordList.slice(emojiIndexOfWordList[7]),
          ],
        ]);
      } else {
        setWordList([
          [
            ...newWordList.slice(0, emojiIndexOfWordList[0]),
            { url: emojiList[0] },
            ...newWordList.slice(emojiIndexOfWordList[0], emojiIndexOfWordList[1]),
            { url: emojiList[1] },
            ...newWordList.slice(emojiIndexOfWordList[1], COLUMN),
          ],
          [
            ...newWordList.slice(COLUMN, emojiIndexOfWordList[2]),
            { url: emojiList[2] },
            ...newWordList.slice(emojiIndexOfWordList[2], emojiIndexOfWordList[3]),
            { url: emojiList[3] },
            ...newWordList.slice(emojiIndexOfWordList[3], COLUMN * 2),
          ],
          [
            ...newWordList.slice(COLUMN * 2, emojiIndexOfWordList[4]),
            { url: emojiList[4] },
            ...newWordList.slice(emojiIndexOfWordList[4], emojiIndexOfWordList[5]),
            { url: emojiList[5] },
            ...newWordList.slice(emojiIndexOfWordList[5], COLUMN * 3),
          ],
          [
            ...newWordList.slice(COLUMN * 3, emojiIndexOfWordList[6]),
            { url: emojiList[6] },
            ...newWordList.slice(emojiIndexOfWordList[6], emojiIndexOfWordList[7]),
            { url: emojiList[7] },
            ...newWordList.slice(emojiIndexOfWordList[7]),
          ],
        ]);
      }

      setOffset(offset + newWordList.length);
    } else {
      // 여기 토스트 써서 만들기
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
  };

  // click했을 때 일어나는 상황 1. clicked엘리먼트에 속성 변경 시키기 2. selectedList에 추가

  const onWordClickedHandler = (props) => {
    const clickedItem = props.item;
    const randomNumber = Math.floor(Math.random() * backgroundGradientList.length);

    // clicked 요소 값 변화
    setWordList([
      ...wordList.map((word) =>
        word.map((item) =>
          item.id === clickedItem.id
            ? clickedItem.clicked
              ? { ...item, clicked: false }
              : { ...item, clicked: backgroundGradientList[randomNumber] }
            : { ...item },
        ),
      ),
    ]);

    // selectedList에 추가
    setIdList(
      clickedItem.clicked !== false ? idList.filter((item) => item !== clickedItem.id) : [...idList, clickedItem.id],
    );
  };
  const onSubmitHandler = async () => {
    await client.patch(`/api/v1/alacard/wordlist?nickname=${owner}`, {
      idList,
    });
    history.push(`/${owner}`);
  };
  //반응형
  const viewSize = useResponsive();

  useTitle(owner);
  useMetaTegs(owner);
  return (
    <>
      <MainWrapper>
        <HeaderWrapper>
          <HeaderInnerWrapper>
            <HeaderLogoWrapper>
              <img
                src={logo}
                onClick={() => {
                  history.push(`/${owner}`);
                }}
              />
            </HeaderLogoWrapper>
            <HeaderIconWrapper>
              <img
                src={closeBtnWhite}
                onClick={() => {
                  history.push(`/${owner}`);
                }}
              />
            </HeaderIconWrapper>
          </HeaderInnerWrapper>
        </HeaderWrapper>

        <KeywordIntro>
          {owner}과<br />
          관련된 키워드를 모두 골라봥!😼
          {idList.length ? (
            <p style={{ fontFamily: 'spoqaHanSansRegular' }}>
              <b style={{ fontFamily: 'spoqaHanSansBold' }}>{idList.length}개</b>의 키워드를 골랐어!
            </p>
          ) : (
            <p style={{ fontFamily: 'spoqaHanSansRegular' }}>아직 고른 키워드가 없어!</p>
          )}
        </KeywordIntro>

        <SelectViewWrapper>
          <ScrollContainer>
            {wordList.map((word, index) => (
              <EachSelectViewLine key={index}>
                {word.map((item, index) =>
                  item.id ? (
                    <EachSelectViewItem
                      key={item.id}
                      onClick={(event) => onWordClickedHandler({ event, item })}
                      style={{
                        background: item.clicked ? item.clicked : 'rgba(255, 255, 255, 0.1)',
                      }}>
                      <HintOfItem
                        style={{
                          fontFamily: item.clicked ? 'spoqaHanSansBold' : 'spoqaHanSansRegular',
                        }}>
                        {item.hint}
                      </HintOfItem>
                      <WordNameOfItem
                        style={{
                          fontFamily: item.clicked ? 'spoqaHanSansBold' : 'spoqaHanSansRegular',
                        }}>
                        {item.wordName}
                      </WordNameOfItem>
                    </EachSelectViewItem>
                  ) : (
                    <WhiteBox key={index + 5} style={viewSize > 1023 ? { fo: '38px' } : { width: '24px' }}>
                      {item.url}
                    </WhiteBox>
                  ),
                )}
              </EachSelectViewLine>
            ))}
          </ScrollContainer>
        </SelectViewWrapper>
        <ToastWrapper>{showToast && <Toast>더 많은 단어를 준비중입니다!</Toast>}</ToastWrapper>
        <ButtonWrapper>
          <GetMoreWordButton onClick={getWord}>더 보여줘 😗</GetMoreWordButton>
          <SubmitButton
            onClick={onSubmitHandler}
            style={idList.length ? { cursor: 'pointer' } : { color: '#555555', background: '#2a2a2a' }}
            disabled={idList.length ? false : true}>
            다 골랐음😋
          </SubmitButton>
        </ButtonWrapper>
      </MainWrapper>
    </>
  );
};

export default withRouter(SelectComponent);
