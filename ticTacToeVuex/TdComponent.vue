<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    import {CLICK_CELL, SET_WINNER, CHANGE_TURN, RESET_GAME, NO_WINNER} from "./store";
    import {mapState} from "vuex";

    export default {
       props: {
           cellIndex: Number,
           rowIndex: Number
       },
       computed: {
           ...mapState({
               cellData(state) {
                   return state.tableData[this.rowIndex][this.cellIndex];
               },
               tableData: state => state.tableData,
               turn: state => state.turn
           }) 
            // cellData() {
            //     return this.$store.state.tableData[this.rowIndex][this.cellIndex];
            // },
            // tableData() {
            //    return this.$store.state.tableData;
            // },
            // turn() {
            //     return this.$store.state.turn;
            // }
       },
       methods: {
           onClickTd() {
                if(this.cellData) return false;

                this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex });

                let win = false;
                if((this.tableData[this.rowIndex][0] === this.turn) && (this.tableData[this.rowIndex][1] === this.turn) && (this.tableData[this.rowIndex][2] === this.turn)) {
                    win = true;
                }

                if((this.tableData[0][this.cellIndex] === this.turn) &&  (this.tableData[1][this.cellIndex] === this.turn) && (this.tableData[2][this.cellIndex] === this.turn)) {
                     win = true;
                }

                if(((this.tableData[0][0] === this.turn) && (this.tableData[1][1] === this.turn) && (this.tableData[2][2] === this.turn)) || ((this.tableData[2][0] === this.turn) && (this.tableData[1][1] === this.turn) && (this.tableData[0][2] === this.turn))) {
                    win = true;
                }

                if(win) {
                    this.$store.commit(SET_WINNER, this.turn);    
                    this.$store.commit(RESET_GAME); 
                    
                } else {
                    this.$store.commit(NO_WINNER); 
                    
                    let flag = false;
                    this.tableData.forEach((element, index) => {
                        element.forEach((element2, index2) => {
                            if (element2 === "") {
                                flag = true;
                            }
                        });
                    });

                    if(!flag) {
                         this.$store.commit(RESET_GAME); 
                      
                    } else {
                        this.$store.commit(CHANGE_TURN);  
                    }
                }
                
           }
       }
    }
</script>