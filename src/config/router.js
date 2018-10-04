import React from "react";
import { Platform, StatusBar, HeaderRight, StyleSheet, Button, Image } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import Landing from "../components/screens/Landing/landing";
import Verify from "../components/screens/Landing/verify";
import Otp_Verify from "../components/screens/Landing/otp_verify";
import Login from "../components/screens/Landing/login";
import Register from "../components/screens/Landing/register";
import Forgot from "../components/screens/Landing/forgot";
import Dashboard from "../components/screens/Dashboard/dashboard";
import Menu from "../components/screens/Dashboard/menu";
import Shopping from "../components/screens/Dashboard/shopping";
import Address from "../components/screens/Tabs/address";
import Password from "../components/screens/Tabs/password";
import Notifications from "../components/screens/Tabs/notifications";
import Profile from "../components/screens/Tabs/profile";
import Requests from "../components/screens/Tabs/requests";
import Number from "../components/screens/Tabs/number";
import Orders from "../components/screens/Tabs/orders";
import Newsim from "../components/screens/Activity/newsim";
import Sims from "../components/screens/Activity/sim";


const headerStyle = {

};

export const SignedOut = StackNavigator({

    Landing: {
        screen: Landing,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: "Log In",
            header: null,
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Forgot: {
        screen: Forgot,
        navigationOptions: {
            title: "Log In",
            header: null,
        }
    },
    Verify: {
        screen: Verify,
        navigationOptions: {
            title: "Log In",
            header: null,
        }
    },
    Otp_Verify: {
        screen: Otp_Verify,
        navigationOptions: {
            title: "Log In",
            header: null,
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
});



export const SignedIn = StackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Menu: {
        screen: Menu,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Shopping: {
        screen: Shopping,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Notifications: {
        screen: Notifications,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Requests: {
        screen: Requests,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Address: {
        screen: Address,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Password: {
        screen: Password,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Orders: {
        screen: Orders,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Number: {
        screen: Number,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Sims: {
        screen: Sims,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Newsim: {
        screen: Newsim,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
    Landing: {
        screen: Landing,
        navigationOptions: {
            title: "Welcome",
            header: null,
        }
    },
},
    {
        initialRouteName: 'Dashboard',
    }
);




export const createRootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: SignedIn,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: SignedOut,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};

