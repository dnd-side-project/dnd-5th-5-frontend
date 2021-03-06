import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import useResponsive from '../hooks/useResponsive';
import LeftSide from '@components/common/LeftSide';
import ProfileSettingsContainer from '@containers/profileSettings/ProfileSettingsContainer';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1023px) {
    display: block;
  }
`;
const ProfileSettingsPage = () => {
  const viewSize = useResponsive();

  return (
    <Wrapper>
      {viewSize > 1023 ? (
        <>
          <LeftSide />
          <ProfileSettingsContainer />
        </>
      ) : (
        <>
          <ProfileSettingsContainer />
        </>
      )}
    </Wrapper>
  );
};

export default withRouter(ProfileSettingsPage);
