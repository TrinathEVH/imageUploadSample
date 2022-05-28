import React, {Component} from 'react';
import {Dimensions,FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import SaveButton from './components/SaveButton';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from './components/theme/Color';
import IconEntypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';

const {width, height} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadList: [],
        };
    }

    selectOptionType = name => {
        if (name === 'Camera') {
            ImagePicker.launchCamera(
                {mediaType: 'photo', includeBase64: false},
                response => {
                    if (response) {
                        const {uploadList} = this.state;
                        uploadList.push(response);
                        this.setState({uploadList: [...uploadList]});
                    }
                },
            );
        } else if (name === 'Gallery') {
            ImagePicker.launchImageLibrary(
                {mediaType: 'photo', includeBase64: false},
                response => {
                    console.log(response);
                    if (response) {
                        console.log(response.assets);
                        const uploadList = [];
                        uploadList.push(response.assets[0]);
                        this.setState({uploadList: uploadList});
                    }
                },
            );
        }
    };

    uploadImages = (image) => {
        let formData = new FormData();
        formData.append('file', {
            name: image.fileName,
            type: image.type,
            uri: image.uri,
        });
        axios.post('http://192.168.29.242:5000/upload' ,formData ,
            {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(response => {
            if (response.status === 200 ) {
                console.log(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    };

    renderUploadImages = (item, index) => {
        return (
            <TouchableOpacity key={index} style={styles.imageContainer}>
                <Image
                    style={styles.imageStyle}
                    resizeMode="cover"
                    source={{uri: item.uri}}
                />
                <TouchableOpacity onPress={() => this.setState({closeModalClicked: true})}
                                  style={styles.imageDelete}>
                    <IconEntypo name="circle-with-cross" size={22} color={Color.red}/>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    render() {
        const {uploadList} = this.state;
        return (
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity
                        onPress={() => this.selectOptionType('Camera')}
                        style={styles.uploadButtonContainer}>
                        <IconMaterialIcons
                            name="camera"
                            size={25}
                            color={Color.white}
                            style={{paddingRight: 10}}
                        />
                        <Text style={styles.uploadButtonText}>Camera</Text>
                    </TouchableOpacity>
                    <View style={{flex: 0.01}}/>
                    <TouchableOpacity
                        onPress={() => this.selectOptionType('Gallery')}
                        style={styles.uploadButtonContainer}>
                        <IconEntypo
                            name="folder-images"
                            size={25}
                            color={Color.white}
                            style={{paddingRight: 10}}
                        />
                        <Text style={styles.uploadButtonText}>Folder</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {uploadList.length > 0
                        ?
                        <FlatList
                            data={uploadList}
                            keyExtractor={item => item.key}
                            contentContainerStyle={styles.rowFlexWrap}
                            renderItem={({item, index}) => this.renderUploadImages(item, index)}
                        />
                        :
                        <View style={styles.dummyImageContainer}>
                            <Image
                                style={styles.imageStyle}
                                resizeMode="cover"
                                source={require('./components/Image/noImage.jpg')}
                            />
                        </View>
                    }
                    {uploadList.length > 0 &&
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                        <SaveButton onPress={() => this.uploadImages(uploadList[0])}/>
                    </View>}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowFlexWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    uploadButtonContainer: {
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 30,
        margin: 10,
        backgroundColor: Color.blue,
        borderRadius: 5,
        flexDirection: 'row',
    },
    uploadButtonText: {
        color: Color.white,
        fontWeight: 'bold',
    },
    dummyImageContainer: {
        maxHeight: windowHeight * 0.5,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 2,
        paddingTop: 4,
    },
    imageDelete: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 5,
    },
    imageContainer: {
        maxHeight: 200,
        width: width - 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    imageIcon: {
        width: 45,
        height: 45,
    },
});

export default App;
