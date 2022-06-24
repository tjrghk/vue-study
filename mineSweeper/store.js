import { createStore } from "vuex";

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

export const CODE = {
    MINE: -7,
    NOMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0
}

const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map( (arr, i) => {
        return i;
    });

    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i = 0; i < row; i++ ) {
        const rowData = []
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NOMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
}

const checked = [];

const aroundCheck = (state, row, cell) => {
    let openCount = 0;

    if (row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length) {
        return false;
    }
    if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
        return false;
    }
    if (checked.includes(row + '/' + cell)) {
        return false;
    } else {
        checked.push(row + '/' + cell);
    }

    let around = [];
    if (state.tableData[row - 1]) {
        around = around.concat([
            state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
        ]);
    }
    
    around = around.concat([
        state.tableData[row][cell - 1], state.tableData[row][cell + 1]
    ]);

    if (state.tableData[row + 1]) {
        around = around.concat([
            state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1], state.tableData[row + 1][cell - 1]
        ]);
    }

    const count = around.filter(function(v) {
        return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
    });

    state.tableData[row][cell] = count.length || "";
    openCount++;

    if (count.length === 0) {
        const near = [];

        if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
        }
        near.push([row, cell + 1]);
        near.push([row, cell - 1]);
        if (row + 1 < state.tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
        }

        near.forEach(function(n) {
            if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                openCount += aroundCheck(state, n[0], n[1]);
            }
        });
    }

    return openCount;
}

export default createStore({
    state: {
       tableData: [],
       data: {
           row: 0,
           cell: 0,
           mine: 0
       },
       timer: 0,
       halted: true,
       result: "",
       openCount: 0
    },
    getters: {

    },
    mutations: {
        [START_GAME](state, {row, cell, mine}) {
            state.data = {
                row,
                cell,
                mine
            };

            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.result = "";
            checked.splice(0, checked.length);
            state.openCount = 0;
        },
        [OPEN_CELL](state, {row, cell}) {
            state.openCount += aroundCheck(state, row, cell);

            if (state.data.row * state.data.cell - state.data.mine === state.openCount) {
                state.halted = true;
                state.result = `${state.timer}초 안에 성공하셨습니다.`;
            }
        },
        [CLICK_MINE](state, {row, cell}) {
            state.tableData[row][cell] = CODE.CLICKED_MINE;
            state.halted = true;
            state.result = `퍼어어어엉~ 실패!`;
            
        },
        [FLAG_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.MINE) {
                state.tableData[row][cell] = CODE.FLAG_MINE;
            } else {
                state.tableData[row][cell] = CODE.FLAG;
            }
        },
        [QUESTION_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                state.tableData[row][cell] = CODE.QUESTION_MINE;
            } else {
                state.tableData[row][cell] = CODE.QUESTION;
            }
        },
        [NORMALIZE_CELL](state , {row, cell}) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                state.tableData[row][cell] = CODE.MINE;
            } else {
                state.tableData[row][cell] = CODE.NOMAL;
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
    },
    actions: {

    }
}); 