
import { promises as fs } from 'fs';
import path from "path";
export async function resolveQuotes(name: string) {
    // get from quotes/<name>.json
    const jsonDirectory = path.join(process.cwd(), 'quotes');
    const fileContents = await fs.readFile(jsonDirectory + '/' + name.toLowerCase() + '.json', 'utf8');
    return JSON.parse(fileContents);
}