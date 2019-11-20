const endereco = window.location.origin;
window._ITEM = {
    "max": "",
    "data": "",
    "auxArr": [],
    "index": 0,
    "isLeft": false,
    "paginacao": 3
};

class Item {
    component(pData) {
        window._ITEM = {
            "max": pData.length,
            "data": pData,
            "auxArr": window._ITEM.auxArr,
            "index": window._ITEM.index,
            "isLeft": window._ITEM.isLeft,
            "paginacao": window._ITEM.paginacao
        };
        this.paginar();
        var comp = "";
        if (window._ITEM.auxArr.length > 0) {
            const item = document.getElementById(Item.name);
            if (item !== null) {
                item.remove();
            }
            comp += `<div id="${Item.name}" class="content-item">`;
            window._ITEM.auxArr.forEach(element => {
                comp += (
                    `<div id="${Item.name}${element.id}${element.index}" class="item">
                        <div class="item-inx">
                            <div class="item-inx-cnt">
                                <span class="item-inx-sp">${element.index}</span>
                            </div>
                        </div>
                        <div class="item-comp">
                            <span>${element.descricao}${element.index}</span>
                        </div>
                    </div>`
                );
                window._ITEM.index++;
            });
            comp += (
                `   <div class="contains" style="text-align: center;">
                        <span id="left" onclick="new Item().direcao(true, event)" class="contains" 
                            style="cursor: pointer; font-size: 30px; font-weight: bold;">
                            <  
                        </span>
                        <span id="right" onclick="new Item().direcao(false, event)" class="contains" 
                            style="cursor: pointer; font-size: 30px; font-weight: bold;">
                            >
                        </span>    
                    </div>
                </div>`
            );
        }
        return comp;
    };

    paginar() {
        const paginacao = window._ITEM.paginacao;
        if (window._ITEM.isLeft === true) {
            if (window._ITEM.index === paginacao) {
                window._ITEM.auxArr = [];
            } else {
                const resto = window._ITEM.index % paginacao;
                const auxPag = resto === 0 ? paginacao * 2 : resto + paginacao;
                const auxIndex = window._ITEM.index - auxPag;
                window._ITEM.auxArr = window._ITEM.data.slice(auxIndex, auxIndex + paginacao);
                window._ITEM.index = auxIndex;
            }
        } else {
            if (window._ITEM.index === window._ITEM.max) {
                window._ITEM.auxArr = [];
            } else {
                window._ITEM.auxArr = window._ITEM.data.slice(window._ITEM.index, window._ITEM.index + paginacao);
            }
        }
    };

    direcao(pIsLeft, pEvent) {
        window._ITEM.isLeft = pIsLeft;
        this.render(window._ITEM.data, pEvent);
    };

    render(pData, pEvent = null) {
        const containerItem = document.getElementById("containerObj3");
        if (containerItem !== null) {
            render(containerItem, this.component(pData), pEvent);
        }
    }

    getItensA(pEvent = null) {
        const el = document.getElementById("quantidade");
        if (el !== null) {
            if (el.value.trim() !== "") {
                new ServiceItem().getItensA(el.value)
                    .then(e => {
                        return e.json();
                    }).then(res => {
                        window._ITEM.index = 0;
                        window._ITEM.auxArr = [];
                        window._ITEM.isLeft = false;
                        el.style.border = "solid 1px #aaa";
                        new Item().render(res.data, pEvent)
                    }).catch(err => {
                        alert(err.message);
                    });
            } else {
                el.style.border = "solid 1px red";
            }
        }
    };

    getItensB(pEvent = null) {
        const el = document.getElementById("quantidade");
        if (el !== null) {
            if (el.value.trim() !== "") {
                new ServiceItem().getItensB(el.value)
                    .then(e => {
                        return e.json();
                    }).then(res => {
                        window._ITEM.index = 0;
                        window._ITEM.auxArr = [];
                        window._ITEM.isLeft = false;
                        el.style.border = "solid 1px #aaa";
                        new Item().render(res.data, pEvent)
                    }).catch(err => {
                        alert(err.message);
                    });
            } else {
                el.style.border = "solid 1px red";
            }
        }
    };
};

class Obj2 {
    component() {
        return (
            `<div id="${Obj2.name}" class="content-obj2">
                <select id="drop" onchange="new Obj2().getContent(event)">
                    <option value="">Selecione</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
            </div>`
        );
    };

    getContent(pEvent) {
        const select = document.getElementById("drop");
        if (select !== null) {
            const options = Array.apply(null, select.children);
            const selected = options.find(element => {
                return element.selected === true;
            });
            switch (selected.value) {
                case "A":
                    new Item().getItensA(pEvent);
                    break;

                case "B":
                    new Item().getItensB(pEvent);
                    break;

                default:
                    const item = document.getElementById(Item.name);
                    if (item !== null) {
                        item.remove();
                    }
                    break;
            }
        }
    };

    close(pEvent = null) {
        const obj2 = document.getElementById(Obj2.name);
        if (obj2 !== null) {
            const el = pEvent.target;
            if (!el.classList.contains("contains") && !obj2.contains(el)) {
                $("#containerObj2").hide(1000);
                obj2.remove();
                document.removeEventListener("click", this.close);
            }
        }
    };

    resize() {
        const containerObj1 = document.getElementById("containerObj1");
        const containerObj2 = document.getElementById("containerObj2");
        if (containerObj1 !== null && containerObj2 !== null) {
            containerObj2.style.left = containerObj1.clientWidth + "px";
            containerObj2.style.display = "none";
        }
    };

    render(pEvent = null) {
        const containerObj2 = document.getElementById("containerObj2");
        const el = document.getElementById(Obj2.name);
        if (el === null && containerObj2 !== null) {
            document.addEventListener("click", this.close);
            render(containerObj2, this.component(), pEvent);
            this.resize();
            $("#containerObj2").toggle(1000);

        } else {
            this.close(pEvent)
        }
    };
};

class ServiceItem {
    getItensA(pQuantidade) {
        var url = new URL(`${endereco}/A`);
        var params = { quantidade: pQuantidade };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url.href);
    };

    getItensB(pQuantidade) {
        var url = new URL(`${endereco}/B`);
        var params = { quantidade: pQuantidade };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return fetch(url.href);
    };
};

function render(pParent, pComp, pEvent) {
    pParent.innerHTML += pComp;
    if (pEvent !== null) {
        pEvent.stopPropagation();
    }
};