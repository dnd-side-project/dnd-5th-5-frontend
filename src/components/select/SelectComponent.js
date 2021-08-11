import axios from 'axios';
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
  SelectedCount,
  SubmitButton,
  ButtonWrapper,
} from './style';
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
import HeaderContainer from '@containers/common/HeaderContainer';
import { useParams } from 'react-router-dom';

const SelectComponent = () => {
  // 주소창에서 가져오기
  const owner = useParams().nickname;
  const [offset, setOffset] = useState(0);
  const [getWordListError, setGetWordListError] = useState(false);
  const [wordList, setWordList] = useState([[], [], [], []]);
  const [idList, setIdList] = useState([]);
  const COLUMN = 4;
  const backgroundGradientList = [
    'linear-gradient(to top, #bf5ae0, #a811da)',
    'linear-gradient(to top, #ff0016, #ff7a00)',
    'linear-gradient(to top, #2ce375, #0098ac)',
    'linear-gradient(to top, #ed4264, #fedc7f)',
    'linear-gradient(to top, #00b562, #b7e306)',
    'linear-gradient(to top, #0533da, #05c1da)',
    'linear-gradient(to top, #8e2de2, #4a00e0)',
    'linear-gradient(to top, #8e2de2, #ff004d)',
    'linear-gradient(to top, #ff512f, #dd2476)',
    'linear-gradient(to top, #ef5600, #ffc837)',
  ];
  const emojiList = [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9, emoji10, emoji11];

  useEffect(() => {
    getWord();
  }, []);

  //axios사용해서 데이터 받아오기
  const getWord = async () => {
    //여기 리덕스로 바꾸기
    const response = await axios.get('http://3.37.42.147/api/v1/alacard/wordlist', {
      params: { nickname: owner, offset },
    });
    const setData = await response.data.data;
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
      setGetWordListError(true);
      alert('더 단어가 없어요 ㅠㅠ');
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
    console.log(idList);
    const response = await axios.patch(`http://3.37.42.147/api/v1/alacard/wordlist?owner=${owner}`, {
      idList,
    });
    console.log(response);
  };

  const viewSize = useResponsive();

  return (
    <>
      <MainWrapper>
        <HeaderContainer />
        <KeywordIntro>
          {owner}과<br />
          관련된 키워드를 모두 골라봥😼
        </KeywordIntro>
        {idList.length ? (
          <SelectedCount>{idList.length}개의 키워드를 골랐어!</SelectedCount>
        ) : (
          <SelectedCount>아직 고른 키워드가 없어!</SelectedCount>
        )}
        <SelectViewWrapper>
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
                    <HintOfItem>{item.hint}</HintOfItem>
                    <WordNameOfItem>{item.wordName}</WordNameOfItem>
                  </EachSelectViewItem>
                ) : (
                  <WhiteBox>
                    <img src={item.url} style={viewSize > 1023 ? { width: '38px' } : { width: '24px' }} />
                  </WhiteBox>
                ),
              )}
            </EachSelectViewLine>
          ))}
        </SelectViewWrapper>
        <ButtonWrapper>
          <GetMoreWorldButton onClick={getWord} disabled={getWordListError ? true : false}>
            더 보여줘😗
          </GetMoreWorldButton>
          <SubmitButton
            onClick={onSubmitHandler}
            style={idList.length ? null : { background: '#2a2a2a' }}
            disabled={idList.length ? false : true}>
            다 골랐음😋
          </SubmitButton>
        </ButtonWrapper>
      </MainWrapper>
    </>
  );
};

export default SelectComponent;
