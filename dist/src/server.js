"use strict";

var _aedes = _interopRequireDefault(require("aedes"));

var _net = _interopRequireDefault(require("net"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const aedes = (0, _aedes.default)();

const server = _net.default.createServer(aedes.handle);

const port = 1883; // (async () => {
//  try {
//   const url = await ngrok.connect({
//     addr: 1883,
//     proto: 'tcp',
//     subdomain: 'meed',
//     remote_port: 1883
//   });
//   console.log(url)
//  } catch (error) {
//    console.warn(error)
//  }
// })()

aedes.subscribe("me", function (packet, cb) {
  var _eval, _eval$data;

  console.log("Published", packet.payload.toString());
  console.log((_eval = eval("(" + packet.payload.toString() + ")")) === null || _eval === void 0 ? void 0 : (_eval$data = _eval.data) === null || _eval$data === void 0 ? void 0 : _eval$data.value);
  aedes.emit('me', Buffer.from(packet.payload.toString()));
}, () => {});
aedes.on("client", client => {
  console.log(client.id);
});
aedes.off("client", client => {
  console.log(client.id);
});
server.listen(port, () => {
  console.log("server started and listening on port ", port);
});