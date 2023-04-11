const { app, BrowserWindow, Tray, Menu, nativeImage, Notification } = require('electron');
const { Configuration, OpenAIApi } = require("openai");
const path = require('path');

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
let timer; 

const prompts = [
  ""
]

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let image = nativeImage.createFromPath(
  path.join(__dirname, "./src/assets/", "quotes-solid.png")
);

app.whenReady().then(() => {
  let icon = image.resize({width:16, height:16});
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Send me a another!', type: 'normal', click: quote},
    { type: 'separator'},
    { label: 'Stop!', type: 'normal', click: () => app.quit()}
  ]);
  
  tray.setContextMenu(contextMenu);

  tray.setToolTip('What the quote');
  tray.setTitle('')

  quote();
});

async function quote() {
  clearTimeout(timer);

  if(!Notification.isSupported()) {
    console.log('notifications not supported');
  }
  
  let completion;
  let json;
  try {
    completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Make up a funny quote\nFormat as json with quote and author fields",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    json = JSON.parse(completion.data.choices?.[0]?.text);
  }
  catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }

  let notification = new Notification({
    title: json.author,
    body: json.quote,
    // icon: image.resize({width:16, height:16}),
  });

  notification.on('click', (e) => {
    notification.close();
    quote();
  });

  notification.show();

  timer = setTimeout(quote, Math.abs(Math.random() * 10 * 60 * 1000 - 5 * 60 * 1000));
}