/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import Capp from './images/capp.png';
import Espresso from './images/espresso.png';
import Latte from './images/latte.png';

class Home extends Component {
  state = {
    items: [
      {name: 'Cafe Au Lait', time: 4, itemid: 1},
      {name: 'Cappuccino', time: 10, itemid: 2},
      {name: 'Expresso', time: 15, itemid: 3},
    ],
    inProgress: false,
    currentOrder: null,
    ordersList: [],
    currentSeconds: 0,
  };

  timer = null;
  progressTimer = null;

  componentDidMount() {}

  orderItem = (item) => {
    console.log('order: ' + JSON.stringify(item));

    if (!this.state.inProgress) {
      this.state.currentOrder = item;

      this.startOrderTimer(item);
    } else {
      let currentList = this.state.ordersList.slice();

      currentList.push(item);

      this.setState({
        ordersList: currentList,
      });

      console.log('ordersList: ' + JSON.stringify(this.state.ordersList));
    }
  };

  startOrderTimer(item) {
    let time = 1000 * item.time;
    this.timer = setTimeout(this.orderDone, time);

    this.setState({
      inProgress: true,
    });

    progressTimer = setInterval(this.tick, 1000);

    this.setState({currentSeconds: item.time});
  }

  tick = () => {
    let newTime = this.state.currentSeconds;
    newTime--;

    this.setState({
      currentSeconds: newTime,
    });
  };

  orderDone = () => {
    clearInterval(progressTimer);

    this.setState({
      inProgress: false,
    });

    this.state.ordersList.shift();

    if (this.state.ordersList.length > 0) {
      let nextItem = this.state.ordersList[0];

      console.log('start next order: ' + JSON.stringify(nextItem));

      this.startOrderTimer(nextItem);
    } else {
      alert('Orders completed!');

      console.log('orders: ' + JSON.stringify(this.state.ordersList));
    }
  };

  checkNextOrder = () => {};

  listItem = ({item}) => {
    var image;

    if (item.itemid == 1) {
      image = Latte;
    } else if (item.itemid == 2) {
      image = Capp;
    } else {
      image = Espresso;
    }

    return (
      <View style={[styles.listitem2]} onPress={() => this.selectGame(item)}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between',
            height: 60,
            marginTop: 20,
            alignItems: 'center',
          }}>
          <Image source={image} style={{marginRight: 20}} />

          <Text
            style={{
              marginRight: 20,
              fontFamily: 'Helvetica',
              fontSize: 20,
              color: '#2D140D',
            }}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={() => this.orderItem(item)}>
            <Text
              style={{
                color: 'white',
                overflow: 'hidden',
                height: 50,
                fontSize: 25,
                borderRadius: 25,
                width: 50,
                backgroundColor: '#CF9775',
                textAlign: 'center',
                paddingTop: 6,
                fontWeight: 'bold',
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        <View style={{backgroundColor: '#FAF4EE', padding: 20}}>
          <Text style={{fontSize: 36, fontFamily: 'Helvetica', marginTop: 30}}>
            It's a great
          </Text>
          <Text
            style={{
              fontSize: 36,
              fontFamily: 'Helvetica',
              fontWeight: 'bold',
              color: '#B98875',
            }}>
            Day for coffee.
          </Text>
          <View style={styles.body}>
            <Text
              style={{
                fontFamily: 'Helvetica',
                fontSize: 20,
                color: '#2D140D',
                fontWeight: 'bold',
              }}>
              Orders in Queue: {this.state.ordersList.length}
            </Text>
            <Text
              style={{fontFamily: 'Helvetica', fontSize: 18, color: '#2D140D'}}>
              Order timer: {this.state.currentSeconds}
            </Text>
            <FlatList
              style={styles.list}
              data={this.state.items}
              renderItem={this.listItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Home);

const styles = StyleSheet.create({
  list: {marginTop: 20},
  body: {
    marginTop: 50,
  },
});
