import packageData from "../package.json" with { type: "json" };

const main = async () => {
  const args = process.argv.slice(2);
  const event = args[0] || "unknown";
  const phaserVersion = packageData.dependencies.phaser;

  const url = `https://gryzor.co:443/v/${event}/${phaserVersion}/react-ts`;

  process.stdout.write(
    `📢 Logging template type, build type, and Phaser version...\n\n`,
  );

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    const e = error as Error;
    process.stdout.write(`❌ ${e.message}\n\n`);
  }
};

void main();
