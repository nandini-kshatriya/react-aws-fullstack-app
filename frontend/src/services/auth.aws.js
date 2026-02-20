import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import config from '../config/aws-exports';

const poolData = {
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.userPoolWebClientId
};

const userPool = new CognitoUserPool(poolData);

/**
 * Sign up a new user
 * @param {string} username 
 * @param {string} password 
 * @param {string} email 
 * @returns {Promise<any>}
 */
export const signUp = (username, password, email) => {
    return new Promise((resolve, reject) => {
        const attributeList = [];

        const dataEmail = {
            Name: 'email',
            Value: email,
        };

        const attributeEmail = new CognitoUserAttribute(dataEmail);
        attributeList.push(attributeEmail);

        userPool.signUp(username, password, attributeList, null, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result.user);
        });
    });
};

/**
 * Log in an existing user
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<any>}
 */
export const login = (username, password) => {
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
                resolve(result);
            },
            onFailure: (err) => {
                reject(err);
            },
        });
    });
};

/**
 * Log out the current user
 * @returns {void}
 */
export const logout = () => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.signOut();
    }
};

/**
 * Get the currently authenticated user
 * @returns {Promise<any>}
 */
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    reject(err);
                    return;
                }

                cognitoUser.getUserAttributes((err, attributes) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({
                        user: cognitoUser,
                        session: session,
                        attributes: attributes
                    });
                });
            });
        } else {
            resolve(null);
        }
    });
};

export default {
    signUp,
    login,
    logout,
    getCurrentUser
};
