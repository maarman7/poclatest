// const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');
// const { QRCodeDialog } = require('./QRCodeDialog');
// const { ManualEntryDialog } = require('./ManualEntryDialog');

// class RemoveDialog extends ComponentDialog {
//     constructor() {
//         super('RemoveDialog');

//         this.addDialog(new TextPrompt('TextPrompt'))
//             .addDialog(new QRCodeDialog())
//             .addDialog(new ManualEntryDialog())
//             .addDialog(new WaterfallDialog('WaterfallDialog', [
//                 this.selectInputMethodStep.bind(this),
//                 this.processInputMethodStep.bind(this)
//             ]));

//         this.initialDialogId = 'WaterfallDialog';
//     }

//     async selectInputMethodStep(step) {
//         const messageText = 'Do you want to scan the QR code for this material or manually enter the required information?';
//         return await step.prompt('TextPrompt', { prompt: messageText });
//     }

//     async processInputMethodStep(step) {
//         const choice = step.result.toLowerCase();

//         if (choice.includes('scan')) {
//             return await step.beginDialog('QRCodeDialog');
//         } else {
//             return await step.beginDialog('ManualEntryDialog');
//         }
//     }
// }

// module.exports.RemoveDialog = RemoveDialog;


const { ComponentDialog, WaterfallDialog, ChoicePrompt } = require('botbuilder-dialogs');
const { QRCodeDialog } = require('./QRCodeDialog');
const { ManualEntryDialog } = require('./ManualEntryDialog');

class RemoveDialog extends ComponentDialog {
    constructor() {
        super('RemoveDialog');

        this.addDialog(new ChoicePrompt('ChoicePrompt'))
            .addDialog(new QRCodeDialog())
            .addDialog(new ManualEntryDialog())
            .addDialog(new WaterfallDialog('WaterfallDialog', [
                this.selectInputMethodStep.bind(this),
                this.processInputMethodStep.bind(this)
            ]));

        this.initialDialogId = 'WaterfallDialog';
    }

    async selectInputMethodStep(step) {
        const choices = ['Scan QR code', 'Manually enter'];
        return await step.prompt('ChoicePrompt', {
            prompt: 'Do you want to scan the QR code for this material or manually enter the required information?',
            choices: choices.map(choice => ({ value: choice }))
        });
    }

    async processInputMethodStep(step) {
        const choice = step.result.value;

        if (choice === 'Scan QR code') {
            return await step.beginDialog('QRCodeDialog');
        } else {
            return await step.beginDialog('ManualEntryDialog');
        }
    }
}

module.exports.RemoveDialog = RemoveDialog;


