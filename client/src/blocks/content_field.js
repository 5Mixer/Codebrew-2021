import * as Blockly from 'blockly/core';

Blockly.Blocks['content_field'] = {
  init: function() {
    this.appendDummyInput().appendField('content');
    this.setOutput(true, 'String');
    
    this.setColour(160);
    this.setTooltip('The content of a received message');
  }
};

Blockly.JavaScript['content_field'] = function() {
	return ['content', Blockly.JavaScript.ORDER_ATOMIC];
};