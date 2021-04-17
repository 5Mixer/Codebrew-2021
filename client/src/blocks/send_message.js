import * as Blockly from 'blockly/core';

Blockly.Blocks['send_message'] = {
  init: function() {
    this.appendDummyInput().appendField('send message');
    this.appendValueInput('message_to').appendField('to');
    this.appendValueInput('message_contents').appendField('contents');
    this.setOutput(false);
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    
    this.setColour(160);
    this.setTooltip('Send a message');
  }
};

Blockly.JavaScript['send_message'] = function(block) {
	var to = Blockly.JavaScript.valueToCode(block, 'message_to', Blockly.JavaScript.ORDER_NONE) || '\'\'';
	var msg = Blockly.JavaScript.valueToCode(block, 'message_contents', Blockly.JavaScript.ORDER_NONE) || '\'\'';
	return 'msg.' + to +'.send(' + msg + ');\n';
};