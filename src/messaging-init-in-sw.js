import { initializeApp } from "firebase/app";
import { getMessaging, getToken  } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyBL9oIzk1F82Sc0QnCa-VuEavUerdKWp3U",
  authDomain: "find-me-c82e9.firebaseapp.com",
  projectId: "find-me-c82e9",
  storageBucket: "find-me-c82e9.appspot.com",
  messagingSenderId: "47113311084",
  appId: "1:47113311084:web:51acb04aff33636fc4d949",
  measurementId: "G-Q95SN20QJN"
};




export function requestPermission(setState) {
    // console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // console.log('Notification permission granted.')
        const app = initializeApp(firebaseConfig);


        const messaging = getMessaging(app);
        
        getToken(messaging, {vapidKey: "BNs7nmzum7dyoK8qmkZJ0xjEkHqnFYNXV0JzDSScwnKnbREk6s9BxZh68rT6ovr7qoWzsWVi2HtgsT0Uoakaf4E"})
        .then((currentToken) => {
            if(currentToken){
                // console.log("current token : ", currentToken)
                setState(currentToken);
            }else{
                // console.log("can not get token")
            }
        })
        
    }
    else{
        // console.log("dont have permission")
    }
    }
    )}

