<template>
    <section>
        得分: {{score}} {{scoreF}}
        <br />
        <button :disabled="score <= 0" @click="reduce(rd(1, 3))">-</button>&nbsp;&nbsp;<button :disabled="score >=100" @click="add(rd(1, 3))">+</button>&nbsp;&nbsp;<button :disabled="score >=100" @click="testAdd()">+</button>
        <br />
        <br />
        {{msg}}
        <br />
        <button @click="changeMsg()">立即改变msg</button>&nbsp;&nbsp;<button @click="changeMsgAct()">3秒后改变msg</button>
    </section>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";

export default {
    // app initial state
    data() {
      return {
      }
    },
    computed:{
        ...mapState({
            score: state => state.vuexTestModule.score,
            msg: state => state.common.msg
        }),
        ...mapGetters({
            scoreF: "scoreF"
        })
    },
    methods: {
        // add() {
        //     // this.rd(0, 5) 0 到 5的随机数
        //     this.$store.commit("add", this.rd(1, 3));
        // },
        // reduce() {
        //     this.$store.commit("reduce", this.rd(1, 3));
        // }
        testAdd(){
            console.log(this.$store.state.scoreF);
            this.addAct(this.rd(1, 3));
        },
        ...mapMutations({
            add: "add",
            reduce: "reduce",
            changeMsg: "changeMsg"
        }),
        ...mapActions({
            addAct: "addAct",
            changeMsgAct: "changeMsgAct"
        })
    }
};

</script>

<style scoped>
    section {
        padding-top: 86px;
        text-align: center;
    }
    button[disabled] {
        color: #999;
        cursor: default;
    }
</style>
