import * as Blockly from 'blockly/core';

Blockly.Blocks['on_new_user'] = {
  init: function() {
    this.appendDummyInput().appendField('on new user');
    this.appendStatementInput('on_new_user_handler');
    this.setOutput(false);
    
    this.setColour(160);
    this.setTooltip('Triggers when a user joins a chat that the bot is also in.');

  }
};

Blockly.JavaScript['on_new_user'] = function(block) {
	var handler = Blockly.JavaScript.statementToCode(block, 'on_new_user_handler',  Blockly.JavaScript.ORDER_FUNCTION_CALL);
	return 'events.onmessage = (newuser) => {(async () => {\n' + handler + '})();}\n';
};