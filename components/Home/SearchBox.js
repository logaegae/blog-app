import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSearching: false,
      text: null,
    }
  }

  _handleSearch(){
    const text = this.state.text;

    if(text === null || text === ""){
      alert("최소 1글자 이상 입력해 주세요.")
      return false;
    }
    this.props.navigation.navigate('Search', {text});
  }
   
 
  render() {
    const { isSearching, text } = this.state;
    
    return (
      <Wrap>
        <LogoBox>
          {isSearching ? (
             <InputSearch
                value={text}
                onChangeText={(text) => this.setState({ text })}
                placeholder="Search"
                placeholderTextColor="#ccc"
                autoFocus={true}
              />
            ) : (
             <Logo>Travel</Logo>
            )
          }
        </LogoBox>
          {isSearching ? (
            <BtnBox>
              <Button onPressOut={() => this._handleSearch()}>
                <Feather name="check" color="#666" size={25} />
              </Button>  
              <Button onPressOut={() => this.setState({ isSearching: false })}>
                <Feather name="x" color="#bbb" size={25} />
              </Button>
            </BtnBox>
            ) : (
            <BtnBox>
              <Button onPressOut={() => this.setState({ isSearching: true })}>
                <Feather name="search" color="#999" size={25} />
              </Button>  
            </BtnBox>
            )
          }
      </Wrap>  
    );
  }
}

export default withNavigation(SearchBox);

const Wrap = styled.View`
  width: ${width * 0.82};
  justify-content: space-between;
  align-items: baseline;
  flex-direction: row;
  border-bottom-width: 8px;
  border-bottom-color: #efefef;
`;

const LogoBox = styled.View`
  width: 70%;
`;

const Logo = styled.Text`
  font-family: 'hd-black';
  font-size: 50px;
  color:#999;
`;

const InputSearch = styled.TextInput`
  width:95%;
  font-size:18px;
  font-family: 'hd-regular';
  height:35px;
`;

const BtnBox = styled.View` 
  width:30%;
  flex-direction: row;
  justify-content: center;
`;

const Button = styled.TouchableOpacity`
  margin: 0 5px;
`;

