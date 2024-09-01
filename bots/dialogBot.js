const { ActivityHandler } = require('botbuilder');

class DialogBot extends ActivityHandler {
    constructor(conversationState, userState, dialog) {
        super();
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');

        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');

    //     this.onMessage(async (context, next) => {
    //         console.log('Running dialog with Message Activity.');

    //         // Check if the message contains an action from the adaptive card
    //         const action = context.activity.value?.action;
    //         if (action) {
    //             // Run the Dialog with the new message Activity.
    //             await this.dialog.run(context, this.dialogState);
    //         } else {
    //             // Log or handle messages that don't contain an action
    //             console.log('Message received without valid action, no dialog to run.');
    //         }

    //         // By calling next() you ensure that the next BotHandler is run.
    //         await next();
    //     });
    // }

    this.onMessage(async (context, next) => {
        console.log('Running dialog with Message Activity.');

        // Run the Dialog with the new message Activity.
        await this.dialog.run(context, this.dialogState);

        // By calling next() you ensure that the next BotHandler is run.
        await next();
    });
}

    async run(context) {
        await super.run(context);

        // Save any state changes. The load happened during the execution of the Dialog.
        await this.conversationState.saveChanges(context, false);
        await this.userState.saveChanges(context, false);
    }
}

module.exports.DialogBot = DialogBot;
