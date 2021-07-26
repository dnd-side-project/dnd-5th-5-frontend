import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { googleOauth, naverOauth } from '@modules/auth';
import { changeField, getMyInfo, updateMyInfo } from '@modules/member';
import SocialLogin from '@components/auth/SocialLogin';
import client from '@lib/api/client';

const SocialLoginContainer = ({ history }) => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const {
    socialLoginStatus,
    authMessage,
    token,
    authError,

    memberNickname,
    memberStatus,
    memberMessage,
    memberData,
    memberError,
    getMemberLoading,
  } = useSelector(({ auth, member, loading }) => ({
    // 로그인 정보
    socialLoginStatus: auth.status,
    authMessage: auth.message,
    token: auth.token,
    authError: auth.error,

    // 유저 정보
    memberNickname: member.nickname,
    memberStatus: member.status,
    memberMessage: member.message,
    memberData: member.data,
    memberError: member.error,
    getMemberLoading: loading['member/GET_MY_INFO'],
  }));
  const state = { authMessage, memberNickname, getMemberLoading };

  const onSubmitGoogle = useCallback((payload) => dispatch(googleOauth(payload)), [dispatch]);
  const onSubmitNaver = useCallback((payload) => dispatch(naverOauth(payload)), [dispatch]);
  const onChangeField = useCallback((payload) => dispatch(changeField(payload)), [dispatch]);
  const onSubmitUpdateMyInfo = useCallback((payload) => dispatch(updateMyInfo(payload)), [dispatch]);

  // 로그인이 성공하면 유저 정보를 받아온다.
  useEffect(() => {
    if (socialLoginStatus === 200) {
      cookies.set('token', token, { path: '/' });
      client.defaults.headers.common['X-AUTH_TOKEN'] = token;
      dispatch(getMyInfo());
    }
  }, [socialLoginStatus]);

  // message == login
  useEffect(() => {
    if (memberData && authMessage === 'login') {
      history.push(`/user/${memberData.nickname}`);
    }
  }, [memberData]);

  return (
    <SocialLogin
      state={state}
      onSubmitGoogle={onSubmitGoogle}
      onSubmitNaver={onSubmitNaver}
      onChangeField={onChangeField}
      onSubmitUpdateMyInfo={onSubmitUpdateMyInfo}
    />
  );
};

export default withRouter(SocialLoginContainer);
