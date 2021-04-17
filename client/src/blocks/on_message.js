import * as Blockly from 'blockly/core';

Blockly.Blocks['on_message'] = {
  init: function() {
    // this.appendField('author')
    this.appendDummyInput().appendField('on message');
    this.appendStatementInput('on_message_handler');
    this.setOutput(false);
    
    this.setColour(160);
    this.setTooltip('Triggers when the bot receives a message from any channel or user');

  }
};

Blockly.JavaScript['on_message'] = function(block) {
	var handler = Blockly.JavaScript.statementToCode(block, 'on_message_handler',  Blockly.JavaScript.ORDER_FUNCTION_CALL);
	return 'events.onmessage = (msg) => {\n' + handler + '}\n';
};