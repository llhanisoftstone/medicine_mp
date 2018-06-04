<template>
    <div class="container">
      <ul class="tablist">
        <li v-on:click="leftclick" stype="1" v-bind:class="{ on: isActive }">道具商店</li>
        <li stype="2" v-on:click="rightclick" v-bind:class="{ on: isclcik}">我的背包</li>
      </ul>
      <div class="itemlist" v-if="seen">
        <ul>
          <li v-on:click="buyuse(v.id,v.picpath)" v-for="(v,i) in goods" :key="v.id"><img :src="v.picpath" alt=""><div class="bottomlist"><span class="sliverimg"></span><span>{{v.points}}</span></div></li>
        </ul>
      </div>
      <div class="myitemlist" v-if="isshow">
        <ul>
          <li v-for="(w,i) in mypackage" :key="w.id"><img :src="w.picpath" alt=""><div class="bottomlist">x{{w.amount}}</div></li>
        </ul>
      </div>
      <div class="model" v-if="ishidden" @click="show1()">
        <div class="centermodel" @click.stop="show()">
            <div class="topimg"><img :src="picpath" alt=""></div>
            <ul>
              <li><span class="icon icon_number"></span>
                <input id="price" type="number"  v-model="amount" ref="type1" placeholder="购买个数"  maxlength="7"  onkeyup="value=value.replace(/[^\d]/g,'')"/>
                  <span class="number_right">{{name_type}}<span class="show" v-if="istotalpoint">{{amount*20}}</span><span class="show" v-if="istotalprice">{{amount*0.2}}</span></span>
              </li>
              <li><span class="icon icon_pointer"></span><span class="content_title">可用银两<span class="isusepointer"></span>{{points}}</span><span class="pay_type" v-on:click="slelecttype(2)" v-bind:class="{active:paytype2}" _pay_type="2"></span></li>
              <li><span class="icon icon_money"></span><span class="content_title">微信支付</span><span class="pay_type" v-on:click="slelecttype(1)" v-bind:class="{active:paytype1}" _pay_type="1"></span></li>
            </ul>
          <div class="ispay" v-on:click="orderlist">确认支付</div>
        </div>
      </div>
      <div class="nogetList" v-if="iskong">暂无记录</div>
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
            }
        },
        methods: {
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
            this.getmybuy();
          },
          buyuse(id,picpath){
            this.goods_id=id;
            this.ishidden=true;
            this.amount=1;
            this.picpath=picpath;
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
                res.rows[i].picpath = that.$store.state.url+ res.rows[i].picpath
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
            let res = await that.$get('/rs/member_package',{u_id:this.$store.state.user.userid});
            if(res.code==200){
              this.iskong=false;
              for(let i = 0;i<res.rows.length;i++){
                res.rows[i].picpath = that.$store.state.url+ res.rows[i].picpath
              }
              this.mypackage = res.rows;
            }else if(res.code==602){
                this.iskong=true;
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
                this.ishidden=false;
                if(this.pay_type==1){
                  this.$callWXPAY(res.main_order_id,this.$store.state.openid);
                }else{
                  let use = this.$store.state.user
                  if(this.goods_id == 1){
                    use.tools[0].amount = use.tools[0].amount+this.amount
                  }else{
                    use.tools[1].amount = use.tools[1].amount+this.amount
                  }
                  this.$store.commit('getm_user',use)
                  this.$mptoast("支付成功");
                }
            }else if(res.code==607){
              this.$mptoast("银两余额不足");
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
      li{
        float:left;
        width:106px;
        height:120px;
        border-radius:5px;
        background:#ffe7e8;
        margin-right:17px;
        text-align:center;
        position:relative;
        image{
          width:65px;
          height:65px;
          margin-top:20px;
        }
      }
      .bottomlist{
        margin-top:20px;
        width:100px;
        height:30px;
        border:2.5px solid #fff;
        border-radius:100px;
        background:#df5c3e;
        font-size:14px;
        color:#fff;
        text-align:center;
        z-index:50;
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
          width:65px;
          height:65px;
          margin-top:20px;
        }
      }
      .bottomlist{
        position:absolute;
        top:70px;
        left:70px;
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
      padding:0 20px 20px;
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
      ul{padding-top:43px;}
      ul li{
        border-bottom:1px solid #e2e2e2;
        height:37px;
        padding:12.5px 2.5px 9.5px 2.5px;
        box-sizing:border-box;
        overflow:hidden;
        .icon{
          width:15px;
          height:15px;
          float:left;
          padding-right:5px;
        }
        .icon_number{
          background:url(../../../static/img/buy_2.png) no-repeat left center;
          background-size:15px 15px;
        }
        .icon_pointer{
          background:url(../../../static/img/buy_1.png) no-repeat left center;
          background-size:15px 15px;
        }
        .icon_money{
          background:url(../../../static/img/buy_4.png) no-repeat left center;
          background-size:15px 15px;
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
          font-size:10px;
          color:#666;
          float:left;
          height:15px;
          line-height:15px;
          border-left:1px solid #e2e2e2;
        }
        .number_right{
          float:right;
          font-size:10px;
          color:#df5c3e;
          max-width:40%;
        }
        .pay_type{
          float:right;
          width:15px;
          height:15px;
          background:url(../../../static/img/buy_3.png) no-repeat left center;
          background-size:15px 15px;
        }
        .pay_type.active{
          background:url(../../../static/img/buy_5.png) no-repeat left center;
          background-size:15px 15px;
        }
      }
      ul li:last-child{
        border-bottom:none;
      }
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
