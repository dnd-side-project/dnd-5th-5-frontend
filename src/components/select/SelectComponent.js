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
  GetMoreWorldButton,
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
import emoji1 from '@assets/img/emoji/emoji1.svg';
import emoji2 from '@assets/img/emoji/emoji2.svg';
import emoji3 from '@assets/img/emoji/emoji3.svg';
import emoji4 from '@assets/img/emoji/emoji4.svg';
import emoji5 from '@assets/img/emoji/emoji5.svg';
import emoji6 from '@assets/img/emoji/emoji6.svg';
import emoji7 from '@assets/img/emoji/emoji7.svg';
import emoji8 from '@assets/img/emoji/emoji8.svg';
import emoji9 from '@assets/img/emoji/emoji9.svg';
import emoji10 from '@assets/img/emoji/emoji10.svg';
import emoji11 from '@assets/img/emoji/emoji11.svg';
import closeBtnWhite from '@assets/img/my-profile/closeBtnWhite.svg';
import { withRouter } from 'react-router-dom';
import client from '@lib/api/client';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useTitle, useMetaTegs } from '@hooks/useMeta';
import Cookies from 'universal-cookie';

const SelectComponent = ({ state, history }) => {
  // 주소창에서 가져오기
  const { alaWordData, getMoreAlaWordList, owner } = state;
  const [offset, setOffset] = useState(0);
  const [cookieId, setCookieId] = useState(null);
  const [wordList, setWordList] = useState([[], [], [], []]);
  const [idList, setIdList] = useState([]);
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
  const emojiList = [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9, emoji10, emoji11];
  let slicedNumberOfWordList = [];
  let indexOfEmoji = [];
  let emojiIndexOfWordList = [];
  //axios사용해서 데이터 받아오기
  useEffect(() => {
    setCookieId(alaWordData.cookieId);
  }, []);

  const indexing = () => {
    for (let i = 0; i < 4; i++) {
      let [num1, num2] = [
        Math.floor(Math.random() * COLUMN + i * COLUMN),
        Math.floor(Math.random() * COLUMN + i * COLUMN),
      ];
      let [num3, num4] = [Math.floor(Math.random() * 11), Math.floor(Math.random() * 11)];
      while (num1 === num2) {
        num2 = Math.floor(Math.random() * COLUMN + i * COLUMN);
      }
      slicedNumberOfWordList.push(num1, num2);
      indexOfEmoji.push(num3, num4);
    }
    emojiIndexOfWordList = slicedNumberOfWordList.sort((a, b) => a - b);
  };

  const getWord = () => {
    getMoreAlaWordList({ nickname: owner, offset, cookieId });
    const setData = alaWordData.wordList;

    console.log(alaWordData.wordList);
    console.log(offset);
    console.log(cookieId);
    if (setData.length > 15) {
      const newWordList = setData.map((i) => ({ ...i, clicked: false }));
      setOffset(offset + newWordList.length);
      console.log(newWordList);
      console.log(wordList);
      indexing();
      //
      if (!wordList) {
        setWordList([
          [
            ...wordList[0],
            ...newWordList.slice(0, emojiIndexOfWordList[0]),
            { url: emojiList[indexOfEmoji[0]] },
            ...newWordList.slice(emojiIndexOfWordList[0], emojiIndexOfWordList[1]),
            { url: emojiList[indexOfEmoji[1]] },
            ...newWordList.slice(emojiIndexOfWordList[1], COLUMN),
          ],
          [
            ...wordList[1],
            ...newWordList.slice(COLUMN, emojiIndexOfWordList[2]),
            { url: emojiList[indexOfEmoji[2]] },
            ...newWordList.slice(emojiIndexOfWordList[2], emojiIndexOfWordList[3]),
            { url: emojiList[indexOfEmoji[3]] },
            ...newWordList.slice(emojiIndexOfWordList[3], COLUMN * 2),
          ],
          [
            ...wordList[2],
            ...newWordList.slice(COLUMN * 2, emojiIndexOfWordList[4]),
            { url: emojiList[indexOfEmoji[4]] },
            ...newWordList.slice(emojiIndexOfWordList[4], emojiIndexOfWordList[5]),
            { url: emojiList[indexOfEmoji[5]] },
            ...newWordList.slice(emojiIndexOfWordList[5], COLUMN * 3),
          ],
          [
            ...wordList[3],
            ...newWordList.slice(COLUMN * 3, emojiIndexOfWordList[6]),
            { url: emojiList[indexOfEmoji[6]] },
            ...newWordList.slice(emojiIndexOfWordList[6], emojiIndexOfWordList[7]),
            { url: emojiList[indexOfEmoji[7]] },
            ...newWordList.slice(emojiIndexOfWordList[7]),
          ],
        ]);
      } else {
        setWordList([
          [
            ...newWordList.slice(0, emojiIndexOfWordList[0]),
            { url: emojiList[indexOfEmoji[0]] },
            ...newWordList.slice(emojiIndexOfWordList[0], emojiIndexOfWordList[1]),
            { url: emojiList[indexOfEmoji[1]] },
            ...newWordList.slice(emojiIndexOfWordList[1], COLUMN),
          ],
          [
            ...newWordList.slice(COLUMN, emojiIndexOfWordList[2]),
            { url: emojiList[indexOfEmoji[2]] },
            ...newWordList.slice(emojiIndexOfWordList[2], emojiIndexOfWordList[3]),
            { url: emojiList[indexOfEmoji[3]] },
            ...newWordList.slice(emojiIndexOfWordList[3], COLUMN * 2),
          ],
          [
            ...newWordList.slice(COLUMN * 2, emojiIndexOfWordList[4]),
            { url: emojiList[indexOfEmoji[4]] },
            ...newWordList.slice(emojiIndexOfWordList[4], emojiIndexOfWordList[5]),
            { url: emojiList[indexOfEmoji[5]] },
            ...newWordList.slice(emojiIndexOfWordList[5], COLUMN * 3),
          ],
          [
            ...newWordList.slice(COLUMN * 3, emojiIndexOfWordList[6]),
            { url: emojiList[indexOfEmoji[6]] },
            ...newWordList.slice(emojiIndexOfWordList[6], emojiIndexOfWordList[7]),
            { url: emojiList[indexOfEmoji[7]] },
            ...newWordList.slice(emojiIndexOfWordList[7]),
          ],
        ]);
      }
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
    const response = await client.patch(`/api/v1/alacard/wordlist?nickname=${owner}`, {
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
            <p>
              <b>{idList.length}개</b>의 키워드를 골랐어!
            </p>
          ) : (
            <p>아직 고른 키워드가 없어!</p>
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
                          fontWeitght: item.clicked ? 'regular' : 'medium',
                        }}>
                        {item.hint}
                      </HintOfItem>
                      <WordNameOfItem
                        style={{
                          fontWeitght: item.clicked ? 'regular' : 'bold',
                        }}>
                        {item.wordName}
                      </WordNameOfItem>
                    </EachSelectViewItem>
                  ) : (
                    <WhiteBox key={index + 5}>
                      <img src={item.url} style={viewSize > 1023 ? { width: '38px' } : { width: '24px' }} />
                    </WhiteBox>
                  ),
                )}
              </EachSelectViewLine>
            ))}
          </ScrollContainer>
        </SelectViewWrapper>
        {showToast && (
          <ToastWrapper>
            <Toast>더 많은 단어를 준비중입니다!</Toast>
          </ToastWrapper>
        )}
        <ButtonWrapper>
          <GetMoreWorldButton onClick={getWord}>
            더 보여줘 <img src={emoji1} />
          </GetMoreWorldButton>
          <SubmitButton
            onClick={onSubmitHandler}
            style={idList.length ? { cursor: 'pointer' } : { color: '#555555', background: '#2a2a2a' }}
            disabled={idList.length ? false : true}>
            다 골랐음
            <img src={emoji11} />
          </SubmitButton>
        </ButtonWrapper>
      </MainWrapper>
    </>
  );
};

export default withRouter(SelectComponent);
