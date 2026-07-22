#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cleanup_1 = __importStar(require("node-cleanup"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const runner_1 = require("./runner");
const args_manager_1 = require("./args-manager");
const debounce_1 = require("./debounce");
const stdout_manipulator_1 = require("./stdout-manipulator");
const readline_1 = require("readline");
let firstTime = true;
let firstSuccessKiller = null;
let successKiller = null;
let failureKiller = null;
let emitKiller = null;
let compilationStartedKiller = null;
let compilationCompleteKiller = null;
const { onFirstSuccessCommand, onSuccessCommand, onFailureCommand, onEmitCommand, onEmitDebounceMs, onCompilationStarted, onCompilationComplete, noColors, noClear, requestedToListEmittedFiles, signalEmittedFiles, silent, compilationRunner, compilationRunnerArgs, args, } = (0, args_manager_1.extractArgs)(process.argv);
let runningKillProcessesPromise = null;
function killProcesses(currentCompilationId, killAll) {
    if (runningKillProcessesPromise) {
        return runningKillProcessesPromise.then(() => currentCompilationId);
    }
    const promisesToWaitFor = [];
    if (killAll && firstSuccessKiller) {
        promisesToWaitFor.push(firstSuccessKiller());
        firstSuccessKiller = null;
    }
    if (successKiller) {
        promisesToWaitFor.push(successKiller());
        successKiller = null;
    }
    if (failureKiller) {
        promisesToWaitFor.push(failureKiller());
        failureKiller = null;
    }
    if (compilationStartedKiller) {
        promisesToWaitFor.push(compilationStartedKiller());
        compilationStartedKiller = null;
    }
    if (compilationCompleteKiller) {
        promisesToWaitFor.push(compilationCompleteKiller());
        compilationCompleteKiller = null;
    }
    runningKillProcessesPromise = Promise.all(promisesToWaitFor).then(() => {
        runningKillProcessesPromise = null;
        return currentCompilationId;
    });
    return runningKillProcessesPromise;
}
let runningKillEmitProcessesPromise = null;
// The same as `killProcesses`, but we separate it to avoid canceling each other
function killEmitProcesses(currentEmitId) {
    if (runningKillEmitProcessesPromise) {
        return runningKillEmitProcessesPromise.then(() => currentEmitId);
    }
    let emitKilled = Promise.resolve();
    if (emitKiller) {
        emitKilled = emitKiller();
        emitKiller = null;
    }
    runningKillEmitProcessesPromise = emitKilled.then(() => {
        runningKillEmitProcessesPromise = null;
        return currentEmitId;
    });
    return runningKillEmitProcessesPromise;
}
function runOnCompilationStarted() {
    if (onCompilationStarted) {
        compilationStartedKiller = (0, runner_1.run)(onCompilationStarted);
    }
}
function runOnCompilationComplete() {
    if (onCompilationComplete) {
        compilationCompleteKiller = (0, runner_1.run)(onCompilationComplete);
    }
}
function runOnFailureCommand() {
    if (onFailureCommand) {
        failureKiller = (0, runner_1.run)(onFailureCommand);
    }
}
function runOnFirstSuccessCommand() {
    if (onFirstSuccessCommand) {
        firstSuccessKiller = (0, runner_1.run)(onFirstSuccessCommand);
    }
}
function runOnSuccessCommand() {
    if (onSuccessCommand) {
        successKiller = (0, runner_1.run)(onSuccessCommand);
    }
}
const debouncedEmit = onEmitCommand
    ? (0, debounce_1.debounce)(() => {
        emitKiller = (0, runner_1.run)(onEmitCommand);
    }, onEmitDebounceMs)
    : undefined;
