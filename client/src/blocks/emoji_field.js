import * as Blockly from 'blockly/core';

Blockly.Blocks['emoji_field'] = {
  init: function() {
    this.appendDummyInput().appendField('emoji');
    this.setOutput(true, ['Emoji', 'String']);
    
    this.setColour(160);
  }
};

Blockly.JavaScript['emoji_field'] = function() {
	return ['emoji', Blockly.JavaScript.ORDER_ATOMIC];
};