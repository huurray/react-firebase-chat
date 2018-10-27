import React from 'react';
import * as firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';
import './auth.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/modules/user';

const Container = styled.div`
  display: flex;
  height: 8rem;
  padding: 0 10%;
  background-color: ${props => props.theme.colors.PRIMARY};
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  padding-left: 3rem;
`;
const Title = styled.h1`
  ${props => props.theme.typo.h1};
  color: ${props => props.theme.colors.WHITE};
`;
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Thumb = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
`;
const Name = styled.div`
  ${props => props.theme.typo.h3};
  color: ${props => props.theme.colors.WHITE};
`;

class Header extends React.Component {
  render() {
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: data => {
          this.props.userActions.getUser({
            displayName: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL
          });
          this.props.history.replace('/');
        }
      }
    };
    return (
      <Container>
        <TitleBox>
          <Title>R.F. Chat</Title>
        </TitleBox>
        {this.props.isSignedIn ? (
          <Profile>
            <Thumb src={this.props.user.photoURL} alt="profile thumnail" />
            <Name>{this.props.user.displayName}</Name>
          </Profile>
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn,
  user: state.user.data
});
const mapDispatchToProps = (dispatch: any) => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
