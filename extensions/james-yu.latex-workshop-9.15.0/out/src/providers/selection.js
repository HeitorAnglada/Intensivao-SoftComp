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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionRangeProvider = exports.findNode = void 0;
const vscode = __importStar(require("vscode"));
const lw = __importStar(require("../lw"));
const logger_1 = require("../components/logger");
const logger = (0, logger_1.getLogger)('Selection');
function inNode(position, node) {
    if (node.position === undefined) {
        return false;
    }
    if (node.position.start.line > position.line + 1 ||
        node.position.end.line < position.line + 1) {
        return false;
    }
    if (node.position.start.line === position.line + 1 &&
        node.position.start.column > position.character + 1) {
        return false;
    }
    if (node.position.end.line === position.line + 1 &&
        node.position.end.column < position.character + 1) {
        return false;
    }
    return true;
}
function findArg(position, node, stack) {
    if (!('args' in node) || node.args === undefined) {
        return;
    }
    for (const arg of node.args) {
        for (const child of arg.content) {
            if (!inNode(position, child)) {
                continue;
            }
            stack.push(child);
            findNode(position, child, stack);
            break;
        }
    }
}
function findNode(position, node, stack = [node]) {
    if ('content' in node && typeof node.content !== 'string') {
        for (const child of node.content) {
            if (inNode(position, child)) {
                stack.push(child);
                findNode(position, child, stack);
                break;
            }
            else {
                findArg(position, child, stack);
            }
        }
    }
    findArg(position, node, stack);
    return stack;
}
exports.findNode = findNode;
function nodeStackToSelectionRange(stack) {
    const last = stack[stack.length - 1];
    const parent = stack[stack.length - 2];
    return new vscode.SelectionRange(new vscode.Range((last.position?.start.line || 1) - 1, (last.position?.start.column || 1) - 1, (last.position?.end.line || 1) - 1, (last.position?.end.column || 1) - 1), parent ? nodeStackToSelectionRange(stack.slice(0, -1)) : undefined);
}
class SelectionRangeProvider {
    async provideSelectionRanges(document, positions) {
        await lw.cacher.wait(document.fileName);
        const content = lw.cacher.get(document.fileName)?.content;
        const ast = lw.cacher.get(document.fileName)?.ast;
        if (!content || !ast) {
            logger.log(`Error loading ${content ? 'AST' : 'content'} during structuring: ${document.fileName} .`);
            return [];
        }
        const ret = [];
        positions.forEach(position => {
            const nodeStack = findNode(position, ast);
            const selectionRange = nodeStackToSelectionRange(nodeStack);
            ret.push(selectionRange);
        });
        return ret;
    }
}
exports.SelectionRangeProvider = SelectionRangeProvider;
//# sourceMappingURL=selection.js.map