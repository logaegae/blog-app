import React, { Component } from 'react';
import { View, Dimensions, Button } from 'react-native';
import styled from 'styled-components';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import ModalDate from './WriteModalDate';
import ModalWeather from './WriteModalWeather';
import ModalBg from './WriteModalBg';

const { height, width } = Dimensions.get("window");

export default class WriteCon extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalVisible: false,
      modalType: "",
      switchOneday: false,
      startDate: "",
      finishDate: "",
      b: "",
      weather: {
        id: 1,
        name: "",
      },
      bg : {
        photo : null,
        color : {
          id : 1,
          value : "#6B5ED1"
        }
      },
      contents: "",
    };
    this._toggleModal = this._toggleModal.bind(this);
    this._rednerModalType = this._rednerModalType.bind(this);
    this._renderModalContent = this._renderModalContent.bind(this);
  }

  componentDidUpdate( prevProps, prevState) {
    if(JSON.stringify(prevState) !== JSON.stringify(this.state)) this.props.handleState(this.state);
    // alert(JSON.stringify(prevState,0,2))    
  }

  _handleDate = (startDate, finishDate, switchOneday) => {
    if(startDate){
      this.setState({
        startDate
      })
    }
    if(finishDate){
      this.setState({
        finishDate
      })
    }
    if(finishDate === "remove"){
      this.setState({
        finishDate : null
      });
    }
    switchOneday ? 
    this.setState({
      switchOneday : true
    })
    :this.setState({
      switchOneday : false
    });
  }

  _handleWeather = (value) => {
    this.setState({
      weather : value
    })
  }

  _handleBg = (value) => {
    this.setState({
      bg : value
    });
  }

  _toggleModal = (type) => {
    this.setState({ 
      isModalVisible: !this.state.isModalVisible, 
      modalType: type 
    });
  };

  _rednerModalType(date, weather, bg){
      switch (this.state.modalType) {
        case "date":   return date;
        case "weather": return weather;
        case "bg":  return bg;
    }
  }

  _renderModalContent = () => (
    <View>    
      <ModalHeader>
        <ModalTit>
          {this._rednerModalType("날짜", "날씨", "카드 배경")} 선택하기
        </ModalTit>
        <Button value="cancle" title="닫기" onPress={() => this._toggleModal('')}/>
      </ModalHeader>
      {this._rednerModalType(
        <ModalDate parentState={this.state} handleDate={this._handleDate} />, 
        <ModalWeather parentState={this.state} handleWeather={this._handleWeather}/>,
        <ModalBg parentState={this.state} handleBg={this._handleBg}/>
      )} 
    </View>
  );
  
  render(){
    const { isModalVisible, startDate, finishDate, title, weather, bg, contents } = this.state;

    return (
      <Wrap>
        <Modal 
          isVisible={isModalVisible} 
          style={{ justifyContent: 'flex-end', margin:0 }}>
          {this._renderModalContent()}
        </Modal>

        <HeaderConBox background={!bg.photo ? bg.color.value : "transparent"}>
          <DateBox>
            <Select onPress={() => this._toggleModal("date")}>   
              <CommonText>날짜</CommonText>      
              <CommonText>{startDate ? startDate : ''} {finishDate ? '- ' + finishDate : ''}</CommonText>
            </Select>
          </DateBox>
          <TitBox>
            <Row> 
              <CommonText>제목</CommonText>
              <TitInput
                onChangeText={(title) => this.setState({title})}
                value={title}
                maxLength={45}
                autoFocus={true}
                selectionColor="#fff"
                placeholder="45이내로 입력해 주세요."
                multiline={true}   
                numberOfLines={2}
              />
             </Row> 
          </TitBox>
          <WeatherBox>
            <Select onPress={() => this._toggleModal("weather")}>
              <CommonText>날씨</CommonText>
              {weather.name ? 
                (<MaterialCommunityIcons name={weather.name} size={17} color="#fff" />)  : ''};
            </Select>
          </WeatherBox>
          <Row justifyEnd>
            <Btn onPress={() => this._toggleModal("bg")}>
              <Entypo name="dots-three-vertical" color="#fff" size={25} /> 
            </Btn>
          </Row>
        </HeaderConBox>
        <TextareaBox>
          <Textarea
            multiline={true}
            onChangeText={(contents) => this.setState({contents})}
            placeholder="당신의 여행은 어땠나요?"
            placeholderStyle={{color:"#999", fontSize:15}}
            value={this.state.text}/>
        </TextareaBox>
      </Wrap>
    )
  }
}
    
const Wrap = styled.View`
  flex: 1;
`;


const HeaderConBox = styled.View`
  padding: 7%; 
  background: ${props => props.background};
`;

const Select = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: ${props => props.justifyEnd ? "flex-end" : "flex-start"};
`;

const DateBox = styled.View`
`;

const CommonText = styled.Text`
  margin-right:10px;
  font-family: 'hd-bold';
  color:#fff;
  font-size:17px;
  font-weight:500;
`;


const WeatherBox = styled.View`
  margin-bottom:25px;
`;

const TitBox = styled.View`
  margin: 25px 0;
`;

const TitInput = styled.TextInput`
  padding:0;
  width: 90%;
  color: #fff;
  font-size:17px;
  font-family: 'hd-regular';
`;

const Btn = styled.TouchableOpacity`
`;

const TextareaBox = styled.View`
  flex: 1;
  padding:7%;
`;

const Textarea = styled.TextInput`
  color: #333;
  font-size:15px;
  font-family: 'hd-regular';
`;

const ModalHeader = styled.View`
  padding: 10px 7%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #eee;
  border-bottom-width: 1px;
  background: #fff;
`
const ModalTit = styled.Text`
  color:#999;
  font-family: 'hd-regular';
  font-size:15px;
`;