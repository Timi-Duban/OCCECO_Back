const { Expo } = require('expo-server-sdk');
const moment = require('moment');
const UserController = require('../userController');

const sendDailyNotifications = async () => {
    console.log("\n\n\n  ---  Sending Notifications  ---");
    // Create a new Expo SDK client
    // optionally providing an access token if you have enabled push security
    let expo = new Expo(/*{ accessToken: process.env.EXPO_ACCESS_TOKEN }*/);

    // Import all users ID, tokens and notifications
    let allUsers = await UserController.getAllUsers();
    
    // Create the messages that you want to send to clients by group of 100
    let messages = [[]];
    
    // For each user get all notifications of the day
    for (let aUser of allUsers) {
        if (aUser.userArticlesLinked.length > 0) {
            let hisNotifications = await filterNotifications(aUser.userArticlesLinked);
            // For each notification, send it to each user's token.
            for (let oneNotification of hisNotifications) {
                for (const pushToken of aUser.userPushTokens) {
                    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

                    // Check that all your push tokens appear to be valid Expo push tokens
                    if (!Expo.isExpoPushToken(pushToken)) {
                        console.error(`Push token ${pushToken} is not a valid Expo push token. Deleting...`);
                        UserController.deleteUserPushTokenById(aUser._id, pushToken)
                        continue;
                    }

                    // Verify messages length to avoid sending more than 100 messages at a time (expo limit)
                    if (messages[messages.length - 1].length > 98) {
                        messages.push([])
                    }

                    let body = oneNotification.articleId.isEvent
                        ? moment(oneNotification.articleId.articleDateEvent).format("dddd, MMMM Do YYYY")
                        : oneNotification.articleId.articleCategories.length > 0
                            ? oneNotification.articleId.articleCategories[0].nameType
                            : ""
                    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
                    messages[messages.length - 1].push({
                        to: pushToken,
                        title: oneNotification.articleId.articleTitle,
                        ttl: 80000, // notification is sent up to 24h after the sending date if not delivered yet
                        body: body,
                        // data: { withSome: 'data' },
                    })
                }
            }
        }
    }
    console.log("notificationSender - messages ", messages);

    // Send and handle responses of 100 notifications at a time
    for (let indiceMessages = 0; indiceMessages < messages.length; indiceMessages++) {
        // The Expo push notification service accepts batches of notifications so
        // that you don't need to send 1000 requests to send 1000 notifications. We
        // recommend you batch your notifications to reduce the number of requests
        // and to compress them (notifications with similar content will get
        // compressed).
        let chunks = expo.chunkPushNotifications(messages[indiceMessages]);
        let tickets = [];
        let idTicketsToToken = {};
        (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log("notificationSender - ticketChunk ", ticketChunk);
                    tickets.push(...ticketChunk);
                    // NOTE: If a ticket contains an error code in ticket.details.error, you
                    // must handle it appropriately. The error codes are listed in the Expo
                    // documentation:
                    // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                    for (let indiceTicket = 0; indiceTicket < ticketChunk.length; indiceTicket++) {
                        const ticket = ticketChunk[indiceTicket];
                        if (ticket.id) {
                            idTicketsToToken[ticket.id] = chunk[indiceTicket].to
                        }
                        if (ticket.details && ticket.details.error) {
                            // These are Push ticket errors
                            switch (ticket.details.error) {
                                case 'DeviceNotRegistered':
                                    console.log("notificationSender - ticket error - device not registered : ", ticket);
                                    UserController.deleteUserPushToken(chunk[indiceTicket].to)
                                    break;
                                default:
                                    console.log("notificationSender - ticketChunk - ticket error unhandled : ", ticket);
                            }
                        }
                    }
                } catch (error) {
                    console.error("notificationSender - request error.\nSee https://docs.expo.io/push-notifications/sending-notifications/#request-errors\n ", error);
                }
            }
            console.log("notificationSender - sending tickets : ", tickets);
            console.log("notificationSender - idTicketsToToken : ", idTicketsToToken);
        })();

        // Later, after the Expo push notification service has delivered the
        // notifications to Apple or Google (usually quickly, but allow the the service
        // up to 30 minutes when under load), a "receipt" for each notification is
        // created. The receipts will be available for at least a day; stale receipts
        // are deleted.
        //
        // The ID of each receipt is sent back in the response "ticket" for each
        // notification. In summary, sending a notification produces a ticket, which
        // contains a receipt ID you later use to get the receipt.
        //
        // The receipts may contain error codes to which you must respond. In
        // particular, Apple or Google may block apps that continue to send
        // notifications to devices that have blocked notifications or have uninstalled
        // your app. Expo does not control this policy and sends back the feedback from
        // Apple and Google so you can handle it appropriately.
        let receiptIds = [];
        for (let ticket of tickets) {
            // NOTE: Not all tickets have IDs; for example, tickets for notifications
            // that could not be enqueued will have error information and no receipt ID.
            if (ticket.id) {
                receiptIds.push(ticket.id);
            }
        }
        let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
        (async () => {
            // Like sending notifications, there are different strategies you could use
            // to retrieve batches of receipts from the Expo service.
            for (let chunk of receiptIdChunks) {
                try {
                    let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                    console.log("notificationSender - receipts ", receipts);

                    // The receipts specify whether Apple or Google successfully received the
                    // notification and information about an error, if one occurred.
                    for (let receiptId in receipts) {
                        let { status, message, details } = receipts[receiptId];
                        if (status === 'error') {
                            console.error(
                                'There was an error sending a notification: ${message}'
                            );
                            if (details && details.error) {
                                // The error codes are listed in the Expo documentation:
                                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                                // You must handle the errors appropriately.
                                switch (details.error) {
                                    // These are Push receip errors
                                    case 'DeviceNotRegistered':
                                        console.log("device not registered : ", details.error);
                                        UserController.deleteUserPushToken(idTicketsToToken[receiptId])
                                        break;
                                    case 'MessageTooBig':
                                        console.log("notificationSender - receiptIdChunks - ticket error : ", details.error);
                                        break;
                                    case 'MessageRateExceeded':
                                        console.log("notificationSender - receiptIdChunks - ticket error : ", details.error);
                                        break;
                                    case 'MismatchSenderId':
                                        console.error("FCM issue, see https://docs.expo.io/push-notifications/sending-notifications/#push-ticket-errors");
                                        console.log("notificationSender - receiptIdChunks - ticket error : ", details.error);
                                        break;
                                    case 'InvalidCredentials':
                                        console.error("Credentials issue, see https://docs.expo.io/push-notifications/sending-notifications/#push-ticket-errors");
                                        console.log("notificationSender - receiptIdChunks - ticket error : ", details.error);
                                        break;
                                    default:
                                        console.log("notificationSender - receiptIdChunks - ticket error unhandled : ", details.error);
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }
}

const filterNotifications = async (notifications) => {
    const today = moment();
    if (!notifications) {
        return [];
    }
    let returnNotifications = [];
    for (let notification of notifications) {
        if (notification.articleId.articleStartDate && today.isSame(notification.articleId.articleStartDate, 'day')) {
            returnNotifications.push(notification)
        }
    }
    return returnNotifications;
}

module.exports = {
    sendDailyNotifications,
}