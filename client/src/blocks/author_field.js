import * as Blockly from 'blockly/core';

Blockly.Blocks['author_field'] = {
  init: function() {
    // this.appendField('author')
    this.appendDummyInput('author').appendField('author');
    this.setOutput(true, 'string');
    
    this.setColour(160);
    this.setTooltip('The author of a received message');
  }
};

Blockly.JavaScript['author_field'] = function() {
	return ['author', Blockly.JavaScript.ORDER_ATOMIC];
};