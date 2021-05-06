const notifications = require('../../controllers/utils/notificationSender');

module.exports = async (req, res) => {
    try{
        notifications.sendDailyNotifications() ;
        return res.status(200).json({
            res: "ok"
        });
    }
    catch(e){
        return res.status(500).json({
            error : "Impossible d'envoyer les notifications"
        });
    }
};


        
