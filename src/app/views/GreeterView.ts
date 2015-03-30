class GreeterView {

    rootNodes: HTMLElement[];
    parent: HTMLElement;
    msg: HTMLParagraphElement;

    constructor() {
        this.rootNodes = [];
        this.msg = document.createElement('p');
        var n1 = document.createTextNode('Mabuhay Kola!');
        this.rootNodes.push(this.msg);
        this.msg.appendChild(n1);
    }

    appendTo(parent:HTMLElement): void {
        this.remove();
        this.parent = parent;
        this.rootNodes.forEach((node:HTMLElement) => {
            this.parent.appendChild(node);
        });
    }
    remove(): void {
        if(!this.parent)
            return;
        this.rootNodes.forEach((node:HTMLElement) => {
            this.parent.removeChild(node);
        });
        this.parent = null;
    }
}

export = GreeterView;