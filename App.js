/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

// const instructions = Platform.select({
//     ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//     android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// GoogleSignin.signIn()
// .then((user) => {
//   console.log(user);
//   this.setState({user: user});
// })
// .catch((err) => {
//   console.log('WRONG SIGNIN', err);
// })
// .done();

export default class App extends Component {
    constructor(props) {
        super(props);
        GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            // play services are available. can now configure library
        })
        .catch((err) => {
          console.log("Play services error", err.code, err.message);
        })
    }

    componentDidMount() {
        GoogleSignin.configure({
            scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
            accountName: '' // [Android] specifies an account name on the device that should be used
        })
            .then(() => {
                GoogleSignin.currentUserAsync().then((user) => {
                    console.log('USER', user);
                    this.setState({user: user});
                  }).done();
            });
    }

    _signIn() {
        GoogleSignin.signIn()
            .then((user) => {
                console.log(user);
                this.setState({ user: user });
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
    }

    _signOut() {
        GoogleSignin.signOut()
            .then(() => {
                console.log('out');
            })
            .catch((err) => {
            
            });
    }

    render() {
        return (
            <View>
                <GoogleSigninButton
                    style={{ width: 240, height: 48 }}
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn.bind(this)} />

                <TouchableOpacity onPress={this._signOut.bind(this)} >
                    <Text>
                        signOut
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });
