import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import getTime from '@hooks/useGetTime';
import { acceptFollow, declineFollow } from '@modules/friend';
import { updateModalStatus } from '@modules/modal';
import {
  AvatarImg,
  AlarmInnerContentsWrapper,
  AlarmTitle,
  AlarmMessage,
  ButtonWrapper,
  StyledButton,
  AlarmContentsLink,
  FriendContentsWrapper,
  FriendInnerContentsWrapper,
} from './style';

const FriendInfo = ({ data }) => {
  const dispatch = useDispatch();
  const onClickAcceptFollow = useCallback((payload) => dispatch(acceptFollow(payload)), [dispatch]);
  const onClickDeclineFollow = useCallback((payload) => dispatch(declineFollow(payload)), [dispatch]);
  const onClickModalStatus = useCallback((payload) => dispatch(updateModalStatus(payload)), [dispatch]);

  const receiveFriendRequest = data.string.includes('님에게');
  const acceptFriendRequest = data.string.includes('친구가 되었어요');

  return (
    <>
      {receiveFriendRequest ? (
        <AlarmContentsLink
          to={data.addInfo.nickname}
          onClick={() => onClickModalStatus({ key: 'showAlarmModal', value: false })}>
          <AvatarImg src={data.addInfo.imgUrl} alt="프로필 사진" />
          <AlarmInnerContentsWrapper>
            <AlarmTitle>친구요청 | {getTime(data.createdAt)}</AlarmTitle>
            <AlarmMessage marginBottom="10px">
              <span>{data.addInfo.nickname}</span>
              {data.string.split('.')[0] + '.'}
            </AlarmMessage>
          </AlarmInnerContentsWrapper>
        </AlarmContentsLink>
      ) : acceptFriendRequest ? (
        <AlarmContentsLink
          to={data.addInfo.nickname}
          onClick={() => onClickModalStatus({ key: 'showAlarmModal', value: false })}>
          <AvatarImg src={data.addInfo.imgUrl} alt="프로필 사진" />
          <FriendInnerContentsWrapper>
            <AlarmTitle>친구요청 | {getTime(data.createdAt)}</AlarmTitle>
            <AlarmMessage marginBottom="10px">
              <span>{data.addInfo.nickname}</span>
              {data.string.split('.')[0] + '.'}
            </AlarmMessage>
          </FriendInnerContentsWrapper>
        </AlarmContentsLink>
      ) : (
        <FriendContentsWrapper>
          <AvatarImg src={data.addInfo.imgUrl} alt="프로필 사진" />
          <FriendInnerContentsWrapper>
            <AlarmTitle>친구요청 | {getTime(data.createdAt)}</AlarmTitle>
            <AlarmMessage marginBottom="10px">
              <span>{data.addInfo.nickname}</span>
              {data.string.split('.')[0] + '.'}
            </AlarmMessage>
            <ButtonWrapper>
              <StyledButton bg="#121212" color="white" onClick={() => onClickAcceptFollow(data.addInfo.nickname)}>
                수락
              </StyledButton>
              <StyledButton bg="#fc3e57" color="white" onClick={() => onClickDeclineFollow(data.addInfo.nickname)}>
                거절
              </StyledButton>
            </ButtonWrapper>
          </FriendInnerContentsWrapper>
        </FriendContentsWrapper>
      )}
    </>
  );
};

export default FriendInfo;
