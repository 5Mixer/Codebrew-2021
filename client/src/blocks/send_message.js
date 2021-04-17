import * as Blockly from 'blockly/core';

Blockly.Blocks['send_message'] = {
  init: function() {
    this.appendValueInput('message_value').appendField('send message');
    this.setOutput(false);
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    
    this.setColour(160);
    this.setTooltip('Send a message');
  }
};

Blockly.JavaScript['send_message'] = function(block) {
	var msg = Blockly.JavaScript.valueToCode(block, 'message_value', Blockly.JavaScript.ORDER_NONE) || '\'\'';
	return 'sendMessage(' + msg + ');\n';
};