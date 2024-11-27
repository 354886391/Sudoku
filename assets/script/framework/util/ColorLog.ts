export class ColorLog {
    public static get log() {
        return window.console.log.bind(window.console, '%c【调试】', 'color: white; background-color: #007BFF; font-weight: bold; font-size: 14px;');
    }
}