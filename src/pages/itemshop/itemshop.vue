<template>
    <div class="container">
      <ul class="tablist">
        <li v-on:click="leftclick" stype="1" v-bind:class="{ on: isActive }">道具商店</li>
        <li stype="2" v-on:click="rightclick" v-bind:class="{ on: isclcik}">我的背包</li>
      </ul>
      <div class="itemlist" v-if="seen">
        <ul>
          <li @click="toreverse(i)" :class="{active:v.isreverse}" v-for="(v,i) in goods" :key="v.id">
            <div class="item_z">
              <img :src="v.picpath" alt=""><div class="centername">查看详情</div><div class="bottomlist" v-on:click.stop="buyuse(v.id,v.picpath,v.category)" ><span class="sliverimg"></span><span>{{v.points}}</span></div>
            </div>
            <div class="item_reverse" @click.stop="toreverse(i)" :style="{'z-index':10,'display':v.isreverse_z==1?'block':'none'}">
              <div class="item_reverse_sign"></div>
              <div class="item_reverse_title">{{v.name}}</div>
              <div class="item_reverse_main">{{category[v.category]}}</div>
              <div class="bottomlist" v-on:click.stop="buyuse(v.id,v.picpath,v.category)" ><span class="sliverimg"></span><span>{{v.points}}</span></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="myitemlist" v-if="isshow">
        <ul>
          <li v-for="(w,i) in mypackage" :key="w.id"><img :src="w.picpath" alt=""><div class="centername">{{w.name}}({{w.amount}})</div><div class="bottomlist"></div></li>
        </ul>
      </div>
      <div class="model" v-if="ishidden" @click="show1()">
        <div class="centermodel" @click.stop="show()">
            <div class="topimg"><img :src="picpath" alt=""></div>
            <div class="toolmessage">{{toolmessage}}</div>
            <ul>
              <li>
                <div class="toolname">{{toolname}}(<span class="number_right">{{name_type}}<span class="show" v-if="istotalpoint">{{amount*20}}</span><span class="show" v-if="istotalprice">{{(amount*2)/10}}</span></span>)</div>
                <div class="toolright"><span :class="{minusbtn:true,hui:amount==1}" @click="minusbtnnum"></span> <input class="amountcount" id="price" type="number"  v-model="amount" ref="type1" maxlength="3"  onkeyup="value=value.replace(/[^\d]/g,'')"/><span :class="{addbtn:true,hui:amount==999}" @click="addbtnnum"></span></div>
              </li>
              <li v-on:click="slelecttype(2)"  _pay_type="2"><span class="icon icon_pointer"></span><span class="content_title">可用银两<span class="isusepointer"></span>{{points}}</span><span class="pay_type" v-bind:class="{active:paytype2}"></span></li>
              <li v-on:click="slelecttype(1)"  _pay_type="1"><span class="icon icon_money"></span><span class="content_title">微信支付(0.2元=20银两)</span><span class="pay_type" v-bind:class="{active:paytype1}"></span></li>
            </ul>
          <div class="ispay" v-on:click="orderlist">确认支付</div>
        </div>
      </div>
      <div class="nogetList" v-if="iskong">暂无道具</div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import mptoast from '../../components/mptoast'
    export default {
        name: 'itemshop',
        props: [],
        components: {
          mptoast
        },
        data(){
            return {
              toolname:'',
              toolmessage:'',
              picpath:"",
              ishidden:false,
              seen:true,
              iskong:false,
              paytype:true,
              isshow:false,
              isActive:true,
              isclcik:false,
              paytype1:false,
              paytype2:true,
              goods_id:null,
              goods: [],
              istotalpoint:true,
              istotalprice:false,
              mypackage:[],
              pay_type:2,
              amount:1,
              points:'',
              name_type:'银两',
              value:'',
              ispay:false,
              category:[
                  "",
                "答题时，可看到当前题答案，一道题可使用一次。",
                "答题时，答题时间增加20s，一道题可使用一次。"
              ]
            }
        },
      methods: {
          toreverse(i){
              if(this.goods[i].isreverse_run){
                return;
              }
              this.goods[i].isreverse_run=true;
              let thiz=this;
              this.goods[i].isreverse=!this.goods[i].isreverse;
              let t=setTimeout(function(){
                if(thiz.goods[i].isreverse){
                  thiz.goods[i].isreverse_z="1"
                }else{
                  thiz.goods[i].isreverse_z="-1"
                }
              },250);
              let t2=setTimeout(function(){
                thiz.goods[i].isreverse_run=false;
              },500)
          },
          leftclick(){
              this.seen=true;
              this.isshow=false;
              this.isActive=true;
              this.isclcik=false;
              this.iskong=false;
          },
          rightclick(){
            this.seen=false;
            this.isshow=true;
            this.isActive=false;
            this.isclcik=true;
            this.mypackage=[];
            this.getmybuy();
          },
          buyuse(id,picpath,category){
            this.goods_id=id;
            this.ishidden=true;
            this.amount=1;
            this.picpath=picpath;
            if(category==1){
                this.toolmessage="答题时，可看到当前题答案，一道题可使用一次。";
                this.toolname="答案眼";
            }else if(category==2){
              this.toolmessage="答题时，答题时间增加20s，一道题可使用一次。";
              this.toolname="延时针";
            }
          },
          slelecttype(type){
            if(type==1){
                this.paytype1=true;
                this.paytype2=false;
                this.pay_type=1;
                this.name_type="RMB";
                this.istotalprice=true;
                this.istotalpoint=false;
            }else if(type==2){
                this.paytype1=false;
                this.paytype2=true;
                this.pay_type=2;
                this.name_type="银两";
                this.istotalprice=false;
                this.istotalpoint=true;
            }
          },
          minusbtnnum(){
              if(this.amount<=1){
                this.amount=1;
              }else{
                this.amount=--this.amount;
              }
          },
          addbtnnum(){
            this.amount=++this.amount;
          },
          show1(){
            this.ishidden=false;
            event.cancelBubble = true;
            this.paytype1=false;
            this.paytype2=true;
            this.pay_type=2;
            this.name_type="银两";
            this.istotalprice=false;
            this.istotalpoint=true;
          },
          show(e){
            this.ishidden=true;
          },
          async getgoods(){
            let that = this;
            let res = await that.$get('/rs/goods');
            if(res.code == 200){
              for(let i = 0;i<res.rows.length;i++){
                res.rows[i].picpath = that.$store.state.url+ res.rows[i].picpath;
                res.rows[i].isreverse = false;
                res.rows[i].isreverse_z = "-1";
                res.rows[i].isreverse_run = false;
              }
              that.goods = res.rows;
            }
          },
          async getuserperson(){
            let aa = await this.$get('/rs/member',{id:this.$store.state.user.userid});
            if(aa.code==200){
              this.$store.commit('get_sliver',aa.rows[0].points);
              this.points=aa.rows[0].points;
            }
          },
          async getmybuy(){
            let that = this;
            let res = await that.$get('/rs/member_package',{u_id:this.$store.state.user.userid,amount:'>,0'});
            if(res.code==200){
              this.iskong=false;
              for(let i = 0;i<res.rows.length;i++){
                res.rows[i].picpath = that.$store.state.url+ res.rows[i].picpath
              }
              this.mypackage = res.rows;
              let use = this.$store.state.user
              for(let i=0;i<res.rows.length;i++){
                if(res.rows[i].id == 1){
                  use.tools[0].amount = Number(res.rows[i].amount)
                }else if(res.rows[i].id == 2){
                  use.tools[1].amount = Number(res.rows[i].amount)
                }
              }
              this.$store.commit('getm_user',use)
            }else if(res.code==602){
                this.iskong=true;
                this.mypackage=[];
                let use = this.$store.state.user
                use.tools[0].amount = 0
                use.tools[1].amount = 0
                this.$store.commit('getm_user',use)
            }
          },
          async orderlist(){
            let that = this;
            if(this.amount==""||this.amount<=0){
              this.$mptoast("请输入购买个数");
              return;
            }
            if(this.pay_type==2){
             if(this.amount*20>this.points){
               this.$mptoast("您的银两余额不足，请选择其它支付方式");
               return;
             }
            }
            let res = await that.$post('/rs/order_build',{pay_type:this.pay_type,amount:this.amount,goods_id:this.goods_id});
            if(res.code == 200){
                if(this.pay_type==1){
                  this.ishidden=false;
                  this.$callWXPAY(res.main_order_id,this.$store.state.openid);
                }else{
                  let use = this.$store.state.user
                  if(this.goods_id == 1){
                    use.tools[0].amount = Number(use.tools[0].amount)+Number(this.amount)
                  }else{
                    use.tools[1].amount = Number(use.tools[1].amount)+Number(this.amount)
                  }
                  this.$store.commit('getm_user',use)
                  this.points=this.points-this.amount*20;
                  this.ishidden=false;
                  this.$mptoast("支付成功");

                }
            }else if(res.code==607){
              this.$mptoast("银两余额不足");
            }else if(res.code==303){
              this.$mptoast("该账号已被禁用");
            }
          },
        },
      mounted(){
        if(this.ispay){
          this.seen=false;
          this.isshow=true;
          this.isActive=false;
          this.isclcik=true;
          this.getmybuy();
        }else{
          this.seen=true;
          this.isshow=false;
          this.isActive=true;
          this.isclcik=false;
          this.iskong=false;
          this.getgoods();
        }
        this.getuserperson();
      },
      onLoad: function (option) {
        this.ispay=option.ispay//获取数据
        this.ishidden=false;
        this.iskong=false;
        this.paytype1=false;
        this.paytype2=true;
        this.pay_type=2;
        this.name_type="银两";
        this.istotalprice=false;
        this.istotalpoint=true;
      },
      onUnload:function(){
          for(let key in this.goods){
            this.goods[key].isreverse=false;
            this.goods[key].isreverse_z="-1";
          }
      }
    }
