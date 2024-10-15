/**
 * 单例模板
 */
export function Singleton<T>() { 
    class Singleton {
        protected constructor() {}
        private static _instance: Singleton = null;
        public static get instance(): T {
            if(Singleton._instance == null) {
                Singleton._instance = new this();
            }
            return Singleton._instance as T;
        }
    }
    return Singleton;
}