import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get("window");

class WriterItem extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }


  render(){
    const { _id, nickname, articleLength, profileImg } = this.props;
    
    return (
      <Wrap>  
        <Row onPressOut={() => this.props.navigation.navigate('WriterView', {writer_id : _id})}>
          <WriterBox>
            <ProfileImgBox source={{uri: profileImg}}/>
            <WriterText>{nickname}</WriterText>
          </WriterBox>
          <ArticleNumText>글수 {articleLength}</ArticleNumText>
        </Row>
      </Wrap>
    )
  }
}

export default withNavigation(WriterItem);

const Wrap = styled.View`
  padding: 5% 7%;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

const Row = styled.TouchableOpacity`
  margin-bottom: 7%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WriterBox = styled.View`  
  flex-direction: row;
  align-items: center;
`;

const ProfileImgBox = styled.Image`
  width : 40px;
  height : 40px;
  border-radius : 20px;
  margin-right : 7px;
  background-color : transparent;
  border-width: 1px;
  border-color: #e5e5e5;
`;

const WriterText = styled.Text`
  font-family: 'hd-regular';
  color:#333;
  font-size:16px;
`;

const ArticleNumText = styled.Text`
  font-family: 'hd-regular';
  color:#666;
  font-size:12px;
`;