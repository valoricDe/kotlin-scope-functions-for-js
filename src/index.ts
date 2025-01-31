export const _let = function<T, R>(source: T, fn: (t: T) => R) {
    return fn(source);
}

export const _also = function<T>(source: T, fn: (t: T) => T) {
    fn(source);
    return source
}

export const _run = function<T, R>(source: T, fn: () => R) {
    return fn.call(source);
}

export const _apply = function<T>(source: T, fn: () => T) {
    fn.call(source);
    return source
}

class ScopeFnChain<T> {
    constructor(private source: T) {}

    let<R>(fn: (source: T) => R) {
        return new ScopeFnChain(fn(this.source));
    }

    also(fn: (source: T) => T) {
        fn(this.source)
        return this
    }

   run<R>(source: T, fn: () => R) {
        return new ScopeFnChain(fn.call(this.source));
    }

   apply(source: T, fn: () => T) {
        fn.call(source);
        return this
    }

    get result() { return this.source }
}

export default function scope<T>(source: T) {
    return new ScopeFnChain(source)
}