import * as Blockly from 'blockly/core';

Blockly.Blocks['add_react'] = {
  init: function() {
    // this.appendValueInput('react_to').appendField('to').setCheck('Message');
    this.appendValueInput('react_emoji').appendField('add reaction emoji').setCheck(['Emoji', 'String']);
    this.setOutput(false);
    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    
    this.setColour(160);
    this.setTooltip('Add a reaction');
  }
};

Blockly.JavaScript['add_react'] = function(block) {
	// var message = Blockly.JavaScript.valueToCode(block, 'react_to', Blockly.JavaScript.ORDER_NONE) || '\'\'';
	var emoji = Blockly.JavaScript.valueToCode(block, 'react_emoji', Blockly.JavaScript.ORDER_NONE) || '\'\'';
	return 'msg.react(' + emoji + ');\n';
};