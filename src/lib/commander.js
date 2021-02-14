import commander from "commander";
const { Command } = commander;
const program = new Command();

export default program
  .version("0.0.1")
  .option("-a, --add", "Add contact")
  .option("-n, --name <Name>", "New name")
  .option("-e, --email <Email>", "New email")
  .option("-p, --phone <Phone>", "New phone")
  .option("-g, --get <id>", "Get contact")
  .option("-l, --list", "Get contacts")
  .option("-r, --remove <id>", "Remove contact");
