import * as Blockly from 'blockly/core';

Blockly.Blocks['kick_user'] = {
  init: function() {
    this.appendValueInput('user').appendField('kick user').setCheck('User');
    this.setOutput(false);
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    
    this.setColour(160);
    this.setTooltip('Kick a user from the chat');
  }
};

Blockly.JavaScript['kick_user'] = function(block) {
	var user = Blockly.JavaScript.valueToCode(block, 'user', Blockly.JavaScript.ORDER_NONE) || '\'\'';
	return user + '.kick();\n';
};