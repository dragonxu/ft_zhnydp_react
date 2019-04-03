import * as fs from "fs";
import * as path from "path";

class StFileSys {
	public static readDir(pathname: string): Promise<string[]> {
		return new Promise((resolve, reject) => {
			fs.readdir(pathname, (err, files) => {
				if (err) {
					reject(err);
				} else {
					resolve(files);
				}
			});
		});
	}
	public static getContentOf(filename: string): Promise<string> {
		return new Promise((resolve, reject) => {
			fs.readFile(filename, 'utf8', (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
	public static writeFile(filename: string, data: string) {
		return new Promise((resolve, reject) => {
			fs.writeFile(filename, data, 'utf8', (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
}

// StFileSys.readDir()
const dirname = path.resolve(__dirname, "../public/res_data");
const newDirName = path.resolve(__dirname, "../public/java_data");
async function renameFileIn(dirName: string) {
	const files = await StFileSys.readDir(dirName);
	files.forEach(async (filename) => {
		const newFilename = filename.replace(/(\w+)\.json/, "$1.action");
		const content = await StFileSys.getContentOf(path.join(dirName, filename));
		StFileSys.writeFile(path.join(newDirName, newFilename), content);
	});
}

renameFileIn(dirname);
