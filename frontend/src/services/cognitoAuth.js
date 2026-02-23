import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserAttribute
} from "amazon-cognito-identity-js";

import { cognitoConfig } from "../cognitoConfig";

const poolData = {
    UserPoolId: cognitoConfig.UserPoolId,
    ClientId: cognitoConfig.ClientId
};

const userPool = new CognitoUserPool(poolData);





// ================= SIGNUP =================
export const signUp = (email, password) => {
    return new Promise((resolve, reject) => {

        const attributeList = [];

        const emailAttribute = new CognitoUserAttribute({
            Name: "email",
            Value: email
        });

        attributeList.push(emailAttribute);

        userPool.signUp(email, password, attributeList, null, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            console.log("Signup success", result.user);
            resolve(result.user);
        });
    });
};



// ================ Verify ================
export const confirmSignUp = (username, code) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}



// ================= LOGIN =================
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

            newPasswordRequired: (userAttributes) => {

                delete userAttributes.email_verified;

                const newPassword = prompt(
                    "Enter new password (min 8 chars, 1 uppercase, 1 number)"
                );

                if (!newPassword) {
                    reject(new Error("Password change cancelled"));
                    return;
                }

                cognitoUser.completeNewPasswordChallenge(
                    newPassword,
                    userAttributes,
                    {
                        onSuccess: resolve,
                        onFailure: reject
                    }
                );
            }
        });
    });
};




// ================= LOGOUT =================
export const logout = () => {
    const user = userPool.getCurrentUser();
    if (user) user.signOut();
};

// ================ Helper ==============
export const getCurrentUserToken = () => {
  return new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();

    if (!user) {
      reject("No user found");
      return;
    }

    user.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(session.getIdToken().getJwtToken());
    });
  });
};