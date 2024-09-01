// const { ComponentDialog, WaterfallDialog } = require('botbuilder-dialogs');


// class QRCodeDialog extends ComponentDialog {
//     constructor() {
//         super('QRCodeDialog');

//         this.addDialog(new WaterfallDialog('WaterfallDialog', [
//             this.openCameraStep.bind(this),
//             this.scanQRCodeStep.bind(this)
//         ]));

//         this.initialDialogId = 'WaterfallDialog';
//     }

//     async openCameraStep(step) {
//         await step.context.sendActivity('Opening camera to scan QR code...');
//         return await step.next();
//     }

//     async scanQRCodeStep(step) {
//         // const scanner = new QRCodeScanner();
//         // const scannedData = await scanner.scanQRCode();
//         // await step.context.sendActivity(`QR Code scanned: ${ scannedData }`);
//         // return await step.endDialog(scannedData);
//     }
// }

// module.exports.QRCodeDialog = QRCodeDialog;


const { ComponentDialog, WaterfallDialog, TextPrompt, Dialog } = require('botbuilder-dialogs');
const { CardFactory } = require('botbuilder');
const TransactionDetailsCard = require('./resources/TransactionDetailsCard.json'); // Assuming you have this adaptive card JSON

class QRCodeDialog extends ComponentDialog {
    constructor() {
        super('QRCodeDialog');

        this.addDialog(new TextPrompt('TextPrompt'))
            .addDialog(new WaterfallDialog('WaterfallDialog', [
                this.captureQRCodeStep.bind(this),
                this.showTransactionDetailsCardStep.bind(this),
                this.processTransactionStep.bind(this)
            ]));

        this.initialDialogId = 'WaterfallDialog';
    }

    async captureQRCodeStep(step) {
        // Check if the QR code data has already been captured
        if (step.context.activity.text.startsWith('scannedCode-')) {
            // Capture the scanned QR code data
            const qrCodeData = step.context.activity.text.split('scannedCode-')[1];
            step.values.qrCodeData = qrCodeData;
            return step.next();
        } else {
            // If QR code data is not yet available, prompt the user
            await step.context.sendActivity('Please scan the QR code.');
            return Dialog.EndOfTurn; // Wait for the user to scan the QR code
        }
    }

    async showTransactionDetailsCardStep(step) {
        if (step.values.qrCodeData) {
            // Show the adaptive card to capture additional transaction details
            const transactionDetailsCard = CardFactory.adaptiveCard(TransactionDetailsCard);
            await step.context.sendActivity({ attachments: [transactionDetailsCard] });
            return Dialog.EndOfTurn;
        } else {
            // If QR code data is still not captured, re-prompt or handle as necessary
            await step.context.sendActivity('');
            return step.replaceDialog(this.initialDialogId); // Restart the dialog
        }
    }

    async processTransactionStep(step) {
        // Process the user's input from the adaptive card
        const formData = step.context.activity.value;
        const gpid = formData.gpid;
        const name = formData.name;
        const numberOfMaterials = formData.numberOfMaterials;
        const orderType = formData.orderType;

        // Process the transaction logic here...
        const transactionType = (orderType === 'Work Order') ? '261' : '201';

        await step.context.sendActivity(`Thanks, your transaction (Type ${transactionType}) was successful.`);

        return step.endDialog();
    }
}

module.exports.QRCodeDialog = QRCodeDialog;

