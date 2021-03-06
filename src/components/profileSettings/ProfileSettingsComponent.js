import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import imageCompression from 'browser-image-compression';
import { withRouter } from 'react-router-dom';
import client from '@lib/api/client';
import HeaderContainer from '@containers/common/HeaderContainer';
import { useTitle } from '@hooks/useMeta';
import {
  Wrapper,
  InnerWrapper,
  MainWrapper,
  ProfileImg,
  EmailWrapper,
  EachTitle,
  EmailImg,
  EmailImgWrapper,
  EmailContentWrapper,
  InputBoxWrapper,
  InputBox,
  ContentWrapper,
  CancelButton,
  SubmitButton,
  ButtonWrapper,
  DeleteButton,
  StatusMessageCount,
  AlertMessage,
  HideBox,
  ToggleButton,
  ToggleInner,
  IsOpen,
  ToastWrapper,
  Toast,
} from './style';
import Modal from './Modal';
import googleIcon from '@assets/img/profileSettings/google.svg';
import kakaoIcon from '@assets/img/auth/kakao.png';
import Footer from '@components/common/Footer';
import useResponsive from '../../hooks/useResponsive';

const cookies = new Cookies();
const ProfileSettingsComponent = ({ state, history }) => {
  const { memberData, onUpdateMyInfo } = state;
  const [myInfo, setMyInfo] = useState(memberData);
  const [isNicknameExists, setIsNicknameExists] = useState(false);
  const [isNicknameBreakeRoles, setIsNicknameBreakeRoles] = useState(false);
  const [statusMessageOverCount, setStatusMessageOverCount] = useState(false);
  const [nickname, setNickname] = useState(sessionStorage.getItem('nickname'));
  const [isKakao] = useState(myInfo.provider === 'KAKAO');
  const [deleteModal, setDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const viewSize = useResponsive();

  const onChangeNickname = (e) => {
    setMyInfo({
      ...myInfo,
      nickname: e.target.value,
      changed: true,
    });
    setIsNicknameBreakeRoles(false);
  };

  const onChangeStatusMessage = (e) => {
    setStatusMessageOverCount(false);
    setMyInfo({
      ...myInfo,
      statusMessage: e.target.value,
      changed: true,
    });
  };

  const onClickIsOpen = () => {
    setMyInfo({
      ...myInfo,
      isOpen: !myInfo.isOpen,
      changed: true,
    });
  };

  const onChangeFile = async (e) => {
    const imageFile = e.target.files[0];
    // option ?????? ?????? browser-image-compression ????????? ?????????????????????
    const options = {
      maxSizeMB: 1,
      maxWidthOrWidth: 200,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      // resize??? ???????????? url??? ?????? fileUrl??? ??????
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then((result) => {
        setMyInfo({
          ...myInfo,
          imgUrl: result,
          changed: true,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdataSubmitHandler = async (e) => {
    e.preventDefault();
    // ???????????? ???????
    const existsResponse = await client.get('/api/v1/member/exists', { params: { nickname: myInfo.nickname } });
    existsResponse.data.data === true
      ? myInfo.nickname === nickname
        ? setIsNicknameExists(false)
        : setIsNicknameExists(true)
      : setIsNicknameExists(false);
    //??????????????? 30????????? ??????????
    myInfo.statusMessage.length < 30 ? setStatusMessageOverCount(false) : setStatusMessageOverCount(true);
    // ????????? ????????? ????????????????
    const regExp = /^[0-9a-zA-Z]([_]?[0-9a-zA-Z]){2,19}$/; // ??????, ??????, ???????????? '_' ??? ????????? 3~20??? ??????????????? ???????????? ??????
    regExp.test(myInfo.nickname) ? setIsNicknameBreakeRoles(false) : setIsNicknameBreakeRoles(true);

    // ?????? ????????? ????????? ??? ???????????? ??????
    if (
      (existsResponse.data.data === false || myInfo.nickname === nickname) &&
      myInfo.statusMessage.length < 31 &&
      regExp.test(myInfo.nickname)
    ) {
      await onUpdateMyInfo(myInfo);
      setNickname(myInfo.nickname);
      setMyInfo({
        ...myInfo,
        changed: false,
      });
      sessionStorage.setItem('nickname', myInfo.nickname);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        window.location.replace(`../${myInfo.nickname}/settings`);
      }, 1000);
    }
  };

  const onDeleteHandler = async () => {
    const response = await client.delete('/api/v1/member');
    if (response.data.message === 'success') {
      cookies.remove('token');
      sessionStorage.removeItem('nickname');
      client.defaults.headers.common['X-AUTH_TOKEN'] = undefined;
      window.location.replace('/');
    }
  };

  const onlogoutHandler = () => {
    cookies.remove('token');
    sessionStorage.removeItem('nickname');
    window.location.replace('/');
  };

  useTitle(sessionStorage.getItem('nickname'));
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderContainer />
      <Wrapper>
        <MainWrapper>
          <div>
            <label for="imgInput"></label>
            <ProfileImg
              id="imgInput"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={onChangeFile}
              style={{
                backgroundImage: `url(${myInfo.imgUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          </div>
          <HideBox></HideBox>
          <ContentWrapper>
            <EmailWrapper>
              <EachTitle>??????</EachTitle>
              <br />
              <EmailContentWrapper>
                <EmailImgWrapper bg={isKakao ? '#fee500' : 'white'}>
                  <EmailImg src={isKakao ? kakaoIcon : googleIcon} />
                </EmailImgWrapper>
                <span>{myInfo.email}</span>
              </EmailContentWrapper>
            </EmailWrapper>
            <InputBoxWrapper>
              <EachTitle>??????</EachTitle>
              <InputBox placeholder={myInfo.nickname} value={myInfo.nickname} onChange={onChangeNickname} />
              {isNicknameExists ? (
                <AlertMessage>???, ????????? ?????? ???????????? ???????????????. ?????? ????????? ??????????????????.</AlertMessage>
              ) : (
                <></>
              )}
              {isNicknameBreakeRoles ? (
                <AlertMessage>???, ??????/??????/_??? ???????????? 3-20??? ????????? ??????????????????.</AlertMessage>
              ) : (
                <></>
              )}
            </InputBoxWrapper>
            <InputBoxWrapper>
              <EachTitle>
                ????????????
                <StatusMessageCount style={myInfo.statusMessage.length > 30 ? { color: 'red' } : null}>
                  {myInfo.statusMessage.length}/30 byte
                </StatusMessageCount>
              </EachTitle>
              <InputBox
                placeholder={myInfo.statusMessage}
                value={myInfo.statusMessage}
                onChange={onChangeStatusMessage}
              />
              {statusMessageOverCount ? (
                <AlertMessage>???, ??????????????? ?????????. ?????? ???????????? ??????????????? :)</AlertMessage>
              ) : (
                <></>
              )}
            </InputBoxWrapper>
            <EachTitle>
              <IsOpen>
                <span>?????? ?????? ??????</span>
                <span>
                  {myInfo.isOpen ? <p>??????</p> : <p>?????????</p>}
                  <ToggleButton onClick={onClickIsOpen} className={myInfo.isOpen ? 'left' : ''}>
                    <ToggleInner className={myInfo.isOpen ? 'left' : ''} />
                  </ToggleButton>
                </span>
              </IsOpen>
            </EachTitle>
            <DeleteButton>
              <span onClick={onlogoutHandler}>????????????</span>
            </DeleteButton>
            <DeleteButton>
              <span
                onClick={() => {
                  setDeleteModal(!deleteModal);
                }}>
                ????????????
              </span>
            </DeleteButton>
            {showToast && (
              <ToastWrapper>
                <Toast>????????? ??????????????????!</Toast>
              </ToastWrapper>
            )}
            {deleteModal ? <Modal setDeleteModal={setDeleteModal} onDeleteHandler={onDeleteHandler} /> : <></>}

            <ButtonWrapper>
              <CancelButton onClick={() => history.push(`/${myInfo.nickname}`)}>??????</CancelButton>
              <SubmitButton
                onClick={onUpdataSubmitHandler}
                style={myInfo.changed ? { cursor: 'pointer' } : { background: '#2a2a2a' }}
                disabled={myInfo.changed ? false : true}>
                ????????????????
              </SubmitButton>
            </ButtonWrapper>
          </ContentWrapper>
          {viewSize > 1023 ? <></> : <Footer />}
        </MainWrapper>
      </Wrapper>
    </div>
  );
};

export default withRouter(ProfileSettingsComponent);
