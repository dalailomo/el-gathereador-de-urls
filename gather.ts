import { assert } from "https://deno.land/std@0.163.0/testing/asserts.ts";

const file = Deno.args[0];
assert(file, "Error: Required json file path as first argument");

const batchSize = parseInt(Deno.args[1] || "3");
assert(!isNaN(batchSize), "Error: batchSize needs to be a number");

const waitTimeInMs = parseInt(Deno.args[2] || "1000");
assert(!isNaN(waitTimeInMs), "Error: waitTimeInMs needs to be a number");

const saveFileCommandName = "./save-file.sh";
const separator = "\n------------------------\n";

const urls = JSON.parse(await Deno.readTextFile(file));

console.log(`\nBatch size: ${batchSize}; Source: ${file}`);

let batch = 1;
for (let i = 0; i < urls.length; i += batchSize) {
    console.log(
        separator,
        `Waiting for ${waitTimeInMs}ms until next batch execution. Current batch execution: ${batch}`,
        separator
    );
    await new Promise((resolve: (v: unknown) => void) =>
        setTimeout(resolve, waitTimeInMs)
    );

    const chunk = urls.slice(i, i + batchSize);

    for (const url of chunk) {
        const cmd = [saveFileCommandName, url];
        console.log(`Running command: ${cmd.join(" ")}`);

        const p = Deno.run({ cmd, stderr: "piped", stdout: "piped" }); // create subprocess

        const [status, stdout, stderr] = await Promise.all([
            p.status(),
            p.output(),
            p.stderrOutput(),
        ]);
        p.close();

        if (!status.success) {
            console.debug(
                status,
                "\n",
                new TextDecoder().decode(stdout),
                "\n",
                new TextDecoder().decode(stderr),
                "\n"
            );
        }
    }

    batch++;
}
