import * as React from 'react';
import styled from 'styled-components';

//common
import Header from '../../common/Header';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const CenterBox = styled.h1`
  ${props => props.theme.mixins.absoluteCenter};
  ${props => props.theme.typo.h1};
  color: ${props => props.theme.colors.PRIMARY};
`;

export default class extends React.PureComponent {
  render() {
    console.log(this.props.isSignedIn);
    console.log(this.props.user);
    return (
      <Container>
        <Header history={this.props.history} />
        <CenterBox>메인페이지입니다.</CenterBox>
      </Container>
    );
  }
}
