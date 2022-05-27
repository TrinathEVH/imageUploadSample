import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NeomorphBlur} from 'react-native-neomorph-shadows';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Color} from './theme';

export default function SaveButton(props) {
    return (
        <NeomorphBlur
            inner
            style={{
                width: props.outerWidth ? props.outerWidth : 106,
                height: 45,
                shadowRadius: 2,
                shadowOffset: {width: 4, height: 4},
                borderRadius: 20,
                backgroundColor: props.neoColor,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <NeomorphBlur
                inner
                style={{
                    width: props.innerWidth ? props.innerWidth : 103,
                    height: 40,
                    shadowRadius: 4,
                    shadowOffset: {width: -4, height: -4},
                    borderRadius: 15,
                    backgroundColor: props.neoColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                }}>
                <TouchableOpacity onPress={props.onPress}>
                    <NeomorphBlur
                        inner
                        style={{
                            width: props.buttonWidth ? props.buttonWidth : 100,
                            height: 35,
                            shadowRadius: 4,
                            shadowOffset: {width: 2, height: 2},
                            borderRadius: 15,
                            backgroundColor: props.neoColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            {props.children}
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: '700',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'baseline',
                                }}>
                                {props.title ? props.title : 'Save'}
                            </Text>
                        </View>
                    </NeomorphBlur>
                </TouchableOpacity>
            </NeomorphBlur>
        </NeomorphBlur>
    );
}

SaveButton.defaultProps = {
    neoColor: Color.primaryNeo,
    iconColor: Color.blue,
    title: 'Save',
    titleColor: Color.titleColor,
    children: (
        <IconMaterialIcons
            name="check-circle"
            size={19}
            color={Color.blue}
            style={{
                textAlign: 'right',
                paddingRight: 5,
                justifyContent: 'center',
                alignSelf: 'center',
            }}
        />
    ),
};
