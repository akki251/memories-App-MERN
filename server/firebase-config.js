import admin from 'firebase-admin';

let serviceAccount = await import('./serviceAccountKey.js');

serviceAccount = serviceAccount.default;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
