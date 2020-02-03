// Give the service worker access to Firebase Messaging.
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  messagingSenderId: "777968545329"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  return clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        let n = {
          id: payload.data.id,
          title: payload.data.title,
          body: payload.data.body,
          redirectTo: payload.data.redirectTo,
          viewed: payload.data.viewed,
          payload: payload.data.payload,
          icon: payload.data.icon,
          emittedTime: payload.data.emittedTime
        };
        windowClient.postMessage(n);
      }
    })
    .then(() => {
      var notificationTitle = payload.data.title;
      var notificationOptions = {
        body: payload.data.body,
        icon: "./assets/images/fcm-icon.jpg"
      };

      self.addEventListener('notificationclick', function (event) {
        let url = '/#/' + payload.data.redirectTo;
        event.notification.close(); // Android needs explicit close.
        event.waitUntil(
          clients.matchAll({includeUncontrolled: true, type: 'window'}).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // If so, just focus it.
              if (client.url.includes(url) && 'focus' in client) {
                return client.focus();
              }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
              return clients.openWindow(url);
            }
          })
        );
      });

      return self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
});
