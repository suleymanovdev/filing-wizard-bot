# Filing Wizard Bot

The Filing Wizard Bot is a Telegram bot. It allows users to manage files by uploading, deleting, and viewing them. This documentation provides an overview of the code and its functionality.

## Table of Contents

- [Getting Started](#getting-started)
- [Functionality](#functionality)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Dependencies](#dependencies)
- [Feedback and Support](#feedback-and-support)

## Getting Started

To use the Filing Wizard Bot, follow these steps:

1. Clone the repository or copy the code into your local project directory.
2. Install the required dependencies by running `npm install`.
3. Obtain a Telegram bot token by creating a new bot on Telegram's BotFather platform.
4. Create a file named `bot_info.json` in the project directory and add the following content:

```json
{
  "token": "YOUR_BOT_TOKEN"
}
```

Replace YOUR_BOT_TOKEN with the token obtained from BotFather.

Start the bot by running node <your_script_name>.js in the terminal.

## Functionality

The Filing Wizard Bot provides the following commands and features:

* /start - Checks if a folder exists for the user and creates it if necessary. Sends a welcome message and displays the available commands.
* /help - Displays the list of available commands.
* /uploadfile - Initiates the file upload process.
* /deletefile - Deletes a selected file from the user's folder.
* /showallfiles - Displays a list of all files in the user's folder.

## Usage

### /start
When a user sends the /start command, the bot checks if a folder exists for the user based on their chatId. If the folder doesn't exist, it creates it and sends a registration confirmation message. It then sends a welcome message with the available commands and displays a keyboard with command buttons.

### /help
The /help command sends a message to the user with information about the supported commands.

### /showallfiles
The /showallfiles command retrieves the list of files in the user's folder and sends a message to the user with the list.

## File Upload
When a user uploads a file, the bot listens for the 'document' event. It saves the file in the user's folder, renaming it if necessary, and sends a success message. It also displays the available commands keyboard.

### /uploadfile
When a user sends the /uploadfile command, the bot responds with a message requesting the user to upload the file they want to save.

## File Deletion
When the user selects a file to delete, the bot checks if the file exists in the user's folder. If it does, the bot deletes the file and sends a success message. It then displays the available commands keyboard.

### /deletefile
The /deletefile command initiates the file deletion process. The bot reads the files in the user's folder and sends a message with a keyboard containing buttons for each file. The user can select a file to delete.

## Error Handling
If any errors occur during file operations, such as file saving or deletion, an error message is sent to the user.

## Dependencies
The following dependencies are required to run the Filing Wizard Bot:

* node-telegram-bot-api - provides the Telegram bot API for Node.js.
* fs - provides file system-related functionality.
* path - provides utilities for working with file and directory paths.

These dependencies can be installed using npm install.


## Feedback and Support
If you have any questions, suggestions, or issues, please contact suleymanovdev.