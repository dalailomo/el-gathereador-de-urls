const file = Deno.args[0];

if (!file) {
    console.error("Error: Required json file path as first argument");
    Deno.exit();
}

const urls = JSON.parse(await Deno.readTextFile(file));

urls.forEach(async (url: string) => {
    const cmd = ["./save-file.sh", url];
    console.log(`Running command: ${cmd}`);

    const p = Deno.run({ cmd }); // create subprocess
    await p.status(); // await its completion
});
