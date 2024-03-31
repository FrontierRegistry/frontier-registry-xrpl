import crypto from 'crypto';
import fs from 'fs';

export default async function hashFile(myFile) {
    const fileBuffer = fs.readFileSync(`img/${myFile}`);

    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    const hex = hashSum.digest('hex');

    console.log("Hash of the file:", hex);
    
    return hex;
}
