/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import NotifService from './NotifService';
import appConfig from './app.json';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID
    };

    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ReactNative本地推送通知的例子</Text>
        <View style={styles.spacer}/>
        <TextInput style={styles.textField} value={this.state.registerToken} placeholder="Register token" />
        <View style={styles.spacer}/>

        <TouchableOpacity style={styles.button} onPress={() => { this.notif.localNotif() }}><Text>本地通知(现在)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.scheduleNotif() }}><Text>30秒内发出进度通知</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelNotif() }}><Text>取消上次通知(如有)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelAll() }}><Text>取消所有通知</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.checkPermission(this.handlePerm.bind(this)) }}><Text>检查权限</Text></TouchableOpacity>

        <View style={styles.spacer}/>
        <TextInput style={styles.textField} value={this.state.senderId} onChangeText={(e) => {this.setState({ senderId: e })}} placeholder="GCM ID" />
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.configure(this.onRegister.bind(this), this.onNotif.bind(this), this.state.senderId) }}><Text>配置发送方ID</Text></TouchableOpacity>
        {this.state.gcmRegistered && <Text>GCM配置!</Text>}

        <View style={styles.spacer}/>
      </View>
    );
  }

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%"
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }
});
