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

            newPasswordRequired: (userAttributes) => {

                delete userAttributes.email_verified;

                const newPassword = prompt("Enter new password");

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