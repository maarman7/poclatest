// const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');

// class ManualEntryDialog extends ComponentDialog {
//     constructor() {
//         super('ManualEntryDialog');

//         this.addDialog(new TextPrompt('TextPrompt'))
//             .addDialog(new WaterfallDialog('WaterfallDialog', [
//                 this.getManualEntryStep.bind(this),
//                 this.confirmEntryStep.bind(this)
//             ]));

//         this.initialDialogId = 'WaterfallDialog';
//     }

//     async getManualEntryStep(step) {
//         const messageText = 'Please enter the material number, plant, and storage location.';
//         return await step.prompt('TextPrompt', { prompt: messageText });
//     }

//     async confirmEntryStep(step) {
//         const enteredData = step.result;
//         await step.context.sendActivity(`You entered: ${ enteredData }`);
//         return await step.endDialog(enteredData);
//     }
// }

// module.exports.ManualEntryDialog = ManualEntryDialog;


// const { ComponentDialog, WaterfallDialog, AttachmentPrompt } = require('botbuilder-dialogs');
// const { CardFactory } = require('botbuilder');
// const ManualEntryCard = require('./resources/manualEntryCard.json');

// class ManualEntryDialog extends ComponentDialog {
//     constructor() {
//         super('ManualEntryDialog');

//         this.addDialog(new AttachmentPrompt('AttachmentPrompt'))
//             .addDialog(new WaterfallDialog('WaterfallDialog', [
//                 this.showEntryCardStep.bind(this),
//                 this.processEntryStep.bind(this)
//             ]));

//         this.initialDialogId = 'WaterfallDialog';
//     }

//     async showEntryCardStep(step) {
//         // Load the adaptive card from the JSON file and send it to the user
//         const manualEntryCard = CardFactory.adaptiveCard(ManualEntryCard);
//         await step.context.sendActivity({ attachments: [manualEntryCard] });
//         return await step.prompt('AttachmentPrompt');
//     }

//     async processEntryStep(step) {
//         const formData = step.result;
//         // Extract and process the data from the form submission
//         await step.context.sendActivity(`You entered: ${JSON.stringify(formData)}`);
//         return await step.endDialog(formData);
//     }
// }

// module.exports.ManualEntryDialog = ManualEntryDialog;

// const { ComponentDialog, WaterfallDialog, AttachmentPrompt } = require('botbuilder-dialogs');
// const { CardFactory } = require('botbuilder');
// const ManualEntryCard = require('./resources/manualEntryCard.json');

// class ManualEntryDialog extends ComponentDialog {
//     constructor() {
//         super('ManualEntryDialog');

//         this.addDialog(new AttachmentPrompt('AttachmentPrompt'))
//             .addDialog(new WaterfallDialog('WaterfallDialog', [
//                 this.showEntryCardStep.bind(this),
//                 this.processEntryStep.bind(this),
//                 this.showSuccessMessageStep.bind(this)
//             ]));

//         this.initialDialogId = 'WaterfallDialog';
//     }

//     async showEntryCardStep(step) {
//         // Load the adaptive card from the JSON file and send it to the user
//         const manualEntryCard = CardFactory.adaptiveCard(ManualEntryCard);
//         await step.context.sendActivity({ attachments: [manualEntryCard] });
//         return await step.prompt('AttachmentPrompt');
//     }

//     async processEntryStep(step) {
//         const formData = step.context.activity.value;

//         // Log the form data to see what the bot received
//         console.log('Form Data:', formData);

//         if (!formData) {
//             await step.context.sendActivity('No data was submitted. Please try again.');
//             return await step.replaceDialog(this.id);
//         }

//         // Save the form data to the step's values so it can be used later
//         step.values.formData = formData;
        
//         return await step.next();
//     }

//     async showSuccessMessageStep(step) {
//         const formData = step.values.formData;
        
//         // Prepare a detailed message showing the captured information
//         const details = `
//             **Material Number:** ${formData.materialNumber}  
//             **Plant:** ${formData.plant}  
//             **Storage Location:** ${formData.storageLocation}  
//             **GPID:** ${formData.gpid}  
//             **Name:** ${formData.name}  
//             **Number of Items:** ${formData.numberOfItems}  
//             **Transaction Type:** ${formData.transactionType}  
//         `;

