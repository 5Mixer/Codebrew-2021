import * as Blockly from 'blockly/core';

Blockly.Blocks['author_field'] = {
  init: function() {
    // this.appendField('author')
    this.appendDummyInput().appendField('author');
    this.setOutput(true, ['Messagable', 'String', 'User']);
    
    this.setColour(130);
    this.setTooltip('The author of a received message');
  }
};

Blockly.JavaScript['author_field'] = function() {
	return ['author', Blockly.JavaScript.ORDER_ATOMIC];
};