import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class ExcelManager extends Component {

    inputBoxId = "_file_box_input_";
    containerId = "_file_box_container_";
    inputBoxElement: HTMLInputElement = null;

    /** file name */
    excelFileName: string = "sudoku_board"
    /** sheet name */
    excelSheetName: string = "sheet_1"
    excelHeadingList: any[] = []
    excelContentList: any[] = []

    start() {
        this.initInputBox();
    }

    /** 初始化，第一次无表格时创建一个默认的
     *  id	    key	    value
     *  number	string	string
     *  索引	键名	 键值
     */
    createHeading() {
        this.excelHeadingList[0] = { id: "number", level: "string", board: "string" };
        this.excelHeadingList[1] = { id: "标识", level: "等级", board: "牌面" };
    }

    readLocalStorage() {
        this.excelContentList = [
            { id: 1, level: "1", board: "[4,5,6,9,1,7,8,3,2,9,7,3,-8,2,5,-4,-1,-6,8,2,1,6,4,3,9,5,7,2,8,9,4,7,1,5,6,3,1,6,7,5,3,9,-2,-4,-8,5,-3,4,2,8,6,1,7,9,-6,1,-5,-3,9,-8,-7,-2,-4,-7,9,-2,-1,6,-4,-3,-8,-5,-3,4,-8,-7,5,-2,-6,9,-1]" },
        ];
    }

    onImportFileClick() {
        this.inputBoxElement.click();
    }

    onExportFileClick() {
        this.exportToExcel()
    }

    handleFile() {
        this.createHeading();
        this.readLocalStorage();
        // 升序
        this.excelContentList.sort((a, b) => {
            return a.id - b.id
        })
        for (let i = 0; i < this.excelContentList.length; i++) {
            this.excelContentList[i].id = i + 1;
        }
        // 插入表头        
        this.excelContentList.unshift(this.excelHeadingList[0]);
        this.excelContentList.unshift(this.excelHeadingList[1]);
        return JSON.parse(JSON.stringify(this.excelContentList))
    }

    /** 导入 */
    importFile(file: Blob) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            this.excelHeadingList = [json[0], json[1]]
        };
        reader.readAsArrayBuffer(file);
    }

    /** 导出 */
    exportToExcel() {
        let fileName = this.excelFileName
        // 处理数据
        let fileData: any[] = this.handleFile();
        // 创建工作表
        const workbook = XLSX.utils.book_new();
        // 将JSON数据转换为工作表
        const worksheet = XLSX.utils.json_to_sheet(fileData);
        XLSX.utils.book_append_sheet(workbook, worksheet, this.excelSheetName);
        // 生成Excel文件（这里我们使用XLSX的write功能）
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        // 为了确保兼容性，将字符串处理为八位无符号整数数组
        let s2ab = (s: any) => {
            const buffer = new ArrayBuffer(s.length);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buffer;
        }
        // 创建一个Blob对象，并设置文件类型
        const blob = new Blob([s2ab(excelBuffer)], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        });
        // 创建一个临时的a标签用于下载文件
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = fileName + ".xlsx";
        // 模拟点击a标签实现下载
        document.body.appendChild(link);
        link.click();
        // 清理并移除a标签
        document.body.removeChild(link);
    }

    initInputBox() {
        let inputBox = this.getInputBox(this.inputBoxId, this.containerId);
        if (inputBox) {
            inputBox.onchange = (evt: any) => {
                let file = evt.target.files[0];
                if (!file) {
                    console.info("===> No file selected");
                    return;
                }
                this.importFile(file);
            };
        }
    }

    getInputBox(inputBoxId: string, containerId: string) {
        if (!this.inputBoxElement) {
            let inputBox = document.getElementById(inputBoxId) as HTMLInputElement;
            if (!inputBox) {
                let container = document.getElementById(containerId);
                if (!container) {
                    container = document.createElement('div');
                    document.body.appendChild(container);
                    container.id = containerId;
                }
                inputBox = document.createElement("input") as HTMLInputElement;
                inputBox.id = inputBoxId;
                inputBox.type = "file";
                container.appendChild(inputBox);
            }
            this.inputBoxElement = inputBox;
        }
        return this.inputBoxElement;
    }
}
