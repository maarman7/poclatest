const { ComponentDialog, WaterfallDialog, DialogSet, DialogTurnStatus } = require('botbuilder-dialogs');
const { InputHints } = require('botbuilder');
const { RemoveOrReturnDialog } = require('./RemoveOrReturnDialog');
const { RemoveDialog } = require('./RemoveDialog');

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

class MainDialog extends ComponentDialog {
    constructor() {
        super('MainDialog');

        this.addDialog(new RemoveOrReturnDialog()) // Assuming these dialogs are correctly implemented
            .addDialog(new RemoveDialog())
            .addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
                this.actStep.bind(this),
                this.finalStep.bind(this)
            ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }

    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    async actStep(stepContext) {
        const action = stepContext.context.activity.value?.action;

        if (action === 'return') {
            return await stepContext.beginDialog('RemoveDialog');
        } else if (action === 'remove') {
            return await stepContext.beginDialog('RemoveDialog');
        } else {
            const didntUnderstandMessageText = "Sorry, I didn't understand that action. Please try again.";
            await stepContext.context.sendActivity(didntUnderstandMessageText, didntUnderstandMessageText, InputHints.IgnoringInput);
            return await stepContext.replaceDialog(this.initialDialogId); // Restart the dialog to re-prompt
        }
    }

    async finalStep(stepContext) {
        if (stepContext.result) {
            const result = stepContext.result;
            const msg = `You selected: ${ result }`;
            await stepContext.context.sendActivity(msg, msg, InputHints.IgnoringInput);
        }

        // End the dialog if necessary
        return await stepContext.endDialog();
    }
}

module.exports.MainDialog = MainDialog;
