"use strict";
/**
 * Created by ChengZheLin on 2019/6/4.
 * Features: tree
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("./node"));
class Tree {
    constructor() {
        this.root = new node_1.default('root');
    }
    /**
     * 插入数据
     * @param key
     */
    insert(key) {
        if (!key)
            return false;
        let keyArr = key.split('');
        let firstKey = keyArr.shift();
        let children = this.root.children;
        let len = keyArr.length;
        // 第一个key
        if (!children[firstKey]) {
            children[firstKey] = len
                ? new node_1.default(firstKey)
                : new node_1.default(firstKey, undefined, true);
        }
        // 其他多余的key
        if (keyArr.length >= 1) {
            this.insertNode(children[firstKey], keyArr);
        }
        return true;
    }
    /**
     * 插入节点
     * @param node
     * @param word
     */
    insertNode(node, word) {
        let len = word.length;
        if (len) {
            let children;
            children = node.children;
            const key = word.shift();
            let item = children[key];
            const isWord = len === 1;
            if (!item) {
                // let failure = this.createFailureTable(node, key)
                item = new node_1.default(key, node, isWord);
            }
            else {
                item.word = isWord;
            }
            children[key] = item;
            this.insertNode(children[key], word);
        }
    }
    /**
     * 创建Failure表
     */
    _createFailureTable() {
        // 获取树第一层
        let currQueue = Object.values(this.root.children);
        while (currQueue.length > 0) {
            let nextQueue = [];
            for (let i = 0; i < currQueue.length; i++) {
                let node = currQueue[i];
                let key = node.key;
                let parent = node.parent;
                // 获取树下一层
                for (let k in node.children) {
                    nextQueue.push(node.children[k]);
                }
                if (parent) {
                    let failure = parent.failure;
                    while (failure) {
                        let children = failure.children[key];
                        // 判断是否到了根节点
                        if (children) {
                            node.failure = children;
                            break;
                        }
                        failure = failure.failure;
                    }
                }
                else {
                    node.failure = this.root;
                }
            }
            currQueue = nextQueue;
        }
    }
    /**
     * 搜索节点
     * @param key
     * @param node
     */
    search(key, node = this.root.children) {
        const val = node[key];
        if (val)
            return val;
        else
            return;
    }
}
exports.default = Tree;
//# sourceMappingURL=tree.js.map