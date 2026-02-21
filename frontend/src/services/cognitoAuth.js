import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
} from "amazon-cognito-identity-js";

import { cognitoConfig } from "../cognitoConfig";

// ✅ Create pool FIRST
const poolData = {
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId
};

const userPool = new CognitoUserPool(poolData);

// ✅ SIGN IN FUNCTION
export const signIn = (username, password) => {
    return new Promise((resolve, reject) => {

        const authenticationDetails = new AuthenticationDetails({
            Username: username,
            Password: password,
        });

        const userData = {
            Username: username,
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {

            onSuccess: (result) => {
                console.log("Login success", result);
                resolve(result);
            },

            onFailure: (err) => {
                console.error("Login error", err);
                reject(err);
            },

            newPasswordRequired: () => {

                const newPassword = prompt(
                    "Enter your new password (min 8 chars, 1 uppercase, 1 number)"
                );

                if (!newPassword) {
                    reject(new Error("Password change cancelled"));
                    return;
                }

                cognitoUser.completeNewPasswordChallenge(
                    newPassword,
                    {},
                    {
                        onSuccess: (result) => {
                            console.log("Password updated & login success", result);
                            resolve(result);
                        },
                        onFailure: (err) => {
                            console.error("Password update error", err);
                            reject(err);
                        }
                    }
                );
            }
        });
    });
};

// ✅ LOGOUT
export const logout = () => {
    const user = userPool.getCurrentUser();
    if (user) user.signOut();
};