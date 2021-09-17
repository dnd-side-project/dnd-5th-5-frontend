import React from 'react';
import { ModalWrapper, ModalOverlay, ModalContents, Header, Layout, EmptyWrapper, AlarmContents } from './style';
import closeBtn from '@assets/img/modal/closeBtn.svg';
import FriendInfo from './FriendInfo';
import AlarmInfo from './AlarmInfo';

const AlarmModal = ({ state, apiCall }) => {
  const { getAlarmDataList } = state;
  const { onClickModalStatus } = apiCall;
  const closeAlarmModal = () => {
    onClickModalStatus({ key: 'showAlarmModal', value: false });
  };

  return (
    <ModalWrapper>
      <ModalOverlay onClick={() => closeAlarmModal()} />
      <ModalContents>
        <Layout>
          <Header>
            <span>알림</span>
            <img src={closeBtn} alt="닫기 버튼" onClick={closeAlarmModal} />
          </Header>
          {getAlarmDataList.data === !undefined ? (
            <EmptyWrapper>알림이 없습니다.</EmptyWrapper>
          ) : (
            <div>
              {getAlarmDataList.data.map((data) => {
                return (
                  <>
                    {data.category === 'FRIEND_ALARM' && (
                      <AlarmContents>
                        <FriendInfo data={data} />
                      </AlarmContents>
                    )}
                    {data.category === 'NOTICE_ALARM' && (
                      <>
                        <AlarmContents>
                          <AlarmInfo data={data} />
                        </AlarmContents>
                      </>
                    )}
                  </>
                );
              })}
            </div>
          )}
        </Layout>
      </ModalContents>
    </ModalWrapper>
  );
};

export default AlarmModal;
