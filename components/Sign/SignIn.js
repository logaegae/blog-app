import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { userSignIn, signInInit } from '../../actions';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';

const { height, width } = Dimensions.get("window");

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      pw: "",
    }
  }
  componentDidMount(){
    // this.getKey();
  }

  componentDidUpdate(prevProps){
    const auth = this.props.auth;
    if(prevProps.auth !== auth){  
      if(auth.http.result === "SUCCESS"){
        this.props.signInInit();
        // alert("로그인 되었습니다.");
        this.props.navigation.navigate('Home');
      } else if(auth.http.result === "FAILED"){
        this.props.signInInit();
        alert("로그인에 실패했습니다.");
      }
    }    
  }
  
  async getKey(){
    try {
      const _storedData = await AsyncStorage.getItem('@BlogApp.Auth');
      alert(_storedData);
    } catch(error) {
      alert("Error retrieving data :" + error);
    }
  }

  render() {

    const userInfo = this.state;
    // const auth = this.props.auth;
    // const authState = JSON.stringify(auth, 0, 2)

    return (
      <Wrap>
        <CloseBox>
          <BtnClose onPressOut={() => this.props.navigation.navigate('Home')}>
            <Ionicons name="ios-close" color="#fff" size={60} style={{marginLeft:15}}/>
          </BtnClose>
        </CloseBox>
        <LogoBox>
          <Logo>Travel</Logo>
          <BorderBox></BorderBox>
          {/* <Text style={{height:210}}>{authState}</Text> */}
        </LogoBox>
        <InputBox>
          <InputWrap>
            <Feather name="user" color="#999" size={20} />
            <InputText 
              value={this.state.id}
              onChangeText={(id) => this.setState({id: id.toLowerCase()})}
              placeholder="Email Address"
              placeholderTextColor="#bbb"
              returnKeyType={"done"}
              autoCorrect={false}
            />
          </InputWrap>
          <InputWrap>
             <Feather name="lock" color="#999" size={20} />
             <InputText 
              value={this.state.pw}
              onChangeText={(pw) => this.setState({pw: pw})}
              placeholder="Password"
              placeholderTextColor="#bbb"
              secureTextEntry
              returnKeyType={"done"}
              autoCorrect={false}
            />
          </InputWrap>
          <Button onPressOut={() => this.props.userSignIn(userInfo)} >
            <BtnText>Sign In</BtnText>
          </Button>
          <P>Create Your Travel</P>
          <Button small onPressOut={() => this.props.navigation.navigate('SignUp')}>
            <BtnText fs14>Sign Up</BtnText>
          </Button>
        </InputBox>
      </Wrap>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.redux.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userSignIn: (userInfo) => {
      return dispatch(userSignIn(userInfo));
    },
    signInInit: () => {
      return dispatch(signInInit());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const Wrap = styled.View`
  flex: 1;
  background: #9FA3A8;
`;

const CloseBox = styled.View`
  flex: 1.5;
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-start;
`;

const BtnClose = styled.TouchableOpacity`
`;

const Button = styled.TouchableOpacity`
  width: ${width * 0.7};
  height: 60px;
  justify-content: center;
  align-items:center;
  border-radius:30px;
  background:#333;
  ${props => {
      if(props.small){
          return `height:40px; border: 1px #fff solid; border-radius: 20px; background-color: transparent;`
      }
  }}
`;

const LogoBox = styled.View`
  flex: 1;
  margin-left:18%;
  justify-content: flex-end;
`;

const Logo = styled.Text`
  font-family: 'hd-black';
  font-size: 50px;
  color:#fff;
`;

const BorderBox = styled.View`
  height:8px;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const InputBox = styled.View`
  flex: 7.5;
  justify-content:center;
  align-items:center;
`;

const InputWrap = styled.View`
  margin-bottom:15px;
  padding: 5px 30px;
  width: ${width * 0.7}
  height:60px;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  background: #fff;
`;

const InputText = styled.TextInput`
  margin-left:10px; 
  padding: 5px;
  width: 150px;
  font-family: 'hd-regular';
  font-size: 15px;
`;

const BtnText = styled.Text`
  font-family: 'hd-bold';
  font-size: ${props => props.fs14 ? ("14px;") : ("16px;")}
  color:#fff;
`

const P = styled.Text`
  margin:40px 0 15px;
  font-family: 'hd-bold';
  font-size:14px;
  color:#fff;
`
