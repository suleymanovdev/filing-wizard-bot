const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const botInfo = require('./bot_info.json');

const botToken = botInfo.token;
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userFolder = `../db/${chatId}`;

    if (!fs.existsSync(userFolder))
    {
        fs.mkdirSync(userFolder, { recursive: true });
        bot.sendMessage(chatId, 'You are registered ✅');
    }

    const startMessage = `Welcome to the Filing Wizard Bot 😉\nbot developed by suleymanovdev.\n\n📓 Available commands:\n/help - Display the list of commands.\n/uploadfile - Upload a file.\n/deletefile - Delete a file.\n/showallfiles - Show all files.`;
    const keyboard = [
        [
            { text: '/help' },
            { text: '/uploadfile' },
        ],
        [
            { text: '/deletefile' },
            { text: '/showallfiles' },
        ],
    ];
    const replyMarkup = {
    keyboard,
    resize_keyboard: true,
    one_time_keyboard: false,
    };

    bot.sendMessage(chatId, startMessage, { reply_markup: replyMarkup });
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = 'You can upload only documents (such as .pdf, .zip or etc.) ❗\n\n📔 List of commands:\n/start - Check if a folder exists and create it if necessary.\n/help - Display the list of commands.\n/uploadfile - Upload a file.\n/deletefile - Delete a file.\n/showallfiles - Show all files.';
    bot.sendMessage(chatId, helpMessage);
});

bot.onText(/\/uploadfile/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Please upload the file you want to save ✌️');
});

bot.on('document', (msg) => {
    const chatId = msg.chat.id;
    const userFolder = `../db/${chatId}`;

    if (!fs.existsSync(userFolder))
    {
        fs.mkdirSync(userFolder, { recursive: true });
        bot.sendMessage(chatId, 'You are registered ✅');
    }

    const fileId = msg.document.file_id;
    const fileName = msg.document.file_name;
    const filePath = path.join(userFolder, fileName);

    bot.downloadFile(fileId, userFolder)
    .then((filePath) => {
        const originalFilePath = path.join(filePath);
        const newFilePath = path.join(userFolder, fileName);
        fs.renameSync(originalFilePath, newFilePath);
        bot.sendMessage(chatId, `File ${fileName} saved ✅`);
        const keyboard = [
            [
                { text: '/help' },
                { text: '/uploadfile' },
            ],
            [
                { text: '/deletefile' },
                { text: '/showallfiles' },
            ],
        ];
        const replyMarkup = {
            keyboard,
            resize_keyboard: true,
            one_time_keyboard: false,
        };
        bot.sendMessage(chatId, 'Successful ✅', { reply_markup: replyMarkup });
    })
    .catch((error) => {
        console.error(error);
        bot.sendMessage(chatId, 'An error occurred while saving the file 📛');
    });
});

bot.onText(/\/deletefile/, (msg) => {
    const chatId = msg.chat.id;
    const userFolder = `../db/${chatId}`;

    fs.readdir(userFolder, (err, files) => {
        if (err)
        {
            console.error(err);
            bot.sendMessage(chatId, 'An error occurred while retrieving the files 📛');
            return;
        }

        if (files.length === 0)
        {
            bot.sendMessage(chatId, 'No files found ❗');
            return;
        }

        const fileButtons = files.map((file) => [file]);
        const replyMarkup = {
            keyboard: fileButtons,
            resize_keyboard: true,
            one_time_keyboard: true,
        };

        bot.sendMessage(chatId, 'Select the file you want to delete:', { reply_markup: replyMarkup });
    });
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userFolder = `../db/${chatId}`;

    if (msg.text && fs.existsSync(path.join(userFolder, msg.text)))
    {
        fs.unlink(path.join(userFolder, msg.text), (err) => {
            if (err)
            {
                console.error(err);
                bot.sendMessage(chatId, 'An error occurred while deleting the file 📛');
            }
            else
            {
                bot.sendMessage(chatId, `File ${msg.text} deleted ✅`);
                const keyboard = [
                    [
                        { text: '/help' },
                        { text: '/uploadfile' },
                    ],
                    [
                        { text: '/deletefile' },
                        { text: '/showallfiles' },
                    ],
                ];
                const replyMarkup = {
                keyboard,
                resize_keyboard: true,
                one_time_keyboard: false,
                };
                bot.sendMessage(chatId, 'Successful ✅', { reply_markup: replyMarkup });
            }
        });
    }
});

bot.onText(/\/showallfiles/, (msg) => {
    const chatId = msg.chat.id;
    const userFolder = `../db/${chatId}`;

    fs.readdir(userFolder, (err, files) => {
        if (err)
        {
            console.error(err);
            bot.sendMessage(chatId, 'An error occurred while retrieving the files 📛');
            return;
        }

        if (files.length === 0)
        {
            bot.sendMessage(chatId, 'No files found ❗');
            return;
        }

        const fileList = files.join('\n');
        bot.sendMessage(chatId, `List of files:\n${fileList}`);
    });
});