</script>

<style lang="less" scoped>
    @import '../../static/less/common.less';
    .tablist{
      display:flex;
      justify-content: space-between;
      align-items: center;
      position:relative;
      li{
        width:50%;
        height:40px;
        line-height:40px;
        text-align:center;
        font-size:15px;
        color:#333;
        border-bottom:3px solid #f6f6f6;
      }
      li.on{
        color:#df5c3e;
        border-bottom:3px solid #df5c3e;
      }
    }
  .itemlist{
    margin:13px;
    ul{
      /*transform-style:preserve-3d;*/
      li{
        transition: all .5s linear;
        transform: rotateY(0deg);
        float:left;
        width:106px;
        height:120px;
        /*border-radius:5px;*/
        margin-right:17px;
        text-align:center;
        box-sizing:border-box;
        position:relative;
        &.active{
          transform: rotateY(180deg);
        }
        .item_z{
          background:#ffe7e8;
          width: 100%;
          height:100%;
          /*transform: rotateY(0deg);*/
          position: absolute;
          border-radius:5px;
          z-index: 0;
          top:0;
          left:0;
        }
        .item_reverse{
          transition: all .5s linear;
          transform: rotateY(180deg);
          position: absolute;
          top:0;
          left:0;
          z-index: -1;
          border-radius:5px;
          width: 100%;
          height:240/2px;
          background: #707070;
          .item_reverse_sign{
            width: 45/2px;
            height:45/2px;
            position: absolute;
            background: url("../../../static/img/reverse.png")no-repeat 0 0 ;
            background-size: 45/2px 45/2px;
            top:0;
            right:0;
          }
          .item_reverse_title{
            padding: 25/2px 0 20/2px;
            font-size: 26/2px;
            line-height: 26/2px;
            color: #fff;
          }
          .item_reverse_main{
            padding:0 25/2px;
            font-size: 22/2px;
            text-align: justify;
            line-height: 30/2px;
            color: #fff;
          }
        }
        image{
          width:50px;
          height:50px;
          margin-top:18px;
        }
        .centername{
          border:1px solid #df5c3e;
          width: 107/2px;
          height:25/2px;
          line-height: 25/2px;
          text-align:center;
          margin:10px auto 0;
          border-radius: 25/2px;
          font-size:20/2px;
          color:#df5c3e;
        }
      }
      .bottomlist{
        position: absolute;
        top:100%;
        transform: translateY(-50%);
        width:100px;
        height:30px;
        border:3px solid #fff;
        border-radius:150px;
        background:#df5c3e;
        font-size:14px;
        color:#fff;
        text-align:center;
        z-index:1;
        display:flex;
        justify-content: center;
        align-items: center;
        span{
          display:inline-block;
        }
        .sliverimg{
          display:inline-block;
          width:20px;
          height:15px;
          background:url(../../../static/img/daojushangdian_18.png) no-repeat center center;
          background-size:cover;
          margin-right:4px;
        }
      }
    }
  }
  .myitemlist{
    margin:13px;
    ul{
      li{
        float:left;
        width:106px;
        height:106px;
        border-radius:5px;
        background:#ffe7e8;
        margin-right:17px;
        text-align:center;
        position:relative;
        image{
          width:50px;
          height:50px;
          margin-top:18px;
        }
        .centername{
          text-align:center;
          margin-top:5px;
          font-size:13px;
          color:#df5c3e;
        }
      }
      .bottomlist{
        position:absolute;
        top:50px;
        right:5px;
        font-size:15px;
        color: #df5c3e;
      }
    }
  }
  .model{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    text-align:center;
    background:rgba(0,0,0,0.6);
    z-index:20;
    .centermodel{
      background:#fff;
      width:230px;
      margin:147.5px auto 0;
      text-align:center;
      border-radius:25px;
      position:relative;
      padding:0 20px 18px;
      .topimg{
        position:absolute;
        top:-21.5px;
        left:50%;
        transform:translateX(-50%);
        -webkit-transform:translateX(-50%);
        width:78px;
        height:78px;
        border-radius:50%;
        background:#fff;
        text-align:center;
        image{
          width:70px;
          height:70px;
          margin-top:4px;
          border-radius:50%;
        }
      }
      .toolmessage{
        padding:60px 5px 0 5px;
        font-size:12px;
        color:#666;
        line-height:15px;
        text-align:left;
      }
      ul{margin-top:7px;}
      ul li{
        border-top:1px solid #e2e2e2;
        height:37px;
        padding:12.5px 5px 9.5px 5px;
        box-sizing:border-box;
        overflow:hidden;
          .icon{
            width:32/2px;
            height:30/2px;
            float:left;
            padding-right:4px;
          }
        }
        li:first-child{
          padding: 0 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .toolname {
            font-size: 14px;
            color:#df5c3e;
            font-weight: bold;
          }
          .toolright{
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          .amountcount{
            border:none;
            float:none;
            width:20px;
            padding-left:0;
            text-align:center;
          }
          .minusbtn{
            /*<!--width:32/2px;-->*/
            /*<!--height:30/2px;-->*/
            width:42/2px;
            height:40/2px;
            display:inline-block;
            background:url(../../../static/img/minusbtn.png) no-repeat right center;
            background-size:16px 15px;
            margin-right:5px;
            &.hui{
              background:url(../../../static/img/minusbtnhui.png) no-repeat right center;
              background-size:16px 15px;
            }
          }
          .addbtn{
            /*<!--width:32/2px;-->*/
            /*<!--height:30/2px;-->*/
            width:42/2px;
            height:40/2px;
            display:inline-block;
            background:url(../../../static/img/addbtn.png) no-repeat right center;
            background-size:16px 15px;
            margin-left:5px;
            &.hui{
              background:url(../../../static/img/addbtnhui.png) no-repeat right center;
              background-size:16px 15px;
            }
          }
        }
        .icon_number{
          background:url(../../../static/img/buy_2.png) no-repeat center center;
          background-size:16px 15px;
        }
        .icon_pointer{
          background:url(../../../static/img/buy_1.png) no-repeat left center;
          background-size:16px 15px;
        }
        .icon_money{
          background:url(../../../static/img/buy_4.png) no-repeat left center;
          background-size:16px 15px;
        }
        input{
          width:45%;
          font-size:10px;
          color:#666;
          float:left;
          min-height:15px;
          max-height:15px;
          height:15px;
          line-height:15px;
          border-left:1px solid #e2e2e2;
          text-align:left;
          padding-left:6px;
        }
        .content_title{
          padding-left:6px;
          font-size:12px;
          color:#666;
          float:left;
          height:15px;
          line-height:15px;
          border-left:1px solid #e2e2e2;
        }
        .number_right{
          font-size:10px;
          color:#df5c3e;
          max-width:40%;
        }
        .pay_type{
          float:right;
          width:42/2px;
          height:40/2px;
          background:url(../../../static/img/buy_3.png) no-repeat right top;
          background-size:16px 15px;
        }
        .pay_type.active{
          background:url(../../../static/img/buy_5.png) no-repeat right top;
          background-size:16px 15px;
        }
      }
      ul li:last-child{
        border-bottom:none;
      }
    }
  .nogetList{
    padding-top: 290px;
    box-sizing:border-box;
    background: url(../../../static/img/konhyemain.jpg) center 100px no-repeat;
    background-size:145px 148px;
    width: 100%;
    height: 297px;
    color: #999999;
    font-size: 14px;
    text-align: center;
    margin-bottom: 50px;
  }
  .ispay{
    margin:20px auto 0;
    width:96px;
    height:22.5px;
    border-radius:15px;
    background:#df5c3e;
    line-height:22.5px;
    text-align:center;
    font-size:14px;
    color:#fff;
  }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0;
    }
    input[type="number"]{-moz-appearance:textfield;}

</style>
