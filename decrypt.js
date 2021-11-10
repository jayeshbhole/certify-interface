const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
let CryptoJS = require("crypto-js");
let AES = CryptoJS.AES;

async function upload(data) {
	const json = JSON.stringify(data);
	const certkey = getRandomKey();
	const encrypted = encrypt(json, certkey);
	const ipfsHash = await ipfs.add(encrypted);
	console.log(ipfsHash);
	return { ipfsHash, certkey };
}

function encrypt(data, key) {
	return AES.encrypt(data, key).toString();
}

function decrypt(data, key) {
	const a = AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
	console.log(a);
	return a;
}

async function retrieve(ipfshash, key) {
	const data = await ipfs.cat(ipfshash);
	return decrypt(data, key);
}

function getRandomKey() {
	return (Math.random() + 1).toString(36).substring(3).toUpperCase();
}

retrieve(
	"bafkreidv2nvotgbfyb2bnmk2ufcnzd3a6z7qqeehnwzkoz5xbwuwyv2poq",
	"ASRFP9JEQI"
);
