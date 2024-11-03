const TelegramApi = require('node-telegram-bot-api')

const token = '7518505169:AAFaf4yElGjK0kY2lDlje6-KMBS9_vCLX1I'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начально приветствие'},
        {command: '/menu', description: 'menu'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const adminChatID = '7688740205';

        if (msg.contact){
            const phoneNumber = msg.contact.phone_number;
            bot.sendMessage(adminChatID, `Новый контакт: ${msg.from.first_name} ${msg.from.last_name}, номер телефона: ${phoneNumber}`);
            bot.sendMessage(chatId, `Адміністратор звяжеться з вами`)
           }

        if (text === '/start'){
            const stickerId = '🦷';
            const stickerHallo = '👋';
            
            return bot.sendMessage(chatId, `Вітаю вас ${msg.from.first_name} ${msg.from.last_name} ${stickerHallo}\nЯ телеграм бот  ${stickerId}NSClinic \nБудь ласка скористайтесь меню для ознайомлення`);  
        }
    
        const menu = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'наші контакти' , callback_data: 'наші контакти'}, {text: 'про нас' , callback_data: 'про нас'}],
                    [{text: 'чистка' , callback_data: 'чистка'}],
                    [{text: 'коронки' , callback_data: 'коронки'}],
                    [{text: 'протезування' , callback_data: 'протезування'},{text: 'ще якісь послуги' , callback_data: 'ще якісь послуги'},{text: 'брекети' , callback_data: 'брекети'}],
                    [{text: 'ми в соц мережах' , callback_data: 'ми в соц мережах'}],
                    [{text: 'записатись на прийом' , callback_data: 'записатись на прийом'}],
                ]
            })
        }

       

       /* if (text != null){
            console.log(msg);
        } */

            //Game code ->
        if ( text === '/menu'){
           
            return bot.sendMessage(chatId, `Наші послуги: \n`, menu);
        }
        //return bot.sendMessage(chatId, `Будь ласка скористайтесь меню`)
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        
       

        if (data === 'наші контакти'){
            return bot.sendMessage(chatId, `Ми знаходимось за адресою м.Вінниця, вул.Кропивницького 7\n тел. 0934108663\nhttps://www.google.com.ua/maps/place/%D1%83%D0%BB.+%D0%9A%D1%80%D0%BE%D0%BF%D0%B8%D0%B2%D0%BD%D0%B8%D1%86%D0%BA%D0%BE%D0%B3%D0%BE,+7,+%D0%92%D0%B8%D0%BD%D0%BD%D0%B8%D1%86%D0%B0,+%D0%92%D0%B8%D0%BD%D0%BD%D0%B8%D1%86%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+21000/@49.2320882,28.4712829,17z/data=!3m1!4b1!4m6!3m5!1s0x472d5b7aa810dd1d:0x2fdb8fae51628b6!8m2!3d49.2320882!4d28.4738578!16s%2Fg%2F1tlzyyhn?hl=ru&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D`)
        }
        
        if (data === 'про нас'){
            return bot.sendMessage(chatId, 'Наша клініка найкраща клініка у місті де працють найкращі лікарі нашої галактики, ми надаэмо всы види стоматоллогычних послуг, маємо такий то стаж і бла бла бла ваш текст')
        }

        if ( data === 'чистка'){
            return bot.sendMessage(chatId, 'ціна від, яка чистка може бути, як проходить, що використовуєте то що');
        }

        if ( data === 'коронки'){
            return bot.sendMessage(chatId, 'ціна від, які коронки можуть бути, матеріали, плюси мінуси то що');
        }

        if ( data === 'протезування'){
            return bot.sendMessage(chatId, 'ціна від, які протези можуть бути, матеріали, плюси мінуси то що я просто не знаю що тут писати;)');
        }

        if ( data === 'брекети'){
            return bot.sendMessage(chatId, 'ціна від, які брекети можуть бути, матеріали, плюси мінуси то що я просто не знаю що тут писати;)');
        }

        if ( data === 'ми в соц мережах'){
            return bot.sendMessage(chatId, 'ти создаешь инстаграм и тут будет ссылка/переход на него)');
        }

        if ( data === 'ще якісь послуги'){
            return bot.sendMessage(chatId, 'інформація про ще якісь послуги');
        }

        if (data === 'записатись на прийом'){
            const contactKeyboard = {
                reply_markup: {
                    keyboard: [
                        [{
                            text: "Поділитися контактом", 
                            request_contact:true
                        }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            };
             
            bot.sendMessage(chatId, "Натисніть поділитися контактом",contactKeyboard);
           
        }
       
    });
};
start();