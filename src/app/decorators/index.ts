declare global {
    interface Function {
        decorates? : string;
    }
}

export * from './state'
export * from './ngSubmit'