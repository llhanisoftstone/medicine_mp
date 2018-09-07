<template>
  <div class="container">
    <div class="mpvue-picer">
    <div class="item">
      <div class="title">选择省</div>
      <input type="default" placeholder="选择省" :value="pickerprovinceText" disabled="disabled" class="cityCont" @click="showprovincePicker" />
    </div>
    <div class="item">
      <div class="title">选择市</div>
      <input type="default" placeholder="选择市" :value="pickercityText" disabled="disabled" class="cityCont" @click="showcityPicker" />
    </div>
    <div class="item">
      <div class="title">选择县</div>
      <input type="" placeholder="选择县" :value="pickerzoneText" disabled="disabled" class="cityCont" @click="showzonePicker" />
    </div>
    <mpvue-picker
      ref="mpvuePicker" @pickerCancel="pickerCancel"
      :pickerValueArray="pickerValueArray"
      :pickerValueDefault='pickerValueDefault'
      :mode="mode"
      :deepLength=deepLength
      @onConfirm="onConfirm" >
    </mpvue-picker>
  </div>
    <div class="item">
      <div class="title">详细地址</div>
      <input type="text"   placeholder="详细地址" maxlength="15" confirm-type="next" v-model='address' />
    </div>
    <div :class="{'btn':true}" @click="childrenmitData">
      确&nbsp;&nbsp;&nbsp;认
    </div>
    <mptoast :toasthide="toasthide"/>
  </div>
</template>

