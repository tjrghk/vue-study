<template>
   <table>
       <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
           <td v-for="(cellData, cellIndex) in rowData" 
           :key="cellIndex" :style="cellDataStyle(rowIndex, cellIndex)" 
           @click="onClickTd(rowIndex, cellIndex)"
           @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)" >
           {{cellDataText(rowIndex, cellIndex)}}
           </td>
       </tr>
   </table>
</template>

<script>
    import { mapState } from "vuex"; 
    import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from "./store"; 

    export default {
        computed: {
            ...mapState(["tableData", "halted"]),
            cellDataStyle() {
                return (row, cell) => {
                    switch (this.$store.state.tableData[row][cell]) {
                        case CODE.NOMAL:
                        case CODE.MINE:
                            return {
                                background: "#444"
                            };
                        case CODE.CLICKED_MINE:
                        case CODE.OPENED:
                            return {
                                background: "white"
                            };
                        case CODE.FLAG:
                        case CODE.FLAG_MINE:
                            return {
                                background: "red"
                            };
                        case CODE.QUESTION:
                        case CODE.QUESTION_MINE:
                            return {
                                background: "yellow"
                            };
                        default:
                            return {
                            };

                    }
                };
            },
            cellDataText() {
                return (row, cell) => {
                    switch (this.$store.state.tableData[row][cell]) {
                        case CODE.NOMAL:
                            return "";
                        case CODE.MINE:
                            return "X";
                        case CODE.CLICKED_MINE:
                            return "펑";
                        case CODE.FLAG:
                        case CODE.FLAG_MINE:
                            return "!";
                        case CODE.QUESTION:
                        case CODE.QUESTION_MINE:
                            return "?";
                        default:
                            return this.$store.state.tableData[row][cell];

                    }
                };
            }
        },
        methods: {
            onClickTd(row, cell) {
                if(this.halted) {
                    return false;
                }
                switch (this.tableData[row][cell]) {
                    case CODE.NOMAL:
                        return this.$store.commit(OPEN_CELL, {row, cell});
                    case CODE.MINE:
                        return  this.$store.commit(CLICK_MINE, {row, cell});
                }

            },
            onRightClickTd(row, cell) {
                if(this.halted) {
                    return false;
                }
                
                switch (this.tableData[row][cell]) {
                    case CODE.NOMAL:
                    case CODE.MINE:
                        return this.$store.commit(FLAG_CELL, {row, cell});
                    case CODE.FLAG_MINE:
                    case CODE.FLAG:
                        return this.$store.commit(QUESTION_CELL, {row, cell});
                    case CODE.QUESTION_MINE:
                    case CODE.QUESTION:
                        return this.$store.commit(NORMALIZE_CELL, {row, cell});
                }

            }
        }
    }
</script>