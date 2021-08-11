import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import auth, { authSaga } from './auth';
import member, { memberSaga } from './member';
import alaWord, { alaWordSaga } from './alaWord';
import mypage, { mypageSaga } from './mypage';
import friend, { friendSaga } from './friend';
import modal from './modal';

const rootReducer = combineReducers({
  loading,
  auth,
  member,
  alaWord,
  mypage,
  friend,
  modal,
});

export function* rootSaga() {
  yield all([authSaga(), memberSaga(), mypageSaga(), friendSaga()]);
}

export default rootReducer;
