import API from './API';

export const uploadImage = async (formData, imgCategory, imageType) => {
    return API({
        method: 'POST',
        url: `profile/uploadPicture?image_category=${imgCategory}&image_viewtype=${imageType}`,
        data: formData,
        headers: {

        },
    }).then((res) => {
        return res;
    });
};
