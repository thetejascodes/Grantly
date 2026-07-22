"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommandExist = isCommandExist;
exports.hasWatchCommand = hasWatchCommand;
exports.extractArgs = extractArgs;
const compiler_provider_1 = require("./compiler-provider");
function removeRunnerArgs(args) {
    return args.splice(2); // removing "node tsc-watch.js"
}
function getCommandIdx(args, command) {
    const lowerCasedCommand = command.toLowerCase();
    return args.map((arg) => arg.toLowerCase()).indexOf(lowerCasedCommand);
}
function isCommandExist(args, command) {
    return getCommandIdx(args, command) >= 0;
}
function hasWatchCommand(args) {
    return isCommandExist(args, '-w') || isCommandExist(args, '--watch');
}
function forceWatch(args) {
    if (!hasWatchCommand(args)) {
        args.push('--watch');
    }
    return args;
}
function extractCommandWithValue(args, command) {
    let commandValue = null;
    let commandIdx = getCommandIdx(args, command);
    if (commandIdx > -1) {
        commandValue = args[commandIdx + 1];
        args.splice(commandIdx, 2);
    }
    return commandValue;
}
function extractCommand(args, command) {
    let commandIdx = getCommandIdx(args, command);
    if (commandIdx > -1) {
        args.splice(commandIdx, 1);
        return true;
    }
    return false;
}
function extractArgs(inputArgs) {
    const cleanArgs = removeRunnerArgs(inputArgs);
    const noWatch = extractCommand(cleanArgs, '--noWatch');
    const args = noWatch ? cleanArgs : forceWatch(cleanArgs);
    const onFirstSuccessCommand = extractCommandWithValue(args, '--onFirstSuccess');
    const onSuccessCommand = extractCommandWithValue(args, '--onSuccess');
    const onFailureCommand = extractCommandWithValue(args, '--onFailure');
    const onEmitCommand = extractCommandWithValue(args, '--onEmit');
    const onEmitDebounceMs = Number(extractCommandWithValue(args, '--onEmitDebounceMs')) || 300;
    const onCompilationStarted = extractCommandWithValue(args, '--onCompilationStarted');
    const onCompilationComplete = extractCommandWithValue(args, '--onCompilationComplete');
    const noColors = extractCommand(args, '--noColors');
    const noClear = extractCommand(args, '--noClear');
    const silent = extractCommand(args, '--silent');
    const signalEmittedFiles = extractCommand(args, '--signalEmittedFiles');
    const requestedToListEmittedFiles = extractCommand(args, '--listEmittedFiles');
    const compilationRunnerArgs = [];
    let compilationRunner;
    const compileCommand = extractCommandWithValue(args, '--compileCommand');
    let maxNodeMem = null;
    if (compileCommand) {
        const compileCommandArgs = compileCommand.split(' ');
        compilationRunner = compileCommandArgs[0];
        compilationRunnerArgs.push(...compileCommandArgs.slice(1));
    }
    else {
        compilationRunner = 'node';
        maxNodeMem = extractCommandWithValue(args, '--maxNodeMem');
        if (maxNodeMem) {
            compilationRunnerArgs.push(`--max_old_space_size=${maxNodeMem}`);
        }
        const compiler = (0, compiler_provider_1.getCompilerPath)(extractCommandWithValue(args, '--compiler'));
        compilationRunnerArgs.push(compiler);
    }
    if (signalEmittedFiles || requestedToListEmittedFiles) {
        if (args[0] === '--build' || args[0] === '-b') {
            // TS6369: Option '--build' must be the first command line argument.
            args.splice(1, 0, '--listEmittedFiles');
        }
        else {
            args.unshift('--listEmittedFiles');
        }
    }
    return {
        onFirstSuccessCommand,
        onSuccessCommand,
        onFailureCommand,
        onEmitCommand,
        onEmitDebounceMs,
        onCompilationStarted,
        onCompilationComplete,
        noColors,
        noClear,
        requestedToListEmittedFiles,
        signalEmittedFiles,
        silent,
        compilationRunner,
        compilationRunnerArgs,
        maxNodeMem,
        args,
    };
}
