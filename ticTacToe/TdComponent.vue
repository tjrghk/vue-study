<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    export default {
       props: {
           cellData: String,
           cellIndex: Number,
           rowIndex: Number
       },
       methods: {
           onClickTd() {
                if(this.cellData) return false;

                let tblData = this.$root.$data.tableData;
                tblData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
                

                let win = false;
                if((tblData[this.rowIndex][0] === this.$root.$data.turn) && (tblData[this.rowIndex][1] === this.$root.$data.turn) && (tblData[this.rowIndex][2] === this.$root.$data.turn)) {
                    win = true;
                }

                if((tblData[0][this.cellIndex] === this.$root.$data.turn) &&  (tblData[1][this.cellIndex] === this.$root.$data.turn) && (tblData[2][this.cellIndex] === this.$root.$data.turn)) {
                    win = true;
                }

                if(((tblData[0][0] === this.$root.$data.turn) && (tblData[1][1] === this.$root.$data.turn) && (tblData[2][2] === this.$root.$data.turn)) || ((tblData[2][0] === this.$root.$data.turn) && (tblData[1][1] === this.$root.$data.turn) && (tblData[0][2] === this.$root.$data.turn))) {
                    win = true;
                }

                if(win) {
                    this.$root.$data.winner = this.$root.$data.turn;

                    tblData.forEach((element, index) => {
                        element.forEach((element2, index2) => {
                             tblData[index][index2] = "";
                        });
                    });
                } else {
                    this.$root.$data.winner = "";
                    
                    let flag = false;
                    tblData.forEach((element, index) => {
                        element.forEach((element2, index2) => {
                            if (element2 === "") {
                                flag = true;
                            }
                        });
                    });

                    if(!flag) {
                        tblData.forEach((element, index) => {
                            element.forEach((element2, index2) => {
                                tblData[index][index2] = "";
                            });
                        });
                    }
                }

                this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O';
                
           }
       }
    }
</script>