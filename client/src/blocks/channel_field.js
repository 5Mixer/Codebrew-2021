import * as Blockly from 'blockly/core';

Blockly.Blocks['channel_field'] = {
  init: function() {
    // this.appendField('author')
    this.appendDummyInput('channel').appendField('channel');
    this.setOutput(true, 'string');
    
    this.setColour(160);
    this.setTooltip('The channel of a received message');
  }
};

Blockly.JavaScript['channel_field'] = function() {
	return ['channel', Blockly.JavaScript.ORDER_ATOMIC];
};