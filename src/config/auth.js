import { AsyncStorage } from "react-native";

async function onSignIn(username, id){
  console.log(username, id)
  AsyncStorage.setItem("USER_NAME", String(username));
  AsyncStorage.setItem("USER_ID", String(id));
  let USER_ID = await AsyncStorage.getItem("USER_ID");
  let USER_NAME = await AsyncStorage.getItem("USER_NAME");
  console.log(USER_ID, USER_NAME)
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("USER_ID")
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}

export const addAsyncStorage = (data) => {
  return new Promise((resolve, reject)=>{
    var i = 0;
    Object.keys(data).map(key=>{
      console.log(key, data[key])
      AsyncStorage.setItem(key, data[key])
      .then(res => {
          i++;
      })
      .catch(err => reject({status:false, 'err':err,'message':'error in storing'}));
    })
    //console.log(Object.keys(data).length, i)
    resolve({
      status:true,
      'message':'Successfully stored',
    })
  });
}
export const getAllAsyncStroage = () => {
  return new Promise((resolve, reject)=>{
    AsyncStorage.getAllKeys()
    .then(ks =>
    {
      console.log(ks)
      if(!ks.length){
        resolve ({data:ks,status:false});
      }else{
        var array = [];
        ks.map(async k =>
        {
          let key = k;
          array.push(
          {
            key:k,
            value:await AsyncStorage.getItem(k)
          })
        })
        resolve({data:array, status:true})
      }
    })
  })
}

export const onSignOut = () => {
  console.log('removing asyunc storage')
  AsyncStorage.removeItem("USER_NAME");
  AsyncStorage.removeItem("USER_ID");
  AsyncStorage.removeItem("PROFILE_IMAGE");
  AsyncStorage.removeItem("PROFILE_IMAGE");
  //AsyncStorage.removeItem("DEVICE_ID");
}
export const removeBLE = () => {
  console.log('removing ble storage')
  AsyncStorage.removeItem("DEVICE_NAME");
  AsyncStorage.removeItem("DEVICE_ID");
}
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("USER_ID")
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const SERVER_URL = "http://resoltzphase3.centralindia.cloudapp.azure.com/api/v1/"

export { onSignIn };
