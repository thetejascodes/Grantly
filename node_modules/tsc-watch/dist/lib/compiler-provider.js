"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompilerPath = getCompilerPath;
const path_1 = __importDefault(require("path"));
function getCompilerPath(compilerArg, resolver = require.resolve) {
    if (!compilerArg) {
        compilerArg = 'typescript/bin/tsc';
    }
    try {
        return resolveCompilerPath(compilerArg, resolver, [process.cwd()]);
    }
    catch (e) {
        if (e.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
            try {
                return resolveViaPackageJson(compilerArg, resolver, [process.cwd()]);
            }
            catch (_a) {
                // Local compiler not found, ignore and try global compiler
            }
        }
        // Local compiler not found, ignore and try global compiler
    }
    try {
        return resolveCompilerPath(compilerArg, resolver);
    }
    catch (e) {
        if (e.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
            return resolveViaPackageJson(compilerArg, resolver);
        }
        if (e.code === 'MODULE_NOT_FOUND') {
            console.error(e.message);
            process.exit(9);
        }
        throw e;
    }
}
function resolveCompilerPath(compilerArg, resolver, paths) {
    return paths ? resolver(compilerArg, { paths }) : resolver(compilerArg);
}
function resolveViaPackageJson(compilerArg, resolver, paths) {
    const match = compilerArg.match(/^(.+)\/bin\/(.+)$/);
    if (!match) {
        throw new Error(`Cannot resolve '${compilerArg}': subpath is not exported.`);
    }
    const [, pkgName, binName] = match;
    const pkgJsonPath = paths
        ? resolver(`${pkgName}/package.json`, { paths })
        : resolver(`${pkgName}/package.json`);
    return path_1.default.join(path_1.default.dirname(pkgJsonPath), 'bin', binName);
}
