import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from 'react-native-google-signin';
import {useAppDispatch} from '../../redux/hooks';
import {setUserInfo} from '../../redux/userInfo/slice';
import {styles} from './Login.styles';

interface LoginScreenProps {}

GoogleSignin.configure({
  webClientId: '54525208022-l7o7rfv7sa31ks8nai4p745oq3ikoqr6.apps.googleusercontent.com',
  iosClientId: '54525208022-lsjdgktu5nn7q0ken7p2dkvscnjg2tne.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: '',
  forceConsentPrompt: true,
});

const LoginScreen = memo(({}: LoginScreenProps) => {
  const dispatch = useAppDispatch();

  const onSignInByGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({
        // platform: Android, check device has GGPlay Services
        // resolve true on IOS
        showPlayServicesUpdateDialog: true,
      });
      const {user, idToken}: User = await GoogleSignin.signIn();
      //   user: {
      //   id: string;
      //   name: string | null;
      //   email: string;
      //   photo: string | null;
      //   familyName: string | null;
      //   givenName: string | null;
      // };
      // scopes?: string[];
      // idToken: string | null;
      console.log('user info: ', user, idToken);
      
      dispatch(
        setUserInfo({
          avatar: user.photo,
          userId: user.id,
          token: idToken,
          isLogged: true,
        }),
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancel login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in...');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available or outdate...');
      } else {
        console.log('error: ', error.message);
      }
    }
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.btnGGSignIn}
        color={GoogleSigninButton.Color.Dark}
        onPress={onSignInByGoogle}
        size={GoogleSigninButton.Size.Wide}
      />
    </View>
  );
});

export default LoginScreen;
