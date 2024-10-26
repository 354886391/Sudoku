import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass
export default class ExcelManager extends Component {

    @property
    inputBoxId = "_file_box_input_";
    @property
    containerId = "_file_box_container_";


    //配置项
    /** 导出表格名字 */
    excelFileName: string = "file_name"
    /** 导出表格 sheet 名字 */
    excelSheetName: string = "my_sheet"

    pathExlKeep: any[] = []
    pathExlList: any[] = []

    /** 初始化，第一次无表格时创建一个默认的
     *  id	    key	    value
     *  number	string	string
     *  索引	键名	 键值
     */
    createNewInfo() {
        this.pathExlKeep[0] = { id: "number", key: "string", value: "string" };
        this.pathExlKeep[1] = { id: "索引", key: "键名", value: "键值" };
    }

    inputBox: HTMLInputElement = null;

    onSelectFileClick() {
        if (this.inputBox) {
            console.info("click start");
            this.inputBox.click();
            console.info("click done")
        }
    }

    onExportFileClick() {
        this.exportToExcel()
    }

    start() {
        this.initInputBox();
    }

    createFileTitle() {
        this.pathExlKeep[0] = { id: "number", key: "string", value: "string" };
        this.pathExlKeep[1] = { id: "索引", key: "键名", value: "键值" };
    }

    readLocalStorage() {
        this.pathExlList = [
            { id: 1, key: "hallo,", value: "world!" },
            { id: 2, key: "hallo,", value: "world!" },
            { id: 3, key: "hallo,", value: "world!" },
        ];
    }

    handleFile() {
        this.createFileTitle();
        this.readLocalStorage();
        // 升序
        this.pathExlList.sort((a, b) => {
            return a.id - b.id
        })
        for (let i = 0; i < this.pathExlList.length; i++) {
            this.pathExlList[i].id = i + 1;
        }
        // 插入表头        
        this.pathExlList.unshift(this.pathExlKeep[0]);
        this.pathExlList.unshift(this.pathExlKeep[1]);
        return JSON.parse(JSON.stringify(this.pathExlList))
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
            this.pathExlKeep = [json[0], json[1]]
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
        if (!this.inputBox) {
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
            this.inputBox = inputBox;
        }
        return this.inputBox;
    }
}
