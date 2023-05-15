
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp();
const db = admin.firestore();

exports.createUserDoc = functions.auth.user().onCreate(async (user) => {
    const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerData: user.providerData
    }
    db.collection('users').doc(user.uid).set(newUser)
})

// add on delete function

// add on update function






