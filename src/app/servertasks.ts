
import { uploadData, downloadData, list, getUrl } from "aws-amplify/storage";
import { Amplify } from 'aws-amplify';
// import awsconfig from '../aws-exports';
// import config from '../amplifyconfiguration.json'

//Amplify.configure(config);

//public\606cymb.wav

export async function downloadToMemory(s3Path: string){
    const { body, eTag } = await downloadData({
        key: '9th Wonder Kit/hat1.wav',
        options: {
            accessLevel: 'guest',
        },
    }).result;

    
    return (await body.blob()).arrayBuffer();
    
    
}


export async function getS3URL(s3Path: string){
    const { url } = await getUrl({
        key: s3Path,
        options: {
            accessLevel: 'guest',
            validateObjectExistence: true
        }
    })
    return url;
}

export async function check( ){
    
    // const _list = await list({
    //     prefix: '9th Wonder Kit/',
    
    //     options: {accessLevel: 'guest', listAll: true},
    // });
    // console.log(_list);

    //return


    const path = 'public/606cymb.wav'
    const path2 = '9th Wonder Kit/hat1.wav'

    const getUrlResult = await getUrl({
        key: path2,
        options: {
            accessLevel: 'guest',
            validateObjectExistence: true
        }
    })
    console.log(getUrlResult);

    // try {
    //     const result = await uploadData({
    //         key: '606cymb.wav',
    //         data: path,
    //         options: {
    //             accessLevel: 'guest',
    //         }
    //     }).result;
    //     console.log(result);
    // } catch (error) {
    //     console.log(error);
    // }
    // console.log("Server");
}
export const uploadDataInBrowser = async (event:any) => {
    console.log("event =", event)
    try {
        if (event?.target?.files) {
            const file = event.target.files[0];
            uploadData({
              key: 'test.wav',
              data: file
            });
            console.log("file uploaded")
          }
    } catch (error) {
        console.log(error);
    }
    
  };

  