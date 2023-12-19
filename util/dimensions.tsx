import { Dimensions } from 'react-native';

export const getScreenWidth = (): number => Dimensions.get('window').width;
export const getScreenHeight = (): number => Dimensions.get('window').height;
