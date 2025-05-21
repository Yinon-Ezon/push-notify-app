self.addEventListener('push', function(event) {
  const data = event.data ? event.data.text() : 'יש תוכן חדש באפליקציה!';
  const title = 'התראה יומית';
  const options = {
    body: data,
    icon: 'icon.png',
    badge: 'badge.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});
