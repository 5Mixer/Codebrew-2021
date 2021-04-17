import * as Blockly from 'blockly/core';

Blockly.Blocks['on_message'] = {
  init: function() {
    // this.appendField('author')
    this.appendDummyInput('message_value').appendField('on message');
    this.appendStatementInput('on_message_handler');
    this.setOutput(false);
    
    this.setColour(160);
    this.setTooltip('Send a message');

  }
};

Blockly.JavaScript['on_message'] = function(block) {
	var handler = Blockly.JavaScript.statementToCode(block, 'on_message_handler',  Blockly.JavaScript.ORDER_FUNCTION_CALL);
	return 'bot.onmessage = (author, contents, channel) => {\n' + handler + '}\n';
};