<script type="javascript">
  import mpvuePicker from 'mpvue-picker';
  import mptoast from '../../components/mptoast';
  export default {
    label: 'address',
    props: [],
    components: {
      mptoast,
      mpvuePicker
    },
    data(){
      return {
        rank:1,
        mode:'selector',
        deepLength:0,
        pickerValueArray:[],
        pickerValueDefault:[0],
        pickerprovinceText:'',
        pickercityText:'',
        pickerzoneText:'',
        province_id:'',
        provinceidlist:'',
        cityidlist:'',
        zoneidlist:'',
        city_id:'',
        zone_id:'',
        address:'',
        select:'',
        add_id:'',
        toasthide:false,
        isBtnClicked:false,
      }
    },
    methods: {
      showprovincePicker() {
        var than=this;
        this.$get('/rs/city_zone',{deep:1}).then(res=>{
          if(res.code==200){
            var obj = [];
            var array=[];
            for(var i=0;i<res.rows.length;i++){
              var o = {};
              array.push(res.rows[i].name)
              o.id = res.rows[i].id;
              o.name = res.rows[i].name;
              obj.push(o);
            }
            than.pickerValueArray=array;
            than.provinceidlist = obj;
            this.select=1;
            this.$refs.mpvuePicker.show();
          }
        })

      },
      showcityPicker() {
        var than=this;
        this.pickerValueArray=[];
        if(this.province_id==null||this.province_id==""){
          this.$mptoast("请先选择省");
          return;
        }
        this.$get('/rs/city_zone',{deep:2,pid:this.province_id}).then(res=>{
          if(res.code==200){
            var obj2 = [];
            var array2=[];
            for(var i=0;i<res.rows.length;i++){
              var o = {};
              array2.push(res.rows[i].name)
              o.id = res.rows[i].id;
              o.name = res.rows[i].name;
              obj2.push(o);
            }
            than.pickerValueArray=array2;
            than.cityidlist = obj2;
            this.select=2;
            this.$refs.mpvuePicker.show();
          }
        })
      },
      showzonePicker() {
        var than=this;
        this.pickerValueArray=[];
        if(this.city_id==null||this.city_id==""){
          this.$mptoast("请先选择市");
          return;
        }
        this.$get('/rs/city_zone',{deep:3,pid:this.city_id}).then(res=>{
          if(res.code==200){
            var obj3 = [];
            var array3=[];
            for(var i=0;i<res.rows.length;i++){
              var o = {};
              array3.push(res.rows[i].name)
              o.id = res.rows[i].id;
              o.name = res.rows[i].name;
              obj3.push(o);
            }
            than.pickerValueArray=array3;
            than.zoneidlist = obj3;
            this.select=3;
            this.$refs.mpvuePicker.show();
          }
        })
      },
      pickerConfirm(e) {
      },
      onConfirm(e){
          if(this.select==1){
            this.pickerprovinceText = this.pickerValueArray[e[0]];
            this.pickercityText = "";
            this.pickerzoneText = "";
            for(var i=0;i<this.provinceidlist.length;i++){
                if(this.pickerprovinceText==this.provinceidlist[i].name){
                    this.province_id=this.provinceidlist[i].id;
                }
            }
          }else if(this.select==2){
            this.pickercityText = this.pickerValueArray[e[0]];
            this.pickerzoneText = "";
            for(var i=0;i<this.cityidlist.length;i++){
              if(this.pickercityText==this.cityidlist[i].name){
                this.city_id=this.cityidlist[i].id;
              }
            }
          }else if(this.select==3){
            this.pickerzoneText = this.pickerValueArray[e[0]];
            for(var i=0;i<this.zoneidlist.length;i++){
              if(this.pickerzoneText==this.zoneidlist[i].name){
                this.zone_id=this.zoneidlist[i].id;
              }
            }
          }

      },
      childrenmitData(){
        if(this.province_id==null||this.province_id==""){
          this.$mptoast('请选择省');
          return;
        }
        if(this.city_id==null||this.city_id==""){
          this.$mptoast('请选择市');
          return;
        }
        if(this.zone_id==null||this.zone_id==""){
          this.$mptoast('请选择县');
          return;
        }
        if(this.address==null||(this.address).trim()==''){
          this.$mptoast('请输入详细地址');
          return;
        }
        var data={
          u_id:this.$store.state.user.userid,
          address:this.address,
          province_id:this.province_id,
          city_id:this.city_id,
          zone_id:this.zone_id,
        }
        if(this.add_id){
          this.$put('/rs/address/'+this.add_id,data).then(res=>{
            if(res.code == 200){
              this.$mptoast('修改成功',100);
              if(this.isBtnClicked) {
                this.isBtnClicked = false;
                setTimeout(function () {
                  wx.navigateBack({     //返回上一页面或多级页面
                    delta: 1
                  })
                }, 1500);
              }
            }else{
              this.$mptoast('修改失败',100);
            }
          })
        }else{
          this.$post('/rs/address',data).then(res=>{
            if(res.code == 200){
              this.$mptoast('保存成功',100);
              if(this.isBtnClicked) {
                this.isBtnClicked = false;
                setTimeout(function () {
                  wx.navigateBack({     //返回上一页面或多级页面
                    delta: 1
                  })
                }, 1500);
              }
            }else{
              this.$mptoast('保存失败',100);
            }
          })
        }
      },
      getUserinfo(){
        var that=this;
        this.$get('/rs/v_address',{u_id:this.$store.state.user.userid}).then(res=>{
          if(res.code==200){
            this.pickerprovinceText=res.rows[0].province_name;
            this.pickercityText=res.rows[0].city_name;
            this.pickerzoneText=res.rows[0].zone_name;
            this.address=res.rows[0].address;
            this.province_id=res.rows[0].province_id;
            this.city_id=res.rows[0].city_id;
            this.zone_id=res.rows[0].zone_id;
            this.add_id=res.rows[0].id;
          }

        })
      }

    },
    mounted(){
      this.getUserinfo();
      this.rank=1;
    },
    onShow(){
      this.toasthide = true;
      setTimeout(()=>{  this.toasthide = false;},2000)
      this.isBtnClicked=true;
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/common.less';
  .container{
    margin: 10px 20px;
    min-height: 500px;
  }
  .container .item{
    height: 40px;
    line-height:40px;
    border-bottom: 1px solid #ccc;
    padding-left: 80px;
    position: relative;
  }
  .item .title{
    position: absolute;
    font-size: 15px;
    left: 10px;
    color: #333;
  }
  .textClass{
    top:60%;
  }
  .item input{
    height: 40px;
    font-size: 15px;
    line-height: 15px;
  }
  .item .sex{
    height: 40px;
    font-size: 15px;
    line-height: 40px;
    color: #666;
  }
  .item image{
    width:6px;
    height:12px;
    position:absolute;
    right:0;
    top:15px;
  }
  .uploadLogo{
    position: absolute;
    right: 5px;
    top: 10px;
    height: 20px;
    width: 20px;
    background: url("../../../static/img/shangchuan.png") center no-repeat;
    background-size: 20px;
  }
  .imgurl{
    width: 220px;
  }
  .btn{
    margin: 0 auto;
    margin-top: 100px;
    width:335px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    font-size: 14px;
    border-radius:5px;
    background: #df5c3e;
    text-align: center;
  }
  .mpvue-picker__action {
    flex:1;
    color:#df5c3e;
  }
  .cityCont{
    display:inline-block;
  }

</style>
