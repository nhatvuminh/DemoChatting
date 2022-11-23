import {useNavigation} from '@react-navigation/core';
import React, {memo, useLayoutEffect} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import { GiftedChat } from 'react-native-gifted-chat';
import {useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import database from '@react-native-firebase/database';

interface ChatsScreenProps {}

const ChatsScreen = memo(({}: ChatsScreenProps) => {
  const navigation = useNavigation();
  const {avatar} = useAppSelector((state: RootState) => state.userInfoReducer);
  console.log('avatar: ', avatar);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: avatar!!}}
            style={{width: 30, height: 30, borderRadius: 15}}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <GiftedChat />
    </View>
  );
});
export default ChatsScreen;
