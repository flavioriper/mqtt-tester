import Aedes from "aedes";
import net from "net";
import ngrok from 'ngrok'

const aedes = Aedes();

const server = net.createServer(aedes.handle);
const port = 1883;

// (async () => {
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


aedes.subscribe(
  "me",
  function (packet, cb) {
    console.log("Published", packet.payload.toString());

    console.log(eval("(" + packet.payload.toString() + ")")?.data?.value);

    aedes.emit('me', Buffer.from(packet.payload.toString()))
  },
  () => {}
);



aedes.on("client", (client) => {
  console.log(client.id);
});

aedes.off("client", (client) => {
  console.log(client.id);
});

server.listen(port, () => {
  console.log("server started and listening on port ", port);
});