//         // Send the details and success message
//         await step.context.sendActivity(`You entered: \n\n${details}`);
//         await step.context.sendActivity('Your goods movement was Successful.');

//         return await step.endDialog(formData);
//     }
// }

// module.exports.ManualEntryDialog = ManualEntryDialog;


// const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');
// const { CardFactory } = require('botbuilder');
// const ManualEntryCard = require('./resources/manualEntryCard.json');

// class ManualEntryDialog extends ComponentDialog {
//     constructor() {
//         super('ManualEntryDialog');

//         this.addDialog(new TextPrompt('TextPrompt'))
//             .addDialog(new WaterfallDialog('WaterfallDialog', [
//                 this.showEntryCardStep.bind(this),
//                 this.processEntryStep.bind(this),
//                 this.showSuccessMessageStep.bind(this)
//             ]));

//         this.initialDialogId = 'WaterfallDialog';
//     }

//     async showEntryCardStep(step) {
//         // Load the adaptive card from the JSON file and send it to the user
//         const manualEntryCard = CardFactory.adaptiveCard(ManualEntryCard);
//         await step.context.sendActivity({ attachments: [manualEntryCard] });
//         return ComponentDialog.EndOfTurn;
//     }

//     async processEntryStep(step) {
//         const formData = step.context.activity.value;

//         // Log the form data to see what the bot received
//         console.log('Form Data:', formData);

//         if (!formData) {
//             await step.context.sendActivity('No data was submitted. Please try again.');
//             return await step.replaceDialog(this.id);
//         }

//         // Save the form data to the step's values so it can be used later
//         step.values.formData = formData;
        
//         return await step.next();
//     }

//     async showSuccessMessageStep(step) {
//         const formData = step.values.formData;
        
//         // Prepare a detailed message showing the captured information
//         const details = `
//             **Material Number:** ${formData.materialNumber}  
//             **Plant:** ${formData.plant}  
//             **Storage Location:** ${formData.storageLocation}  
//             **GPID:** ${formData.gpid}  
//             **Name:** ${formData.name}  
//             **Number of Items:** ${formData.numberOfItems}  
//             **Transaction Type:** ${formData.transactionType === 'Work Order' ? '261' : '201'}  
//         `;
//         //const transactionType = (orderType === 'Work Order') ? '261' : '201';
//         // Send the details and success message
//         await step.context.sendActivity(`You entered: \n\n${details}`);
//         await step.context.sendActivity(`Thanks, your transaction (Type ${formData.transactionType}) was successful.`);

//         return await step.endDialog(formData);
//     }
// }

// module.exports.ManualEntryDialog = ManualEntryDialog;


const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');
const { CardFactory } = require('botbuilder');
const ManualEntryCard = require('./resources/manualEntryCard.json');

class ManualEntryDialog extends ComponentDialog {
    constructor() {
        super('ManualEntryDialog');

        this.addDialog(new TextPrompt('TextPrompt'))
            .addDialog(new WaterfallDialog('WaterfallDialog', [
                this.showEntryCardStep.bind(this),
                this.processEntryStep.bind(this),
                this.showSuccessMessageStep.bind(this)
            ]));

        this.initialDialogId = 'WaterfallDialog';
    }

    async showEntryCardStep(step) {
        // Load the adaptive card from the JSON file and send it to the user
        const manualEntryCard = CardFactory.adaptiveCard(ManualEntryCard);
        await step.context.sendActivity({ attachments: [manualEntryCard] });
        return ComponentDialog.EndOfTurn;
    }

    async processEntryStep(step) {
        const formData = step.context.activity.value;

        // Log the form data to see what the bot received
        console.log('Form Data:', formData);

        if (!formData) {
            await step.context.sendActivity('No data was submitted. Please try again.');
            return await step.replaceDialog(this.id);
        }

        // Save the form data to the step's values so it can be used later
        step.values.formData = formData;
        
        return await step.next();
    }

    async showSuccessMessageStep(step) {
        const formData = step.values.formData;
        const transactionType = formData.transactionType;
        
        // Send the simplified success message
        await step.context.sendActivity(`Thanks, your transaction (Type ${transactionType}) was successful.`);

        return await step.endDialog(formData);
    }
}

module.exports.ManualEntryDialog = ManualEntryDialog;