function runOnEmitCommand() {
    debouncedEmit === null || debouncedEmit === void 0 ? void 0 : debouncedEmit();
}
function echoExit(code, signal) {
    if (signal !== null) {
        process.kill(process.pid, signal);
    }
}
let compilationErrorSinceStart = false;
const tscProcess = (0, cross_spawn_1.default)(compilationRunner, [...compilationRunnerArgs, ...args]);
if (!tscProcess.stdout) {
    throw new Error('Unable to read Typescript stdout');
}
if (!tscProcess.stderr) {
    throw new Error('Unable to read Typescript stderr');
}
tscProcess.on('exit', echoExit);
tscProcess.stderr.pipe(process.stderr);
const rl = (0, readline_1.createInterface)({ input: tscProcess.stdout });
let compilationId = 0;
let emitId = 0;
function triggerOnEmit() {
    if (onEmitCommand) {
        killEmitProcesses(++emitId).then((previousEmitId) => previousEmitId === emitId && runOnEmitCommand());
    }
}
rl.on('line', function (input) {
    if (noClear) {
        input = (0, stdout_manipulator_1.deleteClear)(input);
    }
    const line = (0, stdout_manipulator_1.manipulate)(input);
    if (!silent) {
        (0, stdout_manipulator_1.print)(line, { noColors, noClear, signalEmittedFiles, requestedToListEmittedFiles });
    }
    const state = (0, stdout_manipulator_1.detectState)(line);
    const compilationStarted = state.compilationStarted;
    const compilationError = state.compilationError;
    const compilationComplete = state.compilationComplete;
    compilationErrorSinceStart =
        (!compilationStarted && compilationErrorSinceStart) || compilationError;
    if (state.fileEmitted !== null) {
        Signal.emitFile(state.fileEmitted);
        triggerOnEmit();
    }
    if (compilationStarted) {
        compilationId++;
        killProcesses(compilationId, false).then((previousCompilationId) => {
            if (previousCompilationId !== compilationId) {
                return;
            }
            runOnCompilationStarted();
            Signal.emitStarted();
        });
    }
    if (compilationComplete) {
        compilationId++;
        killProcesses(compilationId, false).then((previousCompilationId) => {
            if (previousCompilationId !== compilationId) {
                return;
            }
            runOnCompilationComplete();
            if (compilationErrorSinceStart) {
                Signal.emitFail();
                runOnFailureCommand();
            }
            else {
                if (firstTime) {
                    firstTime = false;
                    Signal.emitFirstSuccess();
                    runOnFirstSuccessCommand();
                    triggerOnEmit();
                }
                Signal.emitSuccess();
                runOnSuccessCommand();
            }
        });
    }
});
if (typeof process.on === 'function') {
    process.on('message', (msg) => {
        switch (msg) {
            case 'run-on-compilation-started-command':
                if (compilationStartedKiller) {
                    compilationStartedKiller().then(runOnCompilationStarted);
                }
                break;
            case 'run-on-compilation-complete-command':
                if (compilationCompleteKiller) {
                    compilationCompleteKiller().then(runOnCompilationComplete);
                }
                break;
            case 'run-on-first-success-command':
                if (firstSuccessKiller) {
                    firstSuccessKiller().then(runOnFirstSuccessCommand);
                }
                break;
            case 'run-on-failure-command':
                if (failureKiller) {
                    failureKiller().then(runOnFailureCommand);
                }
                break;
            case 'run-on-success-command':
                if (successKiller) {
                    successKiller().then(runOnSuccessCommand);
                }
                break;
            case 'run-on-emit-command':
                if (emitKiller) {
                    emitKiller().then(runOnEmitCommand);
                }
                break;
            default:
                console.log('Unknown message', msg);
        }
    });
}
const sendSignal = (msg) => {
    if (process.send) {
        process.send(msg);
    }
};
const Signal = {
    emitStarted: () => sendSignal('started'),
    emitFirstSuccess: () => sendSignal('first_success'),
    emitSuccess: () => sendSignal('success'),
    emitFail: () => sendSignal('compile_errors'),
    emitFile: (path) => sendSignal(`file_emitted:${path}`),
};
(0, node_cleanup_1.default)((_exitCode, signal) => {
    if (signal) {
        tscProcess.kill(signal);
    }
    killProcesses(0, true).then(() => process.exit());
    // don't call cleanup handler again
    (0, node_cleanup_1.uninstall)();
    return false;
});
