// TODO: choose your own key (0 <= key <= 255):
const xor_key = 2*(5+2+3);

function fromHex(hex){
	let ch = hex.toString(16);
	if (ch < 16) {
		ch = '0' + ch;
	}
	return ch;
}

function toHex(ch, i)
{
	const sequence = ch.substr(i, 2);
	return parseInt(sequence, 16);
}

function xor_encode(input){
	let output = '';
	for (let i = 0; i < input.length; ++i) {
		const hexInput = input.charCodeAt(i);
		const hexOutput = hexInput ^ xor_key;
		output += fromHex(hexOutput);
	}
	return output;
}

function xor_decode(input) {
	let output = ''; 
	for (let i = 0; i < input.length; i += 2) {
		const hexInput = toHex(input, i);
		const hexOutput = hexInput ^ xor_key;
		output += String.fromCharCode(hexOutput);
    }
	return output;
}

document.addEventListener('DOMContentLoaded', function (){
    const nodes = document.querySelectorAll('.mailto');
    nodes.forEach((element) => {
        const action = '79757d78607b2e6275627567607d717a547379757d783a777b79';
        const output = xor_decode(action);
        const func = "window.location.href='" + output + "';";
        element.setAttribute('onclick', func);
    });
});
