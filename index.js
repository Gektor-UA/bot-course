const TelegramApi = require('node-telegram-bot-api');

const {gameOptions, againOptions} = require('./options');

const token = '6746820469:AAGHdm7B-54q-yqMTNhKKTCVxOFUbbQO9Do';

const bot = new TelegramApi(token, {polling: true});

const chats = {};



const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Я зараз загадаю число від 0 до 9 а ти спробуй його відгадати');
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  console.log('============ 17 =============' + randomNumber);
  await bot.sendMessage(chatId, 'Відгадуй', gameOptions);
} 

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Початкове привітання' },
    { command: '/info', description: 'Отримати інофрмацію про користувача' },
    { command: '/game', description: 'Запустити гру "Відгадай число"' },
  ]);

  bot.on('message', async msg => {
    console.log('=========== 29 ==========');
    console.log(msg);
    console.log('=========== 31 ==========');

    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/4.webp');
      return bot.sendMessage(chatId, 'Вітаю вас в своєму першому телеграм каналі Бакуменка Володимира');
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Тебе звати ${msg.from.first_name} ${msg.from.last_name}`);
    }

    if (text === '/game') {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, 'Я вас не розумію, спробуйте ще раз');
  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    console.log('========== 53 =============' + data);

    if (data === '/again') {
      return startGame(chatId);
    }
    // bot.sendMessage(chatId, `Ти вибрав цифру ${data}`);
    if (data == chats[chatId]) {
      return bot.sendMessage(chatId, `Вітаю! Ти відгадав це число ${chats[chatId]}`, againOptions);
    } else {
      return bot.sendMessage(chatId, `Ти НЕ відгадав. Бот загадав число ${chats[chatId]}`, againOptions);
    }
  })
}

start()