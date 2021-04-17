var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');

var onresize = function(e) {
	// Compute the absolute coordinates and dimensions of blocklyArea.
	var element = blocklyArea;
	var x = 0;
	var y = 0;
	do {
		x += element.offsetLeft;
		y += element.offsetTop;
		element = element.offsetParent;
	} while (element);
	// Position blocklyDiv over blocklyArea.
	blocklyDiv.style.left = x + 'px';
	blocklyDiv.style.top = y + 'px';
	blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
	blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
	Blockly.svgResize(blocklyWorkspace);
};

function setupCustomBlocks() {
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
}

Blockly.JavaScript['send_message'] = function(block) {
	// Print statement.
	var msg = Blockly.JavaScript.valueToCode(block, 'message_value', Blockly.JavaScript.ORDER_NONE) || '\'\'';
	return 'sendMessage(' + msg + ');\n';
};


setupCustomBlocks();

var blocklyWorkspace = Blockly.inject(blocklyDiv, {media: 'https://unpkg.com/blockly/media/', toolbox: toolbox, sounds:false});
window.addEventListener('resize', onresize, false);
onresize();

function getCode() {
	Blockly.JavaScript.addReservedWords('code');
	return Blockly.JavaScript.workspaceToCode(blocklyWorkspace);
}