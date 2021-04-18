import * as Blockly from 'blockly/core';

Blockly.Blocks['new_user_field'] = {
  init: function() {
    // this.appendField('author')
    this.appendDummyInput().appendField('new user');
    this.setOutput(true, ['Messagable', 'String', 'User']);
    
    this.setColour(130);
    this.setTooltip('The person who joined the chat');
  }
};

Blockly.JavaScript['new_user_field'] = function() {
	return ['newuser', Blockly.JavaScript.ORDER_ATOMIC];
};