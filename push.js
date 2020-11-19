const webpush = require('web-push');

const vapidKeys = {
    "publicKey":"BC1i31G5IhBQl7-dJFOvwTmXDzstbSjsAAs070g5Uk_N1B3MSKF2ovwL4qjls5iqQ1_l1pIg2UULDHi-Zq4A1wA",
    "privateKey":"8vLoNcuu-P7ypQQsC1YQsUEekwM98fEGZHHdTJQahII"
};

webpush.setGCMAPIKey('AAAA161MlDM:APA91bFI6vGEA1-I35uMfZvVND7cIknliuzWTSAoMaej-DEzQ7ecbbOPwCBPsahhlkvtsUiYoED2vHLoIpUlgbKqkHjKjNUesNkPfcVlbiDofbOSGsVTh27eG0bQY8mipQ4PFZDtVqbd')
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscribtion = {
    endpoint : 'https://fcm.googleapis.com/fcm/send/d5osFr--YMc:APA91bFLwzhm1G248tJ63o7WMEX1_fA-m2r1sCP6OqqhyR1jWsydn6THYSRmAsl0FY4e2188uUwMGRsPdyHnRudLPvGvbKBXYiMXbsNv6WnVZ7L2Roe74hv4BZNkzSUZ9XBhsHDIHVdh',
    keys : {
        auth : 'rzmD2w23wHMA6tX9/OTyeA==',
        p256dh : 'BBiNv99qKn93uWm98xQLwZY4cAOONvGUZ8XotT/e2JiRcHzXcaQjFT5PGzuc1LF4YpZrMWlJ+paVJoeBhjgbHmY='
    }
}

webpush.sendNotification(pushSubscribtion, 'Payload body From Server')