import { Tree } from './core';
interface FilterValue {
    text?: string | boolean;
    filter: Array<string>;
    pass?: boolean;
}
declare class Mint extends Tree {
    /**
     * 兼容1.1.6
     */
    static default: any;
    constructor(keywords: Array<string | number>);
    private searchKey;
    private filterFunc;
    /**
     * 异步快速检测字符串是否无敏感词
     * @param word
     */
    every(word: string): Promise<boolean>;
    /**
     * 同步快速检测字符串是否无敏感词
     * @param word
     */
    includes(word: string): boolean;
    everySync(word: string): boolean;
    /**
     * 同步过滤方法
     * @param word
     * @param replace
     */
    filterSync(word: string, replace?: boolean): FilterValue;
    /**
     * 异步过滤方法
     * @param word
     * @param replace
     */
    filter(word: string, replace?: boolean): Promise<FilterValue>;
}
export = Mint;
