<template>
    <div class="container">
      <div v-if="rank ==20">
        <div class="item">
          <div class="title">商家名称</div>
          <input type="text" confirm-type="next" maxlength="15" v-model='shop_name'  placeholder="请输入商家名称"/>
        </div>
        <div class="item">
          <div class="title">商家logo</div>
          <input
                 @click="openImg"
                 v-model='shop_logo'
                 class="imgurl"
                 disabled="disabled"
                 type="text" placeholder="请上传"/>
          <icon class="uploadLogo"></icon>
        </div>
        <div class="item">
          <div class="title">联系电话</div>
          <input type="number" v-model='shop_phone' maxlength="11" confirm-type="next" placeholder="请输入联系电话" />
        </div>
        <div class="item">
          <div class="title">联系地址</div>
          <input type="text" placeholder="请输入联系地址" maxlength="30" confirm-type="done" v-model='shop_address' />
        </div>
        <div :class="{'btn':true}"  @click="submitData1">
          确认
        </div>
      </div>
      <div v-else>
        <div class="item">
          <div class="title">姓名</div>
          <input type="text" :value='name' disabled maxlength="10" readonly onfocus="this.blur()" confirm-type="next" placeholder="请输入姓名"/>
        </div>
        <div class="item">
          <div class="title">性别</div>
          <input disabled="disabled" :value='gender' type="text"  placeholder="请选择性别"/>
        </div>
        <div class="item">
          <div class="title">手机号</div>
          <input type="number" v-model='phone' maxlength="11" confirm-type="next"  placeholder="手机号" />
        </div>
        <div class="item">
          <div class="title">选择地区</div>
          <div class="mpvue-picer">
          <input type="text" placeholder="选择地区" :value="pickerText" disabled="disabled" class="cityCont" @click="showPicker" />
          <mpvue-picker
            ref="mpvuePicker"
            :pickerValueArray="pickerValueArray"
            :pickerValueDefault='pickerValueDefault'
            :mode="multiSelector"
            @onConfirm="onConfirm" :deepLength="3">
          </mpvue-picker>
          </div>
        </div>
        <div class="item">
          <div class="title">详细地址</div>
          <input type="text"   placeholder="详细地址" maxlength="18" confirm-type="done" v-model='cardNum' />
        </div>
        <div :class="{'btn':true}" @click="submitData">
          确&nbsp;&nbsp;&nbsp;认
        </div>
      </div>
      <mptoast/>
    </div>
</template>

<script type="javascript">
  import mpvuePicker from 'mpvue-picker';
  import mptoast from '../../components/mptoast';
  export default {
        name: 'userdata',
        props: [],
        components: {
          mptoast,
          mpvuePicker
        },
        data(){
            return {
              rank:1,
              pickerValueArray:  [
                {
                  lable: "北京",
                  value:0,
                  children: [
                    {
                      lable: "北京",
                      value:1,
                      children: [{lable: "东城区",value:1}, {lable: "西城区",value:2}, {lable: "崇文区",value:3}, {lable: "宣武区",value:4}, {lable: "朝阳区",value:5}, {lable: "海淀区",value:6}, {lable: "丰台区",value:7}, {lable: "石景山区",value:8}, {lable: "房山区",value:9}, {lable: "通州区",value:10}, {lable: "顺义区",value:11}, {lable: "昌平区",value:12}, {lable: "大兴区",value:13}, {lable: "怀柔区",value:14}, {lable: "平谷区",value:15}, {lable: "门头沟区",value:16}, {lable: "密云县",value:17}, {lable: "延庆县",value:18}],
                    }],
                },
                {
                  lable: "广东",
                  value:0,
                  children: [
                    {
                      lable: "广州",
                      value:1,
                      children: [{lable: "越秀区",value:1}, {lable: "荔湾区",value:2}, {lable: "海珠区",value:3}, {lable: "天河区",value:4}, {lable: "白云区",value:5}, {lable: "黄埔区",value:6}, {lable: "番禺区",value:7}, {lable: "花都区",value:8}, {lable: "南沙区",value:9}, {lable: "萝岗区",value:10}, {lable: "增城市",value:11}, {lable: "从化市",value:12}],
                    },
                    {
                      lable: "深圳",
                      value:1,
                      children: [ {lable: "福田区",value:1}, {lable: "罗湖区",value:2}, {lable: "南山区",value:3}, {lable: "宝安区",value:4}, {lable: "龙岗区",value:5}, {lable: "盐田区",value:6}],
                    },
                    {
                      lable: "珠海",
                      value:1,
                      children: [{lable: "香洲区",value:1}, {lable: "斗门区",value:2}, {lable: "金湾区",value:3}],
                    },
                    {
                      lable: "汕头",
                      value:1,
                      children: [ {lable: "金平区"}, {lable: "濠江区"}, {lable: "龙湖区"}, {lable: "潮阳区"}, {lable: "潮南区"}, {lable: "澄海区"}, {lable: "南澳县"}],
                    },
                    {
                      lable: "韶关",
                      value:1,
                      children: [{lable: "浈江区"}, {lable: "武江区"}, {lable: "曲江区"}, {lable: "乐昌市"}, {lable: "南雄市"}, {lable: "始兴县"}, {lable: "仁化县"}, {lable: "翁源县"}, {lable: "新丰县"}, {lable: "乳源瑶族自治县"}],
                    },
                    {
                      lable: "佛山",
                      value:1,
                      children: [{lable: "禅城区"}, {lable: "南海区"}, {lable: "顺德区"}, {lable: "三水区"}, {lable: "高明区"}],
                    },
                    {
                      lable: "江门",
                      value:1,
                      children: [{lable: "蓬江区"}, {lable: "江海区"}, {lable: "新会区"}, {lable: "恩平市"}, {lable: "台山市"}, {lable: "开平市"}, {lable: "鹤山市"}],
                    },
                    {
                      lable: "湛江",
                      value:1,
                      children: [{lable: "赤坎区"}, {lable: "霞山区"}, {lable: "坡头区"}, {lable: "麻章区"}, {lable: "吴川市"}, {lable: "廉江市"}, {lable: "雷州市"}, {lable: "遂溪县"}, {lable: "徐闻县"}],
                    },
                    {
                      lable: "茂名",
                      value:1,
                      children: [{lable: "茂南区"}, {lable: "茂港区"}, {lable: "化州市"}, {lable: "信宜市"}, {lable: "高州市"}, {lable: "电白县"}],
                    },
                    {
                      lable: "肇庆",
                      value:1,
                      children: [{lable: "端州区"}, {lable: "鼎湖区"}, {lable: "高要市"}, {lable: "四会市"}, {lable: "广宁县"}, {lable: "怀集县"}, {lable: "封开县"}, {lable: "德庆县"}],
                    },
                    {
                      lable: "惠州",
                      value:1,
                      children: [{lable: "惠城区"}, {lable: "惠阳区"}, {lable: "博罗县"}, {lable: "惠东县"}, {lable: "龙门县"}],
                    },
                    {
                      lable: "梅州",
                      value:1,
                      children: [{lable: "梅江区"}, {lable: "兴宁市"}, {lable: "梅县"}, {lable: "大埔县"}, {lable: "丰顺县"}, {lable: "五华县"}, {lable: "平远县"}, {lable: "蕉岭县"}],
                    },
                    {
                      lable: "汕尾",
                      value:1,
                      children: [{lable: "城区"}, {lable: "陆丰市"}, {lable: "海丰县"}, {lable: "陆河县"}],
                    },
                    {
                      lable: "河源",
                      value:1,
                      children: [ {lable: "源城区"}, {lable: "紫金县"}, {lable: "龙川县"}, {lable: "连平县"}, {lable: "和平县"}, {lable: "东源县"}],
                    },
                    {
                      lable: "阳江",
                      value:1,
                      children: [{lable: "江城区"}, {lable: "阳春市"}, {lable: "阳西县"}, {lable: "阳东县"}],
                    },
                    {
                      lable: "清远",
                      value:1,
                      children: [{lable: "清城区"}, {lable: "英德市"}, {lable: "连州市"}, {lable: "佛冈县"}, {lable: "阳山县"}, {lable: "清新县"}, {lable: "连山壮族瑶族自治县"}, {lable: "连南瑶族自治县"}],
                    },
                    {
                      lable: "东莞",
                      value:1,
                      children: [],
                    },
                    {
                      lable: "中山",
                      value:1,
                      children: [],
                    },
                    {
                      lable: "潮州",
                      value:1,
                      children: [{lable: "湘桥区"}, {lable: "潮安县"}, {lable: "饶平县"}],
                    },
                    {
                      lable: "揭阳",
                      value:1,
                      children: [ {lable: "榕城区"}, {lable: "普宁市"}, {lable: "揭东县"}, {lable: "揭西县"}, {lable: "惠来县"}],
                    },
                    {
                      lable: "云浮",
                      value:1,
                      children: [{lable: "云城区"}, {lable: "罗定市"}, {lable: "云安县"}, {lable: "新兴县"}, {lable: "郁南县"}],
                    }
                  ]
                },
                {
                  lable: "上海",
                  value:0,
                  children: [
                    {
                      lable: "上海",
                      value:1,
                      children: [ {lable: "黄浦区"}, {lable: "卢湾区"}, {lable: "徐汇区"}, {lable: "长宁区"}, {lable: "静安区"}, {lable: "普陀区"}, {lable: "闸北区"}, {lable: "虹口区"}, {lable: "杨浦区"}, {lable: "宝山区"}, {lable: "闵行区"}, {lable: "嘉定区"}, {lable: "松江区"}, {lable: "金山区"}, {lable: "青浦区"}, {lable: "南汇区"}, {lable: "奉贤区"}, {lable: "浦东新区"}, {lable: "崇明县"}],
                    }],
                },
                {
                  lable: "天津",
                  value:0,
                  children: [
                    {
                      lable: "天津",
                      children: [{lable: "和平区"}, {lable: "河东区"}, {lable: "河西区"}, {lable: "南开区"}, {lable: "河北区"}, {lable: "红桥区"}, {lable: "塘沽区"}, {lable: "汉沽区"}, {lable: "大港区"}, {lable: "东丽区"}, {lable: "西青区"}, {lable: "北辰区"}, {lable: "津南区"}, {lable: "武清区"}, {lable: "宝坻区"}, {lable: "静海县"}, {lable: "宁河县"}, {lable: "蓟县"}],
                      value:1
                    }],
                },
                {
                  lable: "重庆",
                  value:0,
                  children: [
                    {
                      lable: "重庆",
                      children: [{lable: "渝中区"}, {lable: "大渡口区"}, {lable: "江北区"}, {lable: "南岸区"}, {lable: "北碚区"}, {lable: "渝北区"}, {lable: "巴南区"}, {lable: "长寿区"}, {lable: "双桥区"}, {lable: "沙坪坝区"}, {lable: "万盛区"}, {lable: "万州区"}, {lable: "涪陵区"}, {lable: "黔江区"}, {lable: "永川区"}, {lable: "合川区"}, {lable: "江津区"}, {lable: "九龙坡区"}, {lable: "南川区"}, {lable: "綦江县"}, {lable: "潼南县"}, {lable: "荣昌县"}, {lable: "璧山县"}, {lable: "大足县"}, {lable: "铜梁县"}, {lable: "梁平县"}, {lable: "开县"}, {lable: "忠县"}, {lable: "城口县"}, {lable: "垫江县"}, {lable: "武隆县"}, {lable: "丰都县"}, {lable: "奉节县"}, {lable: "云阳县"}, {lable: "巫溪县"}, {lable: "巫山县"}, {lable: "石柱土家族自治县"}, {lable: "秀山土家族苗族自治县"}, {lable: "酉阳土家族苗族自治县"}, {lable: "彭水苗族土家族自治县"}],
                      value: 1
                    }],
                },
                {
                  lable: "辽宁",
                  value:0,
                  children: [
                    {
                      lable: "沈阳",
                      children: [{lable: "沈河区"}, {lable: "皇姑区"}, {lable: "和平区"}, {lable: "大东区"}, {lable: "铁西区"}, {lable: "苏家屯区"}, {lable: "东陵区"}, {lable: "于洪区"}, {lable: "新民市"}, {lable: "法库县"}, {lable: "辽中县"}, {lable: "康平县"}, {lable: "新城子区"}],
                      value: 1,
                    },
                    {
                      lable: "大连",
                      children: [{lable: "请选择"}, {lable: "西岗区"}, {lable: "中山区"}, {lable: "沙河口区"}, {lable: "甘井子区"}, {lable: "旅顺口区"}, {lable: "金州区"}, {lable: "瓦房店市"}, {lable: "普兰店市"}, {lable: "庄河市"}, {lable: "长海县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "鞍山",
                      children: [{lable: "请选择"}, {lable: "铁东区"}, {lable: "铁西区"}, {lable: "立山区"}, {lable: "千山区"}, {lable: "海城市"}, {lable: "台安县"}, {lable: "岫岩满族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "抚顺",
                      children: [{lable: "请选择"}, {lable: "顺城区"}, {lable: "新抚区"}, {lable: "东洲区"}, {lable: "望花区"}, {lable: "抚顺县"}, {lable: "清原满族自治县"}, {lable: "新宾满族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "本溪",
                      children: [{lable: "请选择"}, {lable: "平山区"}, {lable: "明山区"}, {lable: "溪湖区"}, {lable: "南芬区"}, {lable: "本溪满族自治县"}, {lable: "桓仁满族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "丹东",
                      children: [{lable: "请选择"}, {lable: "振兴区"}, {lable: "元宝区"}, {lable: "振安区"}, {lable: "东港市"}, {lable: "凤城市"}, {lable: "宽甸满族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "锦州",
                      children: [{lable: "请选择"}, {lable: "太和区"}, {lable: "古塔区"}, {lable: "凌河区"}, {lable: "凌海市"}, {lable: "黑山县"}, {lable: "义县"}, {lable: "北宁市"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "营口",
                      children: [{lable: "请选择"}, {lable: "站前区"}, {lable: "西市区"}, {lable: "鲅鱼圈区"}, {lable: "老边区"}, {lable: "大石桥市"}, {lable: "盖州市"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "阜新",
                      children: [{lable: "请选择"}, {lable: "海州区"}, {lable: "新邱区"}, {lable: "太平区"}, {lable: "清河门区"}, {lable: "细河区"}, {lable: "彰武县"}, {lable: "阜新蒙古族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "辽阳",
                      children: [{lable: "请选择"}, {lable: "白塔区"}, {lable: "文圣区"}, {lable: "宏伟区"}, {lable: "太子河区"}, {lable: "弓长岭区"}, {lable: "灯塔市"}, {lable: "辽阳县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "盘锦",
                      children: [{lable: "请选择"}, {lable: "双台子区"}, {lable: "兴隆台区"}, {lable: "盘山县"}, {lable: "大洼县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "铁岭",
                      children: [{lable: "请选择"}, {lable: "银州区"}, {lable: "清河区"}, {lable: "调兵山市"}, {lable: "开原市"}, {lable: "铁岭县"}, {lable: "昌图县"}, {lable: "西丰县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "朝阳",
                      children: [{lable: "请选择"}, {lable: "双塔区"}, {lable: "龙城区"}, {lable: "凌源市"}, {lable: "北票市"}, {lable: "朝阳县"}, {lable: "建平县"}, {lable: "喀喇沁左翼蒙古族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "葫芦岛",
                      children: [{lable: "请选择"}, {lable: "龙港区"}, {lable: "南票区"}, {lable: "连山区"}, {lable: "兴城市"}, {lable: "绥中县"}, {lable: "建昌县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "江苏",
                  value:0,
                  children: [
                    {
                      lable: "南京",
                      children: [ {lable: "玄武区"}, {lable: "白下区"}, {lable: "秦淮区"}, {lable: "建邺区"}, {lable: "鼓楼区"}, {lable: "下关区"}, {lable: "栖霞区"}, {lable: "雨花台区"}, {lable: "浦口区"}, {lable: "江宁区"}, {lable: "六合区"}, {lable: "溧水县"}, {lable: "高淳县"}],
                      value: 1
                    },
                    {
                      lable: "苏州",
                      children: [{lable: "金阊区"}, {lable: "平江区"}, {lable: "沧浪区"}, {lable: "虎丘区"}, {lable: "吴中区"}, {lable: "相城区"}, {lable: "常熟市"}, {lable: "张家港市"}, {lable: "昆山市"}, {lable: "吴江市"}, {lable: "太仓市"}],
                      value: 1
                    },
                    {
                      lable: "无锡",
                      children: [{lable: "崇安区"}, {lable: "南长区"}, {lable: "北塘区"}, {lable: "滨湖区"}, {lable: "锡山区"}, {lable: "惠山区"}, {lable: "江阴市"}, {lable: "宜兴市"}],
                      value: 1
                    },
                    {
                      lable: "常州",
                      children: [{lable: "钟楼区"}, {lable: "天宁区"}, {lable: "戚墅堰区"}, {lable: "新北区"}, {lable: "武进区"}, {lable: "金坛市"}, {lable: "溧阳市"}],
                      value: 1
                    },
                    {
                      lable: "镇江",
                      children: [{lable: "京口区"}, {lable: "润州区"}, {lable: "丹徒区"}, {lable: "丹阳市"}, {lable: "扬中市"}, {lable: "句容市"}],
                      value: 1
                    },
                    {
                      lable: "南通",
                      children: [ {lable: "崇川区"}, {lable: "港闸区"}, {lable: "通州市"}, {lable: "如皋市"}, {lable: "海门市"}, {lable: "启东市"}, {lable: "海安县"}, {lable: "如东县"}],
                      value: 1
                    },
                    {
                      lable: "泰州",
                      children: [{lable: "海陵区"}, {lable: "高港区"}, {lable: "姜堰市"}, {lable: "泰兴市"}, {lable: "靖江市"}, {lable: "兴化市"}],
                      value: 1
                    },
                    {
                      lable: "扬州",
                      children: [{lable: "广陵区"}, {lable: "维扬区"}, {lable: "邗江区"}, {lable: "江都市"}, {lable: "仪征市"}, {lable: "高邮市"}, {lable: "宝应县"}],
                      value: 1
                    },
                    {
                      lable: "盐城",
                      children: [{lable: "亭湖区"}, {lable: "盐都区"}, {lable: "大丰市"}, {lable: "东台市"}, {lable: "建湖县"}, {lable: "射阳县"}, {lable: "阜宁县"}, {lable: "滨海县"}, {lable: "响水县"}],
                      value: 1
                    },
                    {
                      lable: "连云港",
                      children: [{lable: "请选择"}, {lable: "新浦区"}, {lable: "海州区"}, {lable: "连云区"}, {lable: "东海县"}, {lable: "灌云县"}, {lable: "赣榆县"}, {lable: "灌南县"}],
                      value: 1
                    },
                    {
                      lable: "徐州",
                      children: [{lable: "云龙区"}, {lable: "鼓楼区"}, {lable: "九里区"}, {lable: "泉山区"}, {lable: "贾汪区"}, {lable: "邳州市"}, {lable: "新沂市"}, {lable: "铜山县"}, {lable: "睢宁县"}, {lable: "沛县"}, {lable: "丰县"}],
                      value: 1
                    },
                    {
                      lable: "淮安",
                      children: [{lable: "清河区"}, {lable: "清浦区"}, {lable: "楚州区"}, {lable: "淮阴区"}, {lable: "涟水县"}, {lable: "洪泽县"}, {lable: "金湖县"}, {lable: "盱眙县"}],
                      value: 1
                    },
                    {
                      lable: "宿迁",
                      children: [ {lable: "宿城区"}, {lable: "宿豫区"}, {lable: "沭阳县"}, {lable: "泗阳县"}, {lable: "泗洪县"}],
                      value: 1
                    }
                  ],
                },
                {
                  lable: "湖北",
                  value:0,
                  children: [
                    {
                      lable: "武汉",
                      children: [{lable: "江岸区"}, {lable: "武昌区"}, {lable: "江汉区"}, {lable: "硚口区"}, {lable: "汉阳区"}, {lable: "青山区"}, {lable: "洪山区"}, {lable: "东西湖区"}, {lable: "汉南区"}, {lable: "蔡甸区"}, {lable: "江夏区"}, {lable: "黄陂区"}, {lable: "新洲区"}],
                      value: 1
                    },
                    {
                      lable: "黄石",
                      children: [ {lable: "黄石港区"}, {lable: "西塞山区"}, {lable: "下陆区"}, {lable: "铁山区"}, {lable: "大冶市"}, {lable: "阳新县"}],
                      value: 1
                    },
                    {
                      lable: "十堰",
                      children: [{lable: "张湾区"}, {lable: "茅箭区"}, {lable: "丹江口市"}, {lable: "郧县"}, {lable: "竹山县"}, {lable: "房县"}, {lable: "郧西县"}, {lable: "竹溪县"}],
                      value: 1
                    },
                    {
                      lable: "荆州",
                      children: [{lable: "沙市区"}, {lable: "荆州区"}, {lable: "洪湖市"}, {lable: "石首市"}, {lable: "松滋市"}, {lable: "监利县"}, {lable: "公安县"}, {lable: "江陵县"}],
                      value: 1
                    },
                    {
                      lable: "宜昌",
                      children: [ {lable: "西陵区"}, {lable: "伍家岗区"}, {lable: "点军区"}, {lable: "猇亭区"}, {lable: "夷陵区"}, {lable: "宜都市"}, {lable: "当阳市"}, {lable: "枝江市"}, {lable: "秭归县"}, {lable: "远安县"}, {lable: "兴山县"}, {lable: "五峰土家族自治县"}, {lable: "长阳土家族自治县"}],
                      value: 1
                    },
                    {
                      lable: "襄樊",
                      children: [{lable: "襄城区"}, {lable: "樊城区"}, {lable: "襄阳区"}, {lable: "老河口市"}, {lable: "枣阳市"}, {lable: "宜城市"}, {lable: "南漳县"}, {lable: "谷城县"}, {lable: "保康县"}],
                      value: 1
                    },
                    {
                      lable: "鄂州",
                      children: [{lable: "请选择"}, {lable: "鄂城区"}, {lable: "华容区"}, {lable: "梁子湖区"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "荆门",
                      children: [{lable: "东宝区"}, {lable: "掇刀区"}, {lable: "钟祥市"}, {lable: "京山县"}, {lable: "沙洋县"}],
                      value: 1
                    },
                    {
                      lable: "孝感",
                      children: [{lable: "孝南区"}, {lable: "应城市"}, {lable: "安陆市"}, {lable: "汉川市"}, {lable: "云梦县"}, {lable: "大悟县"}, {lable: "孝昌县"}],
                      value:1
                    },
                    {
                      lable: "黄冈",
                      children: [ {lable: "黄州区"}, {lable: "麻城市"}, {lable: "武穴市"}, {lable: "红安县"}, {lable: "罗田县"}, {lable: "浠水县"}, {lable: "蕲春县"}, {lable: "黄梅县"}, {lable: "英山县"}, {lable: "团风县"}],
                      value: 1
                    },
                    {
                      lable: "咸宁",
                      children: [{lable: "咸安区"}, {lable: "赤壁市"}, {lable: "嘉鱼县"}, {lable: "通山县"}, {lable: "崇阳县"}, {lable: "通城县"}],
                      value: 1
                    },
                    {
                      lable: "随州",
                      children: [{lable: "曾都区"}, {lable: "广水市"}],
                      value: 1
                    },
                    {
                      lable: "恩施土家族苗族自治州",
                      children: [{lable: "恩施市"}, {lable: "利川市"}, {lable: "建始县"}, {lable: "来凤县"}, {lable: "巴东县"}, {lable: "鹤峰县"}, {lable: "宣恩县"}, {lable: "咸丰县"}],
                      value: 1
                    },
                    {
                      lable: "仙桃",
                      children: [],
                      value: 1
                    },
                    {
                      lable: "天门",
                      children: [],
                      value: 1
                    },
                    {
                      lable: "潜江",
                      children: [],
                      value: 1
                    },
                    {
                      lable: "神农架林区",
                      children: [],
                      value: 1
                    }
                  ],
                },
                {
                  lable: "四川",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "成都",
                      children: [{lable: "青羊区"}, {lable: "锦江区"}, {lable: "金牛区"}, {lable: "武侯区"}, {lable: "成华区"}, {lable: "龙泉驿区"}, {lable: "青白江区"}, {lable: "新都区"}, {lable: "温江区"}, {lable: "都江堰市"}, {lable: "彭州市"}, {lable: "邛崃市"}, {lable: "崇州市"}, {lable: "金堂县"}, {lable: "郫县"}, {lable: "新津县"}, {lable: "双流县"}, {lable: "蒲江县"}, {lable: "大邑县"}],
                      value: 1
                    },
                    {
                      lable: "自贡",
                      children: [{lable: "大安区"}, {lable: "自流井区"}, {lable: "贡井区"}, {lable: "沿滩区"}, {lable: "荣县"}, {lable: "富顺县"}],
                      value: 1
                    },
                    {
                      lable: "攀枝花",
                      children: [{lable: "仁和区"}, {lable: "米易县"}, {lable: "盐边县"}, {lable: "东区"}, {lable: "西区"}],
                      value:1
                    },
                    {
                      lable: "泸州",
                      children: [{lable: "江阳区"}, {lable: "纳溪区"}, {lable: "龙马潭区"}, {lable: "泸县"}, {lable: "合江县"}, {lable: "叙永县"}, {lable: "古蔺县"}],
                      value: 1
                    },
                    {
                      lable: "德阳",
                      children: [{lable: "请选择"}, {lable: "旌阳区"}, {lable: "广汉市"}, {lable: "什邡市"}, {lable: "绵竹市"}, {lable: "罗江县"}, {lable: "中江县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "绵阳",
                      children: [{lable: "涪城区"}, {lable: "游仙区"}, {lable: "江油市"}, {lable: "盐亭县"}, {lable: "三台县"}, {lable: "平武县"}, {lable: "安县"}, {lable: "梓潼县"}, {lable: "北川羌族自治县"}],
                      value: 1
                    },
                    {
                      lable: "广元",
                      children: [{lable: "元坝区"}, {lable: "朝天区"}, {lable: "青川县"}, {lable: "旺苍县"}, {lable: "剑阁县"}, {lable: "苍溪县"}, {lable: "市中区"}],
                      value: 1
                    },
                    {
                      lable: "遂宁",
                      children: [{lable: "船山区"}, {lable: "安居区"}, {lable: "射洪县"}, {lable: "蓬溪县"}, {lable: "大英县"}],
                      value: 1
                    },
                    {
                      lable: "内江",
                      children: [ {lable: "市中区"}, {lable: "东兴区"}, {lable: "资中县"}, {lable: "隆昌县"}, {lable: "威远县"}],
                      value: 1
                    },
                    {
                      lable: "乐山",
                      children: [{lable: "市中区"}, {lable: "五通桥区"}, {lable: "沙湾区"}, {lable: "金口河区"}, {lable: "峨眉山市"}, {lable: "夹江县"}, {lable: "井研县"}, {lable: "犍为县"}, {lable: "沐川县"}, {lable: "马边彝族自治县"}, {lable: "峨边彝族自治县"}],
                      value: 1
                    },
                    {
                      lable: "南充",
                      children: [{lable: "顺庆区"}, {lable: "高坪区"}, {lable: "嘉陵区"}, {lable: "阆中市"}, {lable: "营山县"}, {lable: "蓬安县"}, {lable: "仪陇县"}, {lable: "南部县"}, {lable: "西充县"}],
                      value: 1
                    },
                    {
                      lable: "眉山",
                      children: [{lable: "东坡区"}, {lable: "仁寿县"}, {lable: "彭山县"}, {lable: "洪雅县"}, {lable: "丹棱县"}, {lable: "青神县"}],
                      value: 1
                    },
                    {
                      lable: "宜宾",
                      children: [{lable: "翠屏区"}, {lable: "宜宾县"}, {lable: "兴文县"}, {lable: "南溪县"}, {lable: "珙县"}, {lable: "长宁县"}, {lable: "高县"}, {lable: "江安县"}, {lable: "筠连县"}, {lable: "屏山县"}],
                      value: 1
                    },
                    {
                      lable: "广安",
                      children: [{lable: "广安区"}, {lable: "华蓥市"}, {lable: "岳池县"}, {lable: "邻水县"}, {lable: "武胜县"}],
                      value: 1
                    },
                    {
                      lable: "达州",
                      children: [{lable: "通川区"}, {lable: "万源市"}, {lable: "达县"}, {lable: "渠县"}, {lable: "宣汉县"}, {lable: "开江县"}, {lable: "大竹县"}],
                      value: 1
                    },
                    {
                      lable: "雅安",
                      children: [{lable: "雨城区"}, {lable: "芦山县"}, {lable: "石棉县"}, {lable: "名山县"}, {lable: "天全县"}, {lable: "荥经县"}, {lable: "宝兴县"}, {lable: "汉源县"}],
                      value: 1
                    },
                    {
                      lable: "巴中",
                      children: [{lable: "巴州区"}, {lable: "南江县"}, {lable: "平昌县"}, {lable: "通江县"}],
                      value: 1
                    },
                    {
                      lable: "资阳",
                      children: [{lable: "雁江区"}, {lable: "简阳市"}, {lable: "安岳县"}, {lable: "乐至县"}],
                      value: 1
                    },
                    {
                      lable: "阿坝藏族羌族自治州",
                      children: [{lable: "马尔康县"}, {lable: "九寨沟县"}, {lable: "红原县"}, {lable: "汶川县"}, {lable: "阿坝县"}, {lable: "理县"}, {lable: "若尔盖县"}, {lable: "小金县"}, {lable: "黑水县"}, {lable: "金川县"}, {lable: "松潘县"}, {lable: "壤塘县"}, {lable: "茂县"}],
                      value: 1
                    },
                    {
                      lable: "甘孜藏族自治州",
                      children: [{lable: "康定县"}, {lable: "丹巴县"}, {lable: "炉霍县"}, {lable: "九龙县"}, {lable: "甘孜县"}, {lable: "雅江县"}, {lable: "新龙县"}, {lable: "道孚县"}, {lable: "白玉县"}, {lable: "理塘县"}, {lable: "德格县"}, {lable: "乡城县"}, {lable: "石渠县"}, {lable: "稻城县"}, {lable: "色达县"}, {lable: "巴塘县"}, {lable: "泸定县"}, {lable: "得荣县"}],
                      value: 1
                    },
                    {
                      lable: "凉山彝族自治州",
                      children: [{lable: "西昌市"}, {lable: "美姑县"}, {lable: "昭觉县"}, {lable: "金阳县"}, {lable: "甘洛县"}, {lable: "布拖县"}, {lable: "雷波县"}, {lable: "普格县"}, {lable: "宁南县"}, {lable: "喜德县"}, {lable: "会东县"}, {lable: "越西县"}, {lable: "会理县"}, {lable: "盐源县"}, {lable: "德昌县"}, {lable: "冕宁县"}, {lable: "木里藏族自治县"}],
                      value: 1
                    }
                  ],
                },
                {
                  lable: "陕西",
                  value:0,
                  children: [
                    {
                      lable: "西安",
                      children: [{lable: "莲湖区"}, {lable: "新城区"}, {lable: "碑林区"}, {lable: "雁塔区"}, {lable: "灞桥区"}, {lable: "未央区"}, {lable: "阎良区"}, {lable: "临潼区"}, {lable: "长安区"}, {lable: "高陵县"}, {lable: "蓝田县"}, {lable: "户县"}, {lable: "周至县"}],
                      value:1
                    },
                    {
                      lable: "铜川",
                      children: [{lable: "耀州区"}, {lable: "王益区"}, {lable: "印台区"}, {lable: "宜君县"}, {lable: "其他"}],
                      value: 1
                    },
                    {
                      lable: "宝鸡",
                      children: [{lable: "渭滨区"}, {lable: "金台区"}, {lable: "陈仓区"}, {lable: "岐山县"}, {lable: "凤翔县"}, {lable: "陇县"}, {lable: "太白县"}, {lable: "麟游县"}, {lable: "扶风县"}, {lable: "千阳县"}, {lable: "眉县"}, {lable: "凤县"}],
                      value: 1
                    },
                    {
                      lable: "咸阳",
                      children: [{lable: "秦都区"}, {lable: "渭城区"}, {lable: "杨陵区"}, {lable: "兴平市"}, {lable: "礼泉县"}, {lable: "泾阳县"}, {lable: "永寿县"}, {lable: "三原县"}, {lable: "彬县"}, {lable: "旬邑县"}, {lable: "长武县"}, {lable: "乾县"}, {lable: "武功县"}, {lable: "淳化县"}],
                      value: 1
                    },
                    {
                      lable: "渭南",
                      children: [{lable: "临渭区"}, {lable: "韩城市"}, {lable: "华阴市"}, {lable: "蒲城县"}, {lable: "潼关县"}, {lable: "白水县"}, {lable: "澄城县"}, {lable: "华县"}, {lable: "合阳县"}, {lable: "富平县"}, {lable: "大荔县"}],
                      value: 1
                    },
                    {
                      lable: "延安",
                      children: [ {lable: "宝塔区"}, {lable: "安塞县"}, {lable: "洛川县"}, {lable: "子长县"}, {lable: "黄陵县"}, {lable: "延川县"}, {lable: "富县"}, {lable: "延长县"}, {lable: "甘泉县"}, {lable: "宜川县"}, {lable: "志丹县"}, {lable: "黄龙县"}, {lable: "吴起县"}],
                      value: 0
                    },
                    {
                      lable: "汉中",
                      children: [{lable: "汉台区"}, {lable: "留坝县"}, {lable: "镇巴县"}, {lable: "城固县"}, {lable: "南郑县"}, {lable: "洋县"}, {lable: "宁强县"}, {lable: "佛坪县"}, {lable: "勉县"}, {lable: "西乡县"}, {lable: "略阳县"}],
                      value: 1
                    },
                    {
                      lable: "榆林",
                      children: [{lable: "榆阳区"}, {lable: "清涧县"}, {lable: "绥德县"}, {lable: "神木县"}, {lable: "佳县"}, {lable: "府谷县"}, {lable: "子洲县"}, {lable: "靖边县"}, {lable: "横山县"}, {lable: "米脂县"}, {lable: "吴堡县"}, {lable: "定边县"}],
                      value: 0
                    },
                    {
                      lable: "安康",
                      children: [{lable: "汉滨区"}, {lable: "紫阳县"}, {lable: "岚皋县"}, {lable: "旬阳县"}, {lable: "镇坪县"}, {lable: "平利县"}, {lable: "石泉县"}, {lable: "宁陕县"}, {lable: "白河县"}, {lable: "汉阴县"}],
                      value: 1
                    },
                    {
                      lable: "商洛",
                      children: [{lable: "商州区"}, {lable: "镇安县"}, {lable: "山阳县"}, {lable: "洛南县"}, {lable: "商南县"}, {lable: "丹凤县"}, {lable: "柞水县"}],
                      value:1
                    }
                  ],
                },
                {
                  lable: "河北",
                  value:0,
                  children: [
                    {
                      lable: "石家庄",
                      children: [{lable: "长安区"}, {lable: "桥东区"}, {lable: "桥西区"}, {lable: "新华区"}, {lable: "裕华区"}, {lable: "井陉矿区"}, {lable: "鹿泉市"}, {lable: "辛集市"}, {lable: "藁城市"}, {lable: "晋州市"}, {lable: "新乐市"}, {lable: "深泽县"}, {lable: "无极县"}, {lable: "赵县"}, {lable: "灵寿县"}, {lable: "高邑县"}, {lable: "元氏县"}, {lable: "赞皇县"}, {lable: "平山县"}, {lable: "井陉县"}, {lable: "栾城县"}, {lable: "正定县"}, {lable: "行唐县"}],
                      value: 1
                    },
                    {
                      lable: "唐山",
                      children: [{lable: "路北区"}, {lable: "路南区"}, {lable: "古冶区"}, {lable: "开平区"}, {lable: "丰南区"}, {lable: "丰润区"}, {lable: "遵化市"}, {lable: "迁安市"}, {lable: "迁西县"}, {lable: "滦南县"}, {lable: "玉田县"}, {lable: "唐海县"}, {lable: "乐亭县"}, {lable: "滦县"}],
                      value: 1
                    },
                    {
                      lable: "秦皇岛",
                      children: [{lable: "海港区"}, {lable: "山海关区"}, {lable: "北戴河区"}, {lable: "昌黎县"}, {lable: "抚宁县"}, {lable: "卢龙县"}, {lable: "青龙满族自治县"}],
                      value: 1
                    },
                    {
                      lable: "邯郸",
                      children: [{lable: "邯山区"}, {lable: "丛台区"}, {lable: "复兴区"}, {lable: "峰峰矿区"}, {lable: "武安市"}, {lable: "邱县"}, {lable: "大名县"}, {lable: "魏县"}, {lable: "曲周县"}, {lable: "鸡泽县"}, {lable: "肥乡县"}, {lable: "广平县"}, {lable: "成安县"}, {lable: "临漳县"}, {lable: "磁县"}, {lable: "涉县"}, {lable: "永年县"}, {lable: "馆陶县"}, {lable: "邯郸县"}],
                      value: 1
                    },
                    {
                      lable: "邢台",
                      children: [{lable: "桥东区"}, {lable: "桥西区"}, {lable: "南宫市"}, {lable: "沙河市"}, {lable: "临城县"}, {lable: "内丘县"}, {lable: "柏乡县"}, {lable: "隆尧县"}, {lable: "任县"}, {lable: "南和县"}, {lable: "宁晋县"}, {lable: "巨鹿县"}, {lable: "新河县"}, {lable: "广宗县"}, {lable: "平乡县"}, {lable: "威县"}, {lable: "清河县"}, {lable: "临西县"}, {lable: "邢台县"}],
                      value:1
                    },
                    {
                      lable: "保定",
                      children: [{lable: "新市区"}, {lable: "北市区"}, {lable: "南市区"}, {lable: "定州市"}, {lable: "涿州市"}, {lable: "安国市"}, {lable: "高碑店市"}, {lable: "易县"}, {lable: "徐水县"}, {lable: "涞源县"}, {lable: "顺平县"}, {lable: "唐县"}, {lable: "望都县"}, {lable: "涞水县"}, {lable: "高阳县"}, {lable: "安新县"}, {lable: "雄县"}, {lable: "容城县"}, {lable: "蠡县"}, {lable: "曲阳县"}, {lable: "阜平县"}, {lable: "博野县"}, {lable: "满城县"}, {lable: "清苑县"}, {lable: "定兴县"}],
                      value: 1
                    },
                    {
                      lable: "张家口",
                      children: [ {lable: "桥东区"}, {lable: "桥西区"}, {lable: "宣化区"}, {lable: "下花园区"}, {lable: "张北县"}, {lable: "康保县"}, {lable: "沽源县"}, {lable: "尚义县"}, {lable: "蔚县"}, {lable: "阳原县"}, {lable: "怀安县"}, {lable: "万全县"}, {lable: "怀来县"}, {lable: "赤城县"}, {lable: "崇礼县"}, {lable: "宣化县"}, {lable: "涿鹿县"}],
                      value: 1
                    },
                    {
                      lable: "承德",
                      children: [ {lable: "双桥区"}, {lable: "双滦区"}, {lable: "鹰手营子矿区"}, {lable: "兴隆县"}, {lable: "平泉县"}, {lable: "滦平县"}, {lable: "隆化县"}, {lable: "承德县"}, {lable: "丰宁满族自治县"}, {lable: "宽城满族自治县"}, {lable: "围场满族蒙古族自治县"}],
                      value: 1
                    },
                    {
                      lable: "沧州",
                      children: [{lable: "新华区"}, {lable: "运河区"}, {lable: "泊头市"}, {lable: "任丘市"}, {lable: "黄骅市"}, {lable: "河间市"}, {lable: "献县"}, {lable: "吴桥县"}, {lable: "沧县"}, {lable: "东光县"}, {lable: "肃宁县"}, {lable: "南皮县"}, {lable: "盐山县"}, {lable: "青县"}, {lable: "海兴县"}, {lable: "孟村回族自治县"}],
                      value: 1
                    },
                    {
                      lable: "廊坊",
                      children: [{lable: "安次区"}, {lable: "广阳区"}, {lable: "霸州市"}, {lable: "三河市"}, {lable: "香河县"}, {lable: "永清县"}, {lable: "固安县"}, {lable: "文安县"}, {lable: "大城县"}, {lable: "大厂回族自治县"}],
                      value: 1
                    },
                    {
                      lable: "衡水",
                      children: [{lable: "桃城区"}, {lable: "冀州市"}, {lable: "深州市"}, {lable: "枣强县"}, {lable: "武邑县"}, {lable: "武强县"}, {lable: "饶阳县"}, {lable: "安平县"}, {lable: "故城县"}, {lable: "景县"}, {lable: "阜城县"}],
                      value: 0
                    }
                  ],
                },
                {
                  lable: "山西",
                  value:0,
                  children: [
                    {
                      lable: "太原",
                      children: [{lable: "杏花岭区"}, {lable: "小店区"}, {lable: "迎泽区"}, {lable: "尖草坪区"}, {lable: "万柏林区"}, {lable: "晋源区"}, {lable: "古交市"}, {lable: "阳曲县"}, {lable: "清徐县"}, {lable: "娄烦县"}],
                      value: 1
                    },
                    {
                      lable: "大同",
                      children: [{lable: "城区"}, {lable: "矿区"}, {lable: "南郊区"}, {lable: "新荣区"}, {lable: "大同县"}, {lable: "天镇县"}, {lable: "灵丘县"}, {lable: "阳高县"}, {lable: "左云县"}, {lable: "广灵县"}, {lable: "浑源县"}],
                      value: 1
                    },
                    {
                      lable: "阳泉",
                      children: [{lable: "城区"}, {lable: "矿区"}, {lable: "郊区"}, {lable: "平定县"}, {lable: "盂县"}],
                      value: 1
                    },
                    {
                      lable: "长治",
                      children: [{lable: "城区"}, {lable: "郊区"}, {lable: "潞城市"}, {lable: "长治县"}, {lable: "长子县"}, {lable: "平顺县"}, {lable: "襄垣县"}, {lable: "沁源县"}, {lable: "屯留县"}, {lable: "黎城县"}, {lable: "武乡县"}, {lable: "沁县"}, {lable: "壶关县"}],
                      value: 1
                    },
                    {
                      lable: "晋城",
                      children: [{lable: "城区"}, {lable: "高平市"}, {lable: "泽州县"}, {lable: "陵川县"}, {lable: "阳城县"}, {lable: "沁水县"}],
                      value: 1
                    },
                    {
                      lable: "朔州",
                      children: [ {lable: "朔城区"}, {lable: "平鲁区"}, {lable: "山阴县"}, {lable: "右玉县"}, {lable: "应县"}, {lable: "怀仁县"}],
                      value: 1
                    },
                    {
                      lable: "晋中",
                      children: [{lable: "榆次区"}, {lable: "介休市"}, {lable: "昔阳县"}, {lable: "灵石县"}, {lable: "祁县"}, {lable: "左权县"}, {lable: "寿阳县"}, {lable: "太谷县"}, {lable: "和顺县"}, {lable: "平遥县"}, {lable: "榆社县"}],
                      value: 1
                    },
                    {
                      lable: "运城",
                      children: [{lable: "盐湖区"}, {lable: "河津市"}, {lable: "永济市"}, {lable: "闻喜县"}, {lable: "新绛县"}, {lable: "平陆县"}, {lable: "垣曲县"}, {lable: "绛县"}, {lable: "稷山县"}, {lable: "芮城县"}, {lable: "夏县"}, {lable: "万荣县"}, {lable: "临猗县"}],
                      value: 1
                    },
                    {
                      lable: "忻州",
                      children: [{lable: "忻府区"}, {lable: "原平市"}, {lable: "代县"}, {lable: "神池县"}, {lable: "五寨县"}, {lable: "五台县"}, {lable: "偏关县"}, {lable: "宁武县"}, {lable: "静乐县"}, {lable: "繁峙县"}, {lable: "河曲县"}, {lable: "保德县"}, {lable: "定襄县"}, {lable: "岢岚县"}],
                      value: 1
                    },
                    {
                      lable: "临汾",
                      children: [{lable: "尧都区"}, {lable: "侯马市"}, {lable: "霍州市"}, {lable: "汾西县"}, {lable: "吉县"}, {lable: "安泽县"}, {lable: "大宁县"}, {lable: "浮山县"}, {lable: "古县"}, {lable: "隰县"}, {lable: "襄汾县"}, {lable: "翼城县"}, {lable: "永和县"}, {lable: "乡宁县"}, {lable: "曲沃县"}, {lable: "洪洞县"}, {lable: "蒲县"}],
                      value:1
                    },
                    {
                      lable: "吕梁",
                      children: [{lable: "离石区"}, {lable: "孝义市"}, {lable: "汾阳市"}, {lable: "文水县"}, {lable: "中阳县"}, {lable: "兴县"}, {lable: "临县"}, {lable: "方山县"}, {lable: "柳林县"}, {lable: "岚县"}, {lable: "交口县"}, {lable: "交城县"}, {lable: "石楼县"}],
                      value: 1
                    },
                  ],
                },
                {
                  lable: "河南",
                  value:0,
                  children: [
                    {
                      lable: "郑州",
                      children: [{lable: "中原区"}, {lable: "金水区"}, {lable: "二七区"}, {lable: "管城回族区"}, {lable: "上街区"}, {lable: "惠济区"}, {lable: "巩义市"}, {lable: "新郑市"}, {lable: "新密市"}, {lable: "登封市"}, {lable: "荥阳市"}, {lable: "中牟县"}],
                      value: 1
                    },
                    {
                      lable: "开封",
                      children: [{lable: "鼓楼区"}, {lable: "龙亭区"}, {lable: "顺河回族区"}, {lable: "禹王台区"}, {lable: "金明区"}, {lable: "开封县"}, {lable: "尉氏县"}, {lable: "兰考县"}, {lable: "杞县"}, {lable: "通许县"}],
                      value: 1
                    },
                    {
                      lable: "洛阳",
                      children: [{lable: "西工区"}, {lable: "老城区"}, {lable: "涧西区"}, {lable: "瀍河回族区"}, {lable: "洛龙区"}, {lable: "吉利区"}, {lable: "偃师市"}, {lable: "孟津县"}, {lable: "汝阳县"}, {lable: "伊川县"}, {lable: "洛宁县"}, {lable: "嵩县"}, {lable: "宜阳县"}, {lable: "新安县"}, {lable: "栾川县"}],
                      value: 1
                    },
                    {
                      lable: "平顶山",
                      children: [{lable: "新华区"}, {lable: "卫东区"}, {lable: "湛河区"}, {lable: "石龙区"}, {lable: "汝州市"}, {lable: "舞钢市"}, {lable: "宝丰县"}, {lable: "叶县"}, {lable: "郏县"}, {lable: "鲁山县"}],
                      value: 0
                    },
                    {
                      lable: "安阳",
                      children: [{lable: "北关区"}, {lable: "文峰区"}, {lable: "殷都区"}, {lable: "龙安区"}, {lable: "林州市"}, {lable: "安阳县"}, {lable: "滑县"}, {lable: "内黄县"}, {lable: "汤阴县"}],
                      value: 1
                    },
                    {
                      lable: "鹤壁",
                      children: [{lable: "淇滨区"}, {lable: "山城区"}, {lable: "鹤山区"}, {lable: "浚县"}, {lable: "淇县"}],
                      value: 1
                    },
                    {
                      lable: "新乡",
                      children: [{lable: "卫滨区"}, {lable: "红旗区"}, {lable: "凤泉区"}, {lable: "牧野区"}, {lable: "卫辉市"}, {lable: "辉县市"}, {lable: "新乡县"}, {lable: "获嘉县"}, {lable: "原阳县"}, {lable: "长垣县"}, {lable: "封丘县"}, {lable: "延津县"}],
                      value: 1
                    },
                    {
                      lable: "焦作",
                      children: [{lable: "解放区"}, {lable: "中站区"}, {lable: "马村区"}, {lable: "山阳区"}, {lable: "沁阳市"}, {lable: "孟州市"}, {lable: "修武县"}, {lable: "温县"}, {lable: "武陟县"}, {lable: "博爱县"}],
                      value: 1
                    },
                    {
                      lable: "濮阳",
                      children: [{lable: "华龙区"}, {lable: "濮阳县"}, {lable: "南乐县"}, {lable: "台前县"}, {lable: "清丰县"}, {lable: "范县"}],
                      value: 1
                    },
                    {
                      lable: "许昌",
                      children: [{lable: "魏都区"}, {lable: "禹州市"}, {lable: "长葛市"}, {lable: "许昌县"}, {lable: "鄢陵县"}, {lable: "襄城县"}],
                      value: 1
                    },
                    {
                      lable: "漯河",
                      children: [{lable: "源汇区"}, {lable: "郾城区"}, {lable: "召陵区"}, {lable: "临颍县"}, {lable: "舞阳县"}],
                      value: 1
                    },
                    {
                      lable: "三门峡",
                      children: [{lable: "湖滨区"}, {lable: "义马市"}, {lable: "灵宝市"}, {lable: "渑池县"}, {lable: "卢氏县"}, {lable: "陕县"}],
                      value: 1
                    },
                    {
                      lable: "南阳",
                      children: [{lable: "卧龙区"}, {lable: "宛城区"}, {lable: "邓州市"}, {lable: "桐柏县"}, {lable: "方城县"}, {lable: "淅川县"}, {lable: "镇平县"}, {lable: "唐河县"}, {lable: "南召县"}, {lable: "内乡县"}, {lable: "新野县"}, {lable: "社旗县"}, {lable: "西峡县"}],
                      value: 1
                    },
                    {
                      lable: "商丘",
                      children: [{lable: "梁园区"}, {lable: "睢阳区"}, {lable: "永城市"}, {lable: "宁陵县"}, {lable: "虞城县"}, {lable: "民权县"}, {lable: "夏邑县"}, {lable: "柘城县"}, {lable: "睢县"}],
                      value: 1
                    },
                    {
                      lable: "信阳",
                      children: [{lable: "浉河区"}, {lable: "平桥区"}, {lable: "潢川县"}, {lable: "淮滨县"}, {lable: "息县"}, {lable: "新县"}, {lable: "商城县"}, {lable: "固始县"}, {lable: "罗山县"}, {lable: "光山县"}],
                      value: 1
                    },
                    {
                      lable: "周口",
                      children: [{lable: "川汇区"}, {lable: "项城市"}, {lable: "商水县"}, {lable: "淮阳县"}, {lable: "太康县"}, {lable: "鹿邑县"}, {lable: "西华县"}, {lable: "扶沟县"}, {lable: "沈丘县"}, {lable: "郸城县"}],
                      value: 1
                    },
                    {
                      lable: "驻马店",
                      children: [{lable: "驿城区"}, {lable: "确山县"}, {lable: "新蔡县"}, {lable: "上蔡县"}, {lable: "西平县"}, {lable: "泌阳县"}, {lable: "平舆县"}, {lable: "汝南县"}, {lable: "遂平县"}, {lable: "正阳县"}],
                      value: 1
                    },
                    {
                      lable: "焦作",
                      children: [{lable: "济源市"}],
                      value: 1
                    },
                  ],
                },
                {
                  lable: "吉林",
                  value:0,
                  children: [
                    {
                      lable: "长春",
                      children: [{lable: "朝阳区"}, {lable: "宽城区"}, {lable: "二道区"}, {lable: "南关区"}, {lable: "绿园区"}, {lable: "双阳区"}, {lable: "九台市"}, {lable: "榆树市"}, {lable: "德惠市"}, {lable: "农安县"}],
                      value: 1
                    },
                    {
                      lable: "吉林",
                      children: [ {lable: "船营区"}, {lable: "昌邑区"}, {lable: "龙潭区"}, {lable: "丰满区"}, {lable: "舒兰市"}, {lable: "桦甸市"}, {lable: "蛟河市"}, {lable: "磐石市"}, {lable: "永吉县"}],
                      value: 1
                    },
                    {
                      lable: "四平",
                      children: [{lable: "铁西区"}, {lable: "铁东区"}, {lable: "公主岭市"}, {lable: "双辽市"}, {lable: "梨树县"}, {lable: "伊通满族自治县"}],
                      value: 1
                    },
                    {
                      lable: "辽源",
                      children: [{lable: "龙山区"}, {lable: "西安区"}, {lable: "东辽县"}, {lable: "东丰县"}],
                      value: 1
                    },
                    {
                      lable: "通化",
                      children: [{lable: "东昌区"}, {lable: "二道江区"}, {lable: "梅河口市"}, {lable: "集安市"}, {lable: "通化县"}, {lable: "辉南县"}, {lable: "柳河县"}],
                      value: 1
                    },
                    {
                      lable: "白山",
                      children: [{lable: "八道江区"}, {lable: "江源区"}, {lable: "临江市"}, {lable: "靖宇县"}, {lable: "抚松县"}, {lable: "长白朝鲜族自治县"}],
                      value:1
                    },
                    {
                      lable: "松原",
                      children: [{lable: "宁江区"}, {lable: "乾安县"}, {lable: "长岭县"}, {lable: "扶余县"}, {lable: "前郭尔罗斯蒙古族自治县"}],
                      value: 1
                    },
                    {
                      lable: "白城",
                      children: [{lable: "洮北区"}, {lable: "大安市"}, {lable: "洮南市"}, {lable: "镇赉县"}, {lable: "通榆县"}],
                      value: 1
                    },
                    {
                      lable: "延边朝鲜族自治州",
                      children: [{lable: "延吉市"}, {lable: "图们市"}, {lable: "敦化市"}, {lable: "龙井市"}, {lable: "珲春市"}, {lable: "和龙市"}, {lable: "安图县"}, {lable: "汪清县"}],
                      value: 1
                    },
                  ],
                },
                {
                  lable: "黑龙江",
                  value:0,
                  children: [
                    {
                      lable: "哈尔滨",
                      children: [{lable: "松北区"}, {lable: "道里区"}, {lable: "南岗区"}, {lable: "平房区"}, {lable: "香坊区"}, {lable: "道外区"}, {lable: "呼兰区"}, {lable: "阿城区"}, {lable: "双城市"}, {lable: "尚志市"}, {lable: "五常市"}, {lable: "宾县"}, {lable: "方正县"}, {lable: "通河县"}, {lable: "巴彦县"}, {lable: "延寿县"}, {lable: "木兰县"}, {lable: "依兰县"}],
                      value: 1
                    },
                    {
                      lable: "齐齐哈尔",
                      children: [ {lable: "龙沙区"}, {lable: "昂昂溪区"}, {lable: "铁锋区"}, {lable: "建华区"}, {lable: "富拉尔基区"}, {lable: "碾子山区"}, {lable: "梅里斯达斡尔族区"}, {lable: "讷河市"}, {lable: "富裕县"}, {lable: "拜泉县"}, {lable: "甘南县"}, {lable: "依安县"}, {lable: "克山县"}, {lable: "泰来县"}, {lable: "克东县"}, {lable: "龙江县"}],
                      value: 1
                    },
                    {
                      lable: "鹤岗",
                      children: [{lable: "兴山区"}, {lable: "工农区"}, {lable: "南山区"}, {lable: "兴安区"}, {lable: "向阳区"}, {lable: "东山区"}, {lable: "萝北县"}, {lable: "绥滨县"}],
                      value: 1
                    },
                    {
                      lable: "双鸭山",
                      children: [ {lable: "尖山区"}, {lable: "岭东区"}, {lable: "四方台区"}, {lable: "宝山区"}, {lable: "集贤县"}, {lable: "宝清县"}, {lable: "友谊县"}, {lable: "饶河县"}],
                      value: 1
                    },
                    {
                      lable: "鸡西",
                      children: [ {lable: "鸡冠区"}, {lable: "恒山区"}, {lable: "城子河区"}, {lable: "滴道区"}, {lable: "梨树区"}, {lable: "麻山区"}, {lable: "密山市"}, {lable: "虎林市"}, {lable: "鸡东县"}],
                      value: 1
                    },
                    {
                      lable: "大庆",
                      children: [{lable: "萨尔图区"}, {lable: "红岗区"}, {lable: "龙凤区"}, {lable: "让胡路区"}, {lable: "大同区"}, {lable: "林甸县"}, {lable: "肇州县"}, {lable: "肇源县"}, {lable: "杜尔伯特蒙古族自治县"}],
                      value: 1
                    },
                    {
                      lable: "伊春",
                      children: [{lable: "伊春区"}, {lable: "带岭区"}, {lable: "南岔区"}, {lable: "金山屯区"}, {lable: "西林区"}, {lable: "美溪区"}, {lable: "乌马河区"}, {lable: "翠峦区"}, {lable: "友好区"}, {lable: "上甘岭区"}, {lable: "五营区"}, {lable: "红星区"}, {lable: "新青区"}, {lable: "汤旺河区"}, {lable: "乌伊岭区"}, {lable: "铁力市"}, {lable: "嘉荫县"}],
                      value: 1
                    },
                    {
                      lable: "牡丹江",
                      children: [{lable: "爱民区"}, {lable: "东安区"}, {lable: "阳明区"}, {lable: "西安区"}, {lable: "绥芬河市"}, {lable: "宁安市"}, {lable: "海林市"}, {lable: "穆棱市"}, {lable: "林口县"}, {lable: "东宁县"}],
                      value: 1
                    },
                    {
                      lable: "佳木斯",
                      children: [{lable: "向阳区"}, {lable: "前进区"}, {lable: "东风区"}, {lable: "郊区"}, {lable: "同江市"}, {lable: "富锦市"}, {lable: "桦川县"}, {lable: "抚远县"}, {lable: "桦南县"}, {lable: "汤原县"}],
                      value: 1
                    },
                    {
                      lable: "七台河",
                      children: [{lable: "桃山区"}, {lable: "新兴区"}, {lable: "茄子河区"}, {lable: "勃利县"}],
                      value: 1
                    },
                    {
                      lable: "黑河",
                      children: [{lable: "爱辉区"}, {lable: "北安市"}, {lable: "五大连池市"}, {lable: "逊克县"}, {lable: "嫩江县"}, {lable: "孙吴县"}],
                      value: 1
                    },
                    {
                      lable: "绥化",
                      children: [{lable: "北林区"}, {lable: "安达市"}, {lable: "肇东市"}, {lable: "海伦市"}, {lable: "绥棱县"}, {lable: "兰西县"}, {lable: "明水县"}, {lable: "青冈县"}, {lable: "庆安县"}, {lable: "望奎县"}],
                      value: 1
                    },
                    {
                      lable: "大兴安岭地区",
                      children: [{lable: "请选择"}, {lable: "呼玛县"}, {lable: "塔河县"}, {lable: "漠河县"}, {lable: "大兴安岭辖区"}],
                      value: 1
                    }],
                },
                {
                  lable: "内蒙古",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "呼和浩特",
                      children: [{lable: "请选择"}, {lable: "回民区"}, {lable: "玉泉区"}, {lable: "新城区"}, {lable: "赛罕区"}, {lable: "托克托县"}, {lable: "清水河县"}, {lable: "武川县"}, {lable: "和林格尔县"}, {lable: "土默特左旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "包头",
                      children: [{lable: "请选择"}, {lable: "昆都仑区"}, {lable: "青山区"}, {lable: "东河区"}, {lable: "九原区"}, {lable: "石拐区"}, {lable: "白云矿区"}, {lable: "固阳县"}, {lable: "土默特右旗"}, {lable: "达尔罕茂明安联合旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "乌海",
                      children: [{lable: "请选择"}, {lable: "海勃湾区"}, {lable: "乌达区"}, {lable: "海南区"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "赤峰",
                      children: [{lable: "请选择"}, {lable: "红山区"}, {lable: "元宝山区"}, {lable: "松山区"}, {lable: "宁城县"}, {lable: "林西县"}, {lable: "喀喇沁旗"}, {lable: "巴林左旗"}, {lable: "敖汉旗"}, {lable: "阿鲁科尔沁旗"}, {lable: "翁牛特旗"}, {lable: "克什克腾旗"}, {lable: "巴林右旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "通辽",
                      children: [{lable: "请选择"}, {lable: "科尔沁区"}, {lable: "霍林郭勒市"}, {lable: "开鲁县"}, {lable: "科尔沁左翼中旗"}, {lable: "科尔沁左翼后旗"}, {lable: "库伦旗"}, {lable: "奈曼旗"}, {lable: "扎鲁特旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "鄂尔多斯",
                      children: [{lable: "请选择"}, {lable: "东胜区"}, {lable: "准格尔旗"}, {lable: "乌审旗"}, {lable: "伊金霍洛旗"}, {lable: "鄂托克旗"}, {lable: "鄂托克前旗"}, {lable: "杭锦旗"}, {lable: "达拉特旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "呼伦贝尔",
                      children: [{lable: "请选择"}, {lable: "海拉尔区"}, {lable: "满洲里市"}, {lable: "牙克石市"}, {lable: "扎兰屯市"}, {lable: "根河市"}, {lable: "额尔古纳市"}, {lable: "陈巴尔虎旗"}, {lable: "阿荣旗"}, {lable: "新巴尔虎左旗"}, {lable: "新巴尔虎右旗"}, {lable: "鄂伦春自治旗"}, {lable: "莫力达瓦达斡尔族自治旗"}, {lable: "鄂温克族自治旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "巴彦淖尔",
                      children: [{lable: "请选择"}, {lable: "临河区"}, {lable: "五原县"}, {lable: "磴口县"}, {lable: "杭锦后旗"}, {lable: "乌拉特中旗"}, {lable: "乌拉特前旗"}, {lable: "乌拉特后旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "乌兰察布",
                      children: [{lable: "请选择"}, {lable: "集宁区"}, {lable: "丰镇市"}, {lable: "兴和县"}, {lable: "卓资县"}, {lable: "商都县"}, {lable: "凉城县"}, {lable: "化德县"}, {lable: "四子王旗"}, {lable: "察哈尔右翼前旗"}, {lable: "察哈尔右翼中旗"}, {lable: "察哈尔右翼后旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "锡林郭勒盟",
                      children: [{lable: "请选择"}, {lable: "锡林浩特市"}, {lable: "二连浩特市"}, {lable: "多伦县"}, {lable: "阿巴嘎旗"}, {lable: "西乌珠穆沁旗"}, {lable: "东乌珠穆沁旗"}, {lable: "苏尼特左旗"}, {lable: "苏尼特右旗"}, {lable: "太仆寺旗"}, {lable: "正镶白旗"}, {lable: "正蓝旗"}, {lable: "镶黄旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "兴安盟",
                      children: [{lable: "请选择"}, {lable: "乌兰浩特市"}, {lable: "阿尔山市"}, {lable: "突泉县"}, {lable: "扎赉特旗"}, {lable: "科尔沁右翼前旗"}, {lable: "科尔沁右翼中旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "阿拉善盟",
                      children: [{lable: "请选择"}, {lable: "阿拉善左旗"}, {lable: "阿拉善右旗"}, {lable: "额济纳旗"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "山东",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "济南",
                      children: [{lable: "请选择"}, {lable: "市中区"}, {lable: "历下区"}, {lable: "天桥区"}, {lable: "槐荫区"}, {lable: "历城区"}, {lable: "长清区"}, {lable: "章丘市"}, {lable: "平阴县"}, {lable: "济阳县"}, {lable: "商河县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "青岛",
                      children: [{lable: "请选择"}, {lable: "市南区"}, {lable: "市北区"}, {lable: "城阳区"}, {lable: "四方区"}, {lable: "李沧区"}, {lable: "黄岛区"}, {lable: "崂山区"}, {lable: "胶南市"}, {lable: "胶州市"}, {lable: "平度市"}, {lable: "莱西市"}, {lable: "即墨市"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "淄博",
                      children: [{lable: "请选择"}, {lable: "张店区"}, {lable: "临淄区"}, {lable: "淄川区"}, {lable: "博山区"}, {lable: "周村区"}, {lable: "桓台县"}, {lable: "高青县"}, {lable: "沂源县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "枣庄",
                      children: [{lable: "请选择"}, {lable: "市中区"}, {lable: "山亭区"}, {lable: "峄城区"}, {lable: "台儿庄区"}, {lable: "薛城区"}, {lable: "滕州市"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "东营",
                      children: [{lable: "请选择"}, {lable: "东营区"}, {lable: "河口区"}, {lable: "垦利县"}, {lable: "广饶县"}, {lable: "利津县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "烟台",
                      children: [{lable: "请选择"}, {lable: "芝罘区"}, {lable: "福山区"}, {lable: "牟平区"}, {lable: "莱山区"}, {lable: "龙口市"}, {lable: "莱阳市"}, {lable: "莱州市"}, {lable: "招远市"}, {lable: "蓬莱市"}, {lable: "栖霞市"}, {lable: "海阳市"}, {lable: "长岛县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "潍坊",
                      children: [{lable: "请选择"}, {lable: "潍城区"}, {lable: "寒亭区"}, {lable: "坊子区"}, {lable: "奎文区"}, {lable: "青州市"}, {lable: "诸城市"}, {lable: "寿光市"}, {lable: "安丘市"}, {lable: "高密市"}, {lable: "昌邑市"}, {lable: "昌乐县"}, {lable: "临朐县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "济宁",
                      children: [{lable: "请选择"}, {lable: "市中区"}, {lable: "任城区"}, {lable: "曲阜市"}, {lable: "兖州市"}, {lable: "邹城市"}, {lable: "鱼台县"}, {lable: "金乡县"}, {lable: "嘉祥县"}, {lable: "微山县"}, {lable: "汶上县"}, {lable: "泗水县"}, {lable: "梁山县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "泰安",
                      children: [{lable: "请选择"}, {lable: "泰山区"}, {lable: "岱岳区"}, {lable: "新泰市"}, {lable: "肥城市"}, {lable: "宁阳县"}, {lable: "东平县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "威海",
                      children: [{lable: "请选择"}, {lable: "环翠区"}, {lable: "乳山市"}, {lable: "文登市"}, {lable: "荣成市"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "日照",
                      children: [{lable: "请选择"}, {lable: "东港区"}, {lable: "岚山区"}, {lable: "五莲县"}, {lable: "莒县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "莱芜",
                      children: [{lable: "请选择"}, {lable: "莱城区"}, {lable: "钢城区"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "临沂",
                      children: [{lable: "请选择"}, {lable: "兰山区"}, {lable: "罗庄区"}, {lable: "河东区"}, {lable: "沂南县"}, {lable: "郯城县"}, {lable: "沂水县"}, {lable: "苍山县"}, {lable: "费县"}, {lable: "平邑县"}, {lable: "莒南县"}, {lable: "蒙阴县"}, {lable: "临沭县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "德州",
                      children: [{lable: "请选择"}, {lable: "德城区"}, {lable: "乐陵市"}, {lable: "禹城市"}, {lable: "陵县"}, {lable: "宁津县"}, {lable: "齐河县"}, {lable: "武城县"}, {lable: "庆云县"}, {lable: "平原县"}, {lable: "夏津县"}, {lable: "临邑县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "聊城",
                      children: [{lable: "请选择"}, {lable: "东昌府区"}, {lable: "临清市"}, {lable: "高唐县"}, {lable: "阳谷县"}, {lable: "茌平县"}, {lable: "莘县"}, {lable: "东阿县"}, {lable: "冠县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "滨州",
                      children: [{lable: "请选择"}, {lable: "滨城区"}, {lable: "邹平县"}, {lable: "沾化县"}, {lable: "惠民县"}, {lable: "博兴县"}, {lable: "阳信县"}, {lable: "无棣县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "菏泽",
                      children: [{lable: "请选择"}, {lable: "牡丹区"}, {lable: "鄄城县"}, {lable: "单县"}, {lable: "郓城县"}, {lable: "曹县"}, {lable: "定陶县"}, {lable: "巨野县"}, {lable: "东明县"}, {lable: "成武县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "安徽",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "合肥",
                      children: [{lable: "请选择"}, {lable: "庐阳区"}, {lable: "瑶海区"}, {lable: "蜀山区"}, {lable: "包河区"}, {lable: "长丰县"}, {lable: "肥东县"}, {lable: "肥西县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "芜湖",
                      children: [{lable: "请选择"}, {lable: "镜湖区"}, {lable: "弋江区"}, {lable: "鸠江区"}, {lable: "三山区"}, {lable: "芜湖县"}, {lable: "南陵县"}, {lable: "繁昌县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "蚌埠",
                      children: [{lable: "请选择"}, {lable: "蚌山区"}, {lable: "龙子湖区"}, {lable: "禹会区"}, {lable: "淮上区"}, {lable: "怀远县"}, {lable: "固镇县"}, {lable: "五河县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "淮南",
                      children: [{lable: "请选择"}, {lable: "田家庵区"}, {lable: "大通区"}, {lable: "谢家集区"}, {lable: "八公山区"}, {lable: "潘集区"}, {lable: "凤台县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "马鞍山",
                      children: [{lable: "请选择"}, {lable: "雨山区"}, {lable: "花山区"}, {lable: "金家庄区"}, {lable: "当涂县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "淮北",
                      children: [{lable: "请选择"}, {lable: "相山区"}, {lable: "杜集区"}, {lable: "烈山区"}, {lable: "濉溪县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "铜陵",
                      children: [{lable: "请选择"}, {lable: "铜官山区"}, {lable: "狮子山区"}, {lable: "郊区"}, {lable: "铜陵县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "安庆",
                      children: [{lable: "请选择"}, {lable: "迎江区"}, {lable: "大观区"}, {lable: "宜秀区"}, {lable: "桐城市"}, {lable: "宿松县"}, {lable: "枞阳县"}, {lable: "太湖县"}, {lable: "怀宁县"}, {lable: "岳西县"}, {lable: "望江县"}, {lable: "潜山县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "黄山",
                      children: [{lable: "请选择"}, {lable: "屯溪区"}, {lable: "黄山区"}, {lable: "徽州区"}, {lable: "休宁县"}, {lable: "歙县"}, {lable: "祁门县"}, {lable: "黟县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "滁州",
                      children: [{lable: "请选择"}, {lable: "琅琊区"}, {lable: "南谯区"}, {lable: "天长市"}, {lable: "明光市"}, {lable: "全椒县"}, {lable: "来安县"}, {lable: "定远县"}, {lable: "凤阳县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "阜阳",
                      children: [{lable: "请选择"}, {lable: "颍州区"}, {lable: "颍东区"}, {lable: "颍泉区"}, {lable: "界首市"}, {lable: "临泉县"}, {lable: "颍上县"}, {lable: "阜南县"}, {lable: "太和县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "宿州",
                      children: [{lable: "请选择"}, {lable: "埇桥区"}, {lable: "萧县"}, {lable: "泗县"}, {lable: "砀山县"}, {lable: "灵璧县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "巢湖",
                      children: [{lable: "请选择"}, {lable: "居巢区"}, {lable: "含山县"}, {lable: "无为县"}, {lable: "庐江县"}, {lable: "和县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "六安",
                      children: [{lable: "请选择"}, {lable: "金安区"}, {lable: "裕安区"}, {lable: "寿县"}, {lable: "霍山县"}, {lable: "霍邱县"}, {lable: "舒城县"}, {lable: "金寨县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "亳州",
                      children: [{lable: "请选择"}, {lable: "谯城区"}, {lable: "利辛县"}, {lable: "涡阳县"}, {lable: "蒙城县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "池州",
                      children: [{lable: "请选择"}, {lable: "贵池区"}, {lable: "东至县"}, {lable: "石台县"}, {lable: "青阳县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "宣城",
                      children: [{lable: "请选择"}, {lable: "宣州区"}, {lable: "宁国市"}, {lable: "广德县"}, {lable: "郎溪县"}, {lable: "泾县"}, {lable: "旌德县"}, {lable: "绩溪县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "浙江",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "杭州",
                      children: [{lable: "请选择"}, {lable: "拱墅区"}, {lable: "西湖区"}, {lable: "上城区"}, {lable: "下城区"}, {lable: "江干区"}, {lable: "滨江区"}, {lable: "余杭区"}, {lable: "萧山区"}, {lable: "建德市"}, {lable: "富阳市"}, {lable: "临安市"}, {lable: "桐庐县"}, {lable: "淳安县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "宁波",
                      children: [{lable: "请选择"}, {lable: "海曙区"}, {lable: "江东区"}, {lable: "江北区"}, {lable: "镇海区"}, {lable: "北仑区"}, {lable: "鄞州区"}, {lable: "余姚市"}, {lable: "慈溪市"}, {lable: "奉化市"}, {lable: "宁海县"}, {lable: "象山县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "温州",
                      children: [{lable: "请选择"}, {lable: "鹿城区"}, {lable: "龙湾区"}, {lable: "瓯海区"}, {lable: "瑞安市"}, {lable: "乐清市"}, {lable: "永嘉县"}, {lable: "洞头县"}, {lable: "平阳县"}, {lable: "苍南县"}, {lable: "文成县"}, {lable: "泰顺县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "嘉兴",
                      children: [{lable: "请选择"}, {lable: "秀城区"}, {lable: "秀洲区"}, {lable: "海宁市"}, {lable: "平湖市"}, {lable: "桐乡市"}, {lable: "嘉善县"}, {lable: "海盐县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "湖州",
                      children: [{lable: "请选择"}, {lable: "吴兴区"}, {lable: "南浔区"}, {lable: "长兴县"}, {lable: "德清县"}, {lable: "安吉县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "绍兴",
                      children: [{lable: "请选择"}, {lable: "越城区"}, {lable: "诸暨市"}, {lable: "上虞市"}, {lable: "嵊州市"}, {lable: "绍兴县"}, {lable: "新昌县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "金华",
                      children: [{lable: "请选择"}, {lable: "婺城区"}, {lable: "金东区"}, {lable: "兰溪市"}, {lable: "义乌市"}, {lable: "东阳市"}, {lable: "永康市"}, {lable: "武义县"}, {lable: "浦江县"}, {lable: "磐安县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "衢州",
                      children: [{lable: "请选择"}, {lable: "柯城区"}, {lable: "衢江区"}, {lable: "江山市"}, {lable: "龙游县"}, {lable: "常山县"}, {lable: "开化县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "舟山",
                      children: [{lable: "请选择"}, {lable: "定海区"}, {lable: "普陀区"}, {lable: "岱山县"}, {lable: "嵊泗县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "台州",
                      children: [{lable: "请选择"}, {lable: "椒江区"}, {lable: "黄岩区"}, {lable: "路桥区"}, {lable: "临海市"}, {lable: "温岭市"}, {lable: "玉环县"}, {lable: "天台县"}, {lable: "仙居县"}, {lable: "三门县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "丽水",
                      children: [{lable: "请选择"}, {lable: "莲都区"}, {lable: "龙泉市"}, {lable: "缙云县"}, {lable: "青田县"}, {lable: "云和县"}, {lable: "遂昌县"}, {lable: "松阳县"}, {lable: "庆元县"}, {lable: "景宁畲族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "福建",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "福州",
                      children: [{lable: "请选择"}, {lable: "鼓楼区"}, {lable: "台江区"}, {lable: "仓山区"}, {lable: "马尾区"}, {lable: "晋安区"}, {lable: "福清市"}, {lable: "长乐市"}, {lable: "闽侯县"}, {lable: "闽清县"}, {lable: "永泰县"}, {lable: "连江县"}, {lable: "罗源县"}, {lable: "平潭县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "厦门",
                      children: [{lable: "请选择"}, {lable: "思明区"}, {lable: "海沧区"}, {lable: "湖里区"}, {lable: "集美区"}, {lable: "同安区"}, {lable: "翔安区"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "莆田",
                      children: [{lable: "请选择"}, {lable: "城厢区"}, {lable: "涵江区"}, {lable: "荔城区"}, {lable: "秀屿区"}, {lable: "仙游县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "三明",
                      children: [{lable: "请选择"}, {lable: "梅列区"}, {lable: "三元区"}, {lable: "永安市"}, {lable: "明溪县"}, {lable: "将乐县"}, {lable: "大田县"}, {lable: "宁化县"}, {lable: "建宁县"}, {lable: "沙县"}, {lable: "尤溪县"}, {lable: "清流县"}, {lable: "泰宁县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "泉州",
                      children: [{lable: "请选择"}, {lable: "鲤城区"}, {lable: "丰泽区"}, {lable: "洛江区"}, {lable: "泉港区"}, {lable: "石狮市"}, {lable: "晋江市"}, {lable: "南安市"}, {lable: "惠安县"}, {lable: "永春县"}, {lable: "安溪县"}, {lable: "德化县"}, {lable: "金门县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "漳州",
                      children: [{lable: "请选择"}, {lable: "芗城区"}, {lable: "龙文区"}, {lable: "龙海市"}, {lable: "平和县"}, {lable: "南靖县"}, {lable: "诏安县"}, {lable: "漳浦县"}, {lable: "华安县"}, {lable: "东山县"}, {lable: "长泰县"}, {lable: "云霄县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "南平",
                      children: [{lable: "请选择"}, {lable: "延平区"}, {lable: "建瓯市"}, {lable: "邵武市"}, {lable: "武夷山市"}, {lable: "建阳市"}, {lable: "松溪县"}, {lable: "光泽县"}, {lable: "顺昌县"}, {lable: "浦城县"}, {lable: "政和县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "龙岩",
                      children: [{lable: "请选择"}, {lable: "新罗区"}, {lable: "漳平市"}, {lable: "长汀县"}, {lable: "武平县"}, {lable: "上杭县"}, {lable: "永定县"}, {lable: "连城县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "宁德",
                      children: [{lable: "请选择"}, {lable: "蕉城区"}, {lable: "福安市"}, {lable: "福鼎市"}, {lable: "寿宁县"}, {lable: "霞浦县"}, {lable: "柘荣县"}, {lable: "屏南县"}, {lable: "古田县"}, {lable: "周宁县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "湖南",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "长沙",
                      children: [{lable: "请选择"}, {lable: "岳麓区"}, {lable: "芙蓉区"}, {lable: "天心区"}, {lable: "开福区"}, {lable: "雨花区"}, {lable: "浏阳市"}, {lable: "长沙县"}, {lable: "望城县"}, {lable: "宁乡县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "株洲",
                      children: [{lable: "请选择"}, {lable: "天元区"}, {lable: "荷塘区"}, {lable: "芦淞区"}, {lable: "石峰区"}, {lable: "醴陵市"}, {lable: "株洲县"}, {lable: "炎陵县"}, {lable: "茶陵县"}, {lable: "攸县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "湘潭",
                      children: [{lable: "请选择"}, {lable: "岳塘区"}, {lable: "雨湖区"}, {lable: "湘乡市"}, {lable: "韶山市"}, {lable: "湘潭县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "衡阳",
                      children: [{lable: "请选择"}, {lable: "雁峰区"}, {lable: "珠晖区"}, {lable: "石鼓区"}, {lable: "蒸湘区"}, {lable: "南岳区"}, {lable: "耒阳市"}, {lable: "常宁市"}, {lable: "衡阳县"}, {lable: "衡东县"}, {lable: "衡山县"}, {lable: "衡南县"}, {lable: "祁东县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "邵阳",
                      children: [{lable: "请选择"}, {lable: "双清区"}, {lable: "大祥区"}, {lable: "北塔区"}, {lable: "武冈市"}, {lable: "邵东县"}, {lable: "洞口县"}, {lable: "新邵县"}, {lable: "绥宁县"}, {lable: "新宁县"}, {lable: "邵阳县"}, {lable: "隆回县"}, {lable: "城步苗族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "岳阳",
                      children: [{lable: "请选择"}, {lable: "岳阳楼区"}, {lable: "云溪区"}, {lable: "君山区"}, {lable: "临湘市"}, {lable: "汨罗市"}, {lable: "岳阳县"}, {lable: "湘阴县"}, {lable: "平江县"}, {lable: "华容县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "常德",
                      children: [{lable: "请选择"}, {lable: "武陵区"}, {lable: "鼎城区"}, {lable: "津市市"}, {lable: "澧县"}, {lable: "临澧县"}, {lable: "桃源县"}, {lable: "汉寿县"}, {lable: "安乡县"}, {lable: "石门县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "张家界",
                      children: [{lable: "请选择"}, {lable: "永定区"}, {lable: "武陵源区"}, {lable: "慈利县"}, {lable: "桑植县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "益阳",
                      children: [{lable: "请选择"}, {lable: "赫山区"}, {lable: "资阳区"}, {lable: "沅江市"}, {lable: "桃江县"}, {lable: "南县"}, {lable: "安化县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "郴州",
                      children: [{lable: "请选择"}, {lable: "北湖区"}, {lable: "苏仙区"}, {lable: "资兴市"}, {lable: "宜章县"}, {lable: "汝城县"}, {lable: "安仁县"}, {lable: "嘉禾县"}, {lable: "临武县"}, {lable: "桂东县"}, {lable: "永兴县"}, {lable: "桂阳县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "永州",
                      children: [{lable: "请选择"}, {lable: "冷水滩区"}, {lable: "零陵区"}, {lable: "祁阳县"}, {lable: "蓝山县"}, {lable: "宁远县"}, {lable: "新田县"}, {lable: "东安县"}, {lable: "江永县"}, {lable: "道县"}, {lable: "双牌县"}, {lable: "江华瑶族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "怀化",
                      children: [{lable: "请选择"}, {lable: "鹤城区"}, {lable: "洪江市"}, {lable: "会同县"}, {lable: "沅陵县"}, {lable: "辰溪县"}, {lable: "溆浦县"}, {lable: "中方县"}, {lable: "新晃侗族自治县"}, {lable: "芷江侗族自治县"}, {lable: "通道侗族自治县"}, {lable: "靖州苗族侗族自治县"}, {lable: "麻阳苗族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "娄底",
                      children: [{lable: "请选择"}, {lable: "娄星区"}, {lable: "冷水江市"}, {lable: "涟源市"}, {lable: "新化县"}, {lable: "双峰县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "湘西土家族苗族自治州",
                      children: [{lable: "请选择"}, {lable: "吉首市"}, {lable: "古丈县"}, {lable: "龙山县"}, {lable: "永顺县"}, {lable: "凤凰县"}, {lable: "泸溪县"}, {lable: "保靖县"}, {lable: "花垣县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "广西",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "南宁",
                      children: [{lable: "请选择"}, {lable: "青秀区"}, {lable: "兴宁区"}, {lable: "西乡塘区"}, {lable: "良庆区"}, {lable: "江南区"}, {lable: "邕宁区"}, {lable: "武鸣县"}, {lable: "隆安县"}, {lable: "马山县"}, {lable: "上林县"}, {lable: "宾阳县"}, {lable: "横县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "柳州",
                      children: [{lable: "请选择"}, {lable: "城中区"}, {lable: "鱼峰区"}, {lable: "柳北区"}, {lable: "柳南区"}, {lable: "柳江县"}, {lable: "柳城县"}, {lable: "鹿寨县"}, {lable: "融安县"}, {lable: "融水苗族自治县"}, {lable: "三江侗族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "桂林",
                      children: [{lable: "请选择"}, {lable: "象山区"}, {lable: "秀峰区"}, {lable: "叠彩区"}, {lable: "七星区"}, {lable: "雁山区"}, {lable: "阳朔县"}, {lable: "临桂县"}, {lable: "灵川县"}, {lable: "全州县"}, {lable: "平乐县"}, {lable: "兴安县"}, {lable: "灌阳县"}, {lable: "荔浦县"}, {lable: "资源县"}, {lable: "永福县"}, {lable: "龙胜各族自治县"}, {lable: "恭城瑶族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "梧州",
                      children: [{lable: "请选择"}, {lable: "万秀区"}, {lable: "蝶山区"}, {lable: "长洲区"}, {lable: "岑溪市"}, {lable: "苍梧县"}, {lable: "藤县"}, {lable: "蒙山县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "北海",
                      children: [{lable: "请选择"}, {lable: "海城区"}, {lable: "银海区"}, {lable: "铁山港区"}, {lable: "合浦县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "防城港",
                      children: [{lable: "请选择"}, {lable: "港口区"}, {lable: "防城区"}, {lable: "东兴市"}, {lable: "上思县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "钦州",
                      children: [{lable: "请选择"}, {lable: "钦南区"}, {lable: "钦北区"}, {lable: "灵山县"}, {lable: "浦北县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "贵港",
                      children: [{lable: "请选择"}, {lable: "港北区"}, {lable: "港南区"}, {lable: "覃塘区"}, {lable: "桂平市"}, {lable: "平南县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "玉林",
                      children: [{lable: "请选择"}, {lable: "玉州区"}, {lable: "北流市"}, {lable: "容县"}, {lable: "陆川县"}, {lable: "博白县"}, {lable: "兴业县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "百色",
                      children: [{lable: "请选择"}, {lable: "右江区"}, {lable: "凌云县"}, {lable: "平果县"}, {lable: "西林县"}, {lable: "乐业县"}, {lable: "德保县"}, {lable: "田林县"}, {lable: "田阳县"}, {lable: "靖西县"}, {lable: "田东县"}, {lable: "那坡县"}, {lable: "隆林各族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "贺州",
                      children: [{lable: "请选择"}, {lable: "八步区"}, {lable: "钟山县"}, {lable: "昭平县"}, {lable: "富川瑶族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "河池",
                      children: [{lable: "请选择"}, {lable: "金城江区"}, {lable: "宜州市"}, {lable: "天峨县"}, {lable: "凤山县"}, {lable: "南丹县"}, {lable: "东兰县"}, {lable: "都安瑶族自治县"}, {lable: "罗城仫佬族自治县"}, {lable: "巴马瑶族自治县"}, {lable: "环江毛南族自治县"}, {lable: "大化瑶族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "来宾",
                      children: [{lable: "请选择"}, {lable: "兴宾区"}, {lable: "合山市"}, {lable: "象州县"}, {lable: "武宣县"}, {lable: "忻城县"}, {lable: "金秀瑶族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "崇左",
                      children: [{lable: "请选择"}, {lable: "江州区"}, {lable: "凭祥市"}, {lable: "宁明县"}, {lable: "扶绥县"}, {lable: "龙州县"}, {lable: "大新县"}, {lable: "天等县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "江西",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "南昌",
                      children: [{lable: "请选择"}, {lable: "东湖区"}, {lable: "西湖区"}, {lable: "青云谱区"}, {lable: "湾里区"}, {lable: "青山湖区"}, {lable: "新建县"}, {lable: "南昌县"}, {lable: "进贤县"}, {lable: "安义县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "景德镇",
                      children: [{lable: "请选择"}, {lable: "珠山区"}, {lable: "昌江区"}, {lable: "乐平市"}, {lable: "浮梁县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "萍乡",
                      children: [{lable: "请选择"}, {lable: "安源区"}, {lable: "湘东区"}, {lable: "莲花县"}, {lable: "上栗县"}, {lable: "芦溪县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "九江",
                      children: [{lable: "请选择"}, {lable: "浔阳区"}, {lable: "庐山区"}, {lable: "瑞昌市"}, {lable: "九江县"}, {lable: "星子县"}, {lable: "武宁县"}, {lable: "彭泽县"}, {lable: "永修县"}, {lable: "修水县"}, {lable: "湖口县"}, {lable: "德安县"}, {lable: "都昌县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "新余",
                      children: [{lable: "请选择"}, {lable: "渝水区"}, {lable: "分宜县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "鹰潭",
                      children: [{lable: "请选择"}, {lable: "月湖区"}, {lable: "贵溪市"}, {lable: "余江县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "赣州",
                      children: [{lable: "请选择"}, {lable: "章贡区"}, {lable: "瑞金市"}, {lable: "南康市"}, {lable: "石城县"}, {lable: "安远县"}, {lable: "赣县"}, {lable: "宁都县"}, {lable: "寻乌县"}, {lable: "兴国县"}, {lable: "定南县"}, {lable: "上犹县"}, {lable: "于都县"}, {lable: "龙南县"}, {lable: "崇义县"}, {lable: "信丰县"}, {lable: "全南县"}, {lable: "大余县"}, {lable: "会昌县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "吉安",
                      children: [{lable: "请选择"}, {lable: "吉州区"}, {lable: "青原区"}, {lable: "井冈山市"}, {lable: "吉安县"}, {lable: "永丰县"}, {lable: "永新县"}, {lable: "新干县"}, {lable: "泰和县"}, {lable: "峡江县"}, {lable: "遂川县"}, {lable: "安福县"}, {lable: "吉水县"}, {lable: "万安县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "宜春",
                      children: [{lable: "请选择"}, {lable: "袁州区"}, {lable: "丰城市"}, {lable: "樟树市"}, {lable: "高安市"}, {lable: "铜鼓县"}, {lable: "靖安县"}, {lable: "宜丰县"}, {lable: "奉新县"}, {lable: "万载县"}, {lable: "上高县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "抚州",
                      children: [{lable: "请选择"}, {lable: "临川区"}, {lable: "南丰县"}, {lable: "乐安县"}, {lable: "金溪县"}, {lable: "南城县"}, {lable: "东乡县"}, {lable: "资溪县"}, {lable: "宜黄县"}, {lable: "广昌县"}, {lable: "黎川县"}, {lable: "崇仁县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "上饶",
                      children: [{lable: "请选择"}, {lable: "信州区"}, {lable: "德兴市"}, {lable: "上饶县"}, {lable: "广丰县"}, {lable: "鄱阳县"}, {lable: "婺源县"}, {lable: "铅山县"}, {lable: "余干县"}, {lable: "横峰县"}, {lable: "弋阳县"}, {lable: "玉山县"}, {lable: "万年县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "贵州",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "贵阳",
                      children: [{lable: "请选择"}, {lable: "南明区"}, {lable: "云岩区"}, {lable: "花溪区"}, {lable: "乌当区"}, {lable: "白云区"}, {lable: "小河区"}, {lable: "清镇市"}, {lable: "开阳县"}, {lable: "修文县"}, {lable: "息烽县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "六盘水",
                      children: [{lable: "请选择"}, {lable: "钟山区"}, {lable: "水城县"}, {lable: "盘县"}, {lable: "六枝特区"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "遵义",
                      children: [{lable: "请选择"}, {lable: "红花岗区"}, {lable: "汇川区"}, {lable: "赤水市"}, {lable: "仁怀市"}, {lable: "遵义县"}, {lable: "绥阳县"}, {lable: "桐梓县"}, {lable: "习水县"}, {lable: "凤冈县"}, {lable: "正安县"}, {lable: "余庆县"}, {lable: "湄潭县"}, {lable: "道真仡佬族苗族自治县"}, {lable: "务川仡佬族苗族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "安顺",
                      children: [{lable: "请选择"}, {lable: "西秀区"}, {lable: "普定县"}, {lable: "平坝县"}, {lable: "镇宁布依族苗族自治县"}, {lable: "紫云苗族布依族自治县"}, {lable: "关岭布依族苗族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "铜仁地区",
                      children: [{lable: "请选择"}, {lable: "铜仁市"}, {lable: "德江县"}, {lable: "江口县"}, {lable: "思南县"}, {lable: "石阡县"}, {lable: "玉屏侗族自治县"}, {lable: "松桃苗族自治县"}, {lable: "印江土家族苗族自治县"}, {lable: "沿河土家族自治县"}, {lable: "万山特区"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "毕节地区",
                      children: [{lable: "请选择"}, {lable: "毕节市"}, {lable: "黔西县"}, {lable: "大方县"}, {lable: "织金县"}, {lable: "金沙县"}, {lable: "赫章县"}, {lable: "纳雍县"}, {lable: "威宁彝族回族苗族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "黔西南布依族苗族自治州",
                      children: [{lable: "请选择"}, {lable: "兴义市"}, {lable: "望谟县"}, {lable: "兴仁县"}, {lable: "普安县"}, {lable: "册亨县"}, {lable: "晴隆县"}, {lable: "贞丰县"}, {lable: "安龙县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "黔东南苗族侗族自治州",
                      children: [{lable: "请选择"}, {lable: "凯里市"}, {lable: "施秉县"}, {lable: "从江县"}, {lable: "锦屏县"}, {lable: "镇远县"}, {lable: "麻江县"}, {lable: "台江县"}, {lable: "天柱县"}, {lable: "黄平县"}, {lable: "榕江县"}, {lable: "剑河县"}, {lable: "三穗县"}, {lable: "雷山县"}, {lable: "黎平县"}, {lable: "岑巩县"}, {lable: "丹寨县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "黔南布依族苗族自治州",
                      children: [{lable: "请选择"}, {lable: "都匀市"}, {lable: "福泉市"}, {lable: "贵定县"}, {lable: "惠水县"}, {lable: "罗甸县"}, {lable: "瓮安县"}, {lable: "荔波县"}, {lable: "龙里县"}, {lable: "平塘县"}, {lable: "长顺县"}, {lable: "独山县"}, {lable: "三都水族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "云南",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "昆明",
                      children: [{lable: "请选择"}, {lable: "盘龙区"}, {lable: "五华区"}, {lable: "官渡区"}, {lable: "西山区"}, {lable: "东川区"}, {lable: "安宁市"}, {lable: "呈贡县"}, {lable: "晋宁县"}, {lable: "富民县"}, {lable: "宜良县"}, {lable: "嵩明县"}, {lable: "石林彝族自治县"}, {lable: "禄劝彝族苗族自治县"}, {lable: "寻甸回族彝族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "曲靖",
                      children: [{lable: "请选择"}, {lable: "麒麟区"}, {lable: "宣威市"}, {lable: "马龙县"}, {lable: "沾益县"}, {lable: "富源县"}, {lable: "罗平县"}, {lable: "师宗县"}, {lable: "陆良县"}, {lable: "会泽县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "玉溪",
                      children: [{lable: "请选择"}, {lable: "红塔区"}, {lable: "江川县"}, {lable: "澄江县"}, {lable: "通海县"}, {lable: "华宁县"}, {lable: "易门县"}, {lable: "峨山彝族自治县"}, {lable: "新平彝族傣族自治县"}, {lable: "元江哈尼族彝族傣族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "保山",
                      children: [{lable: "请选择"}, {lable: "隆阳区"}, {lable: "施甸县"}, {lable: "腾冲县"}, {lable: "龙陵县"}, {lable: "昌宁县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "昭通",
                      children: [{lable: "请选择"}, {lable: "昭阳区"}, {lable: "鲁甸县"}, {lable: "巧家县"}, {lable: "盐津县"}, {lable: "大关县"}, {lable: "永善县"}, {lable: "绥江县"}, {lable: "镇雄县"}, {lable: "彝良县"}, {lable: "威信县"}, {lable: "水富县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "丽江",
                      children: [{lable: "请选择"}, {lable: "古城区"}, {lable: "永胜县"}, {lable: "华坪县"}, {lable: "玉龙纳西族自治县"}, {lable: "宁蒗彝族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "普洱",
                      children: [{lable: "请选择"}, {lable: "思茅区"}, {lable: "普洱哈尼族彝族自治县"}, {lable: "墨江哈尼族自治县"}, {lable: "景东彝族自治县"}, {lable: "景谷傣族彝族自治县"}, {lable: "镇沅彝族哈尼族拉祜族自治县"}, {lable: "江城哈尼族彝族自治县"}, {lable: "孟连傣族拉祜族佤族自治县"}, {lable: "澜沧拉祜族自治县"}, {lable: "西盟佤族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "临沧",
                      children: [{lable: "请选择"}, {lable: "临翔区"}, {lable: "凤庆县"}, {lable: "云县"}, {lable: "永德县"}, {lable: "镇康县"}, {lable: "双江拉祜族佤族布朗族傣族自治县"}, {lable: "耿马傣族佤族自治县"}, {lable: "沧源佤族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "德宏傣族景颇族自治州",
                      children: [{lable: "请选择"}, {lable: "潞西市"}, {lable: "瑞丽市"}, {lable: "梁河县"}, {lable: "盈江县"}, {lable: "陇川县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "怒江傈僳族自治州",
                      children: [{lable: "请选择"}, {lable: "泸水县"}, {lable: "福贡县"}, {lable: "贡山独龙族怒族自治县"}, {lable: "兰坪白族普米族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "迪庆藏族自治州",
                      children: [{lable: "请选择"}, {lable: "香格里拉县"}, {lable: "德钦县"}, {lable: "维西傈僳族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "大理白族自治州",
                      children: [{lable: "请选择"}, {lable: "大理市"}, {lable: "祥云县"}, {lable: "宾川县"}, {lable: "弥渡县"}, {lable: "永平县"}, {lable: "云龙县"}, {lable: "洱源县"}, {lable: "剑川县"}, {lable: "鹤庆县"}, {lable: "漾濞彝族自治县"}, {lable: "南涧彝族自治县"}, {lable: "巍山彝族回族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "楚雄彝族自治州",
                      children: [{lable: "请选择"}, {lable: "楚雄市"}, {lable: "双柏县"}, {lable: "牟定县"}, {lable: "南华县"}, {lable: "姚安县"}, {lable: "大姚县"}, {lable: "永仁县"}, {lable: "元谋县"}, {lable: "武定县"}, {lable: "禄丰县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "红河哈尼族彝族自治州",
                      children: [{lable: "请选择"}, {lable: "蒙自县"}, {lable: "个旧市"}, {lable: "开远市"}, {lable: "绿春县"}, {lable: "建水县"}, {lable: "石屏县"}, {lable: "弥勒县"}, {lable: "泸西县"}, {lable: "元阳县"}, {lable: "红河县"}, {lable: "金平苗族瑶族傣族自治县"}, {lable: "河口瑶族自治县"}, {lable: "屏边苗族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "文山壮族苗族自治州",
                      children: [{lable: "请选择"}, {lable: "文山县"}, {lable: "砚山县"}, {lable: "西畴县"}, {lable: "麻栗坡县"}, {lable: "马关县"}, {lable: "丘北县"}, {lable: "广南县"}, {lable: "富宁县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "西双版纳傣族自治州",
                      children: [{lable: "请选择"}, {lable: "景洪市"}, {lable: "勐海县"}, {lable: "勐腊县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "西藏",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "拉萨",
                      children: [{lable: "请选择"}, {lable: "城关区"}, {lable: "林周县"}, {lable: "当雄县"}, {lable: "尼木县"}, {lable: "曲水县"}, {lable: "堆龙德庆县"}, {lable: "达孜县"}, {lable: "墨竹工卡县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "那曲地区",
                      children: [{lable: "请选择"}, {lable: "那曲县"}, {lable: "嘉黎县"}, {lable: "比如县"}, {lable: "聂荣县"}, {lable: "安多县"}, {lable: "申扎县"}, {lable: "索县"}, {lable: "班戈县"}, {lable: "巴青县"}, {lable: "尼玛县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "昌都地区",
                      children: [{lable: "请选择"}, {lable: "昌都县"}, {lable: "江达县"}, {lable: "贡觉县"}, {lable: "类乌齐县"}, {lable: "丁青县"}, {lable: "察雅县"}, {lable: "八宿县"}, {lable: "左贡县"}, {lable: "芒康县"}, {lable: "洛隆县"}, {lable: "边坝县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "林芝地区",
                      children: [{lable: "请选择"}, {lable: "林芝县"}, {lable: "工布江达县"}, {lable: "米林县"}, {lable: "墨脱县"}, {lable: "波密县"}, {lable: "察隅县"}, {lable: "朗县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "山南地区",
                      children: [{lable: "请选择"}, {lable: "乃东县"}, {lable: "扎囊县"}, {lable: "贡嘎县"}, {lable: "桑日县"}, {lable: "琼结县"}, {lable: "曲松县"}, {lable: "措美县"}, {lable: "洛扎县"}, {lable: "加查县"}, {lable: "隆子县"}, {lable: "错那县"}, {lable: "浪卡子县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "日喀则地区",
                      children: [{lable: "请选择"}, {lable: "日喀则市"}, {lable: "南木林县"}, {lable: "江孜县"}, {lable: "定日县"}, {lable: "萨迦县"}, {lable: "拉孜县"}, {lable: "昂仁县"}, {lable: "谢通门县"}, {lable: "白朗县"}, {lable: "仁布县"}, {lable: "康马县"}, {lable: "定结县"}, {lable: "仲巴县"}, {lable: "亚东县"}, {lable: "吉隆县"}, {lable: "聂拉木县"}, {lable: "萨嘎县"}, {lable: "岗巴县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "阿里地区",
                      children: [{lable: "请选择"}, {lable: "噶尔县"}, {lable: "普兰县"}, {lable: "札达县"}, {lable: "日土县"}, {lable: "革吉县"}, {lable: "改则县"}, {lable: "措勤县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "海南",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "海口",
                      children: [{lable: "请选择"}, {lable: "龙华区"}, {lable: "秀英区"}, {lable: "琼山区"}, {lable: "美兰区"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "三亚",
                      children: [{lable: "请选择"}, {lable: "三亚市"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "五指山",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "琼海",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "儋州",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "文昌",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "万宁",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "东方",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "澄迈县",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "定安县",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "屯昌县",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "临高县",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "白沙黎族自治县",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "昌江黎族自治县",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "乐东黎族自治县",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "陵水黎族自治县",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "保亭黎族苗族自治县",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "琼中黎族苗族自治县",
                      children: [],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "甘肃",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "兰州",
                      children: [{lable: "请选择"}, {lable: "城关区"}, {lable: "七里河区"}, {lable: "西固区"}, {lable: "安宁区"}, {lable: "红古区"}, {lable: "永登县"}, {lable: "皋兰县"}, {lable: "榆中县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "嘉峪关",
                      children: [{lable: "请选择"}, {lable: "嘉峪关市"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "金昌",
                      children: [{lable: "请选择"}, {lable: "金川区"}, {lable: "永昌县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "白银",
                      children: [{lable: "请选择"}, {lable: "白银区"}, {lable: "平川区"}, {lable: "靖远县"}, {lable: "会宁县"}, {lable: "景泰县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "天水",
                      children: [{lable: "请选择"}, {lable: "清水县"}, {lable: "秦安县"}, {lable: "甘谷县"}, {lable: "武山县"}, {lable: "张家川回族自治县"}, {lable: "北道区"}, {lable: "秦城区"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "武威",
                      children: [{lable: "请选择"}, {lable: "凉州区"}, {lable: "民勤县"}, {lable: "古浪县"}, {lable: "天祝藏族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "酒泉",
                      children: [{lable: "请选择"}, {lable: "肃州区"}, {lable: "玉门市"}, {lable: "敦煌市"}, {lable: "金塔县"}, {lable: "肃北蒙古族自治县"}, {lable: "阿克塞哈萨克族自治县"}, {lable: "安西县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "张掖",
                      children: [{lable: "请选择"}, {lable: "甘州区"}, {lable: "民乐县"}, {lable: "临泽县"}, {lable: "高台县"}, {lable: "山丹县"}, {lable: "肃南裕固族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "庆阳",
                      children: [{lable: "请选择"}, {lable: "西峰区"}, {lable: "庆城县"}, {lable: "环县"}, {lable: "华池县"}, {lable: "合水县"}, {lable: "正宁县"}, {lable: "宁县"}, {lable: "镇原县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "平凉",
                      children: [{lable: "请选择"}, {lable: "崆峒区"}, {lable: "泾川县"}, {lable: "灵台县"}, {lable: "崇信县"}, {lable: "华亭县"}, {lable: "庄浪县"}, {lable: "静宁县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "定西",
                      children: [{lable: "请选择"}, {lable: "安定区"}, {lable: "通渭县"}, {lable: "临洮县"}, {lable: "漳县"}, {lable: "岷县"}, {lable: "渭源县"}, {lable: "陇西县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "陇南",
                      children: [{lable: "请选择"}, {lable: "武都区"}, {lable: "成县"}, {lable: "宕昌县"}, {lable: "康县"}, {lable: "文县"}, {lable: "西和县"}, {lable: "礼县"}, {lable: "两当县"}, {lable: "徽县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "临夏回族自治州",
                      children: [{lable: "请选择"}, {lable: "临夏市"}, {lable: "临夏县"}, {lable: "康乐县"}, {lable: "永靖县"}, {lable: "广河县"}, {lable: "和政县"}, {lable: "东乡族自治县"}, {lable: "积石山保安族东乡族撒拉族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "甘南藏族自治州",
                      children: [{lable: "请选择"}, {lable: "合作市"}, {lable: "临潭县"}, {lable: "卓尼县"}, {lable: "舟曲县"}, {lable: "迭部县"}, {lable: "玛曲县"}, {lable: "碌曲县"}, {lable: "夏河县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "宁夏",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "银川",
                      children: [{lable: "请选择"}, {lable: "兴庆区"}, {lable: "西夏区"}, {lable: "金凤区"}, {lable: "灵武市"}, {lable: "永宁县"}, {lable: "贺兰县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "石嘴山",
                      children: [{lable: "请选择"}, {lable: "大武口区"}, {lable: "惠农区"}, {lable: "平罗县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "吴忠",
                      children: [{lable: "请选择"}, {lable: "利通区"}, {lable: "青铜峡市"}, {lable: "盐池县"}, {lable: "同心县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "固原",
                      children: [{lable: "请选择"}, {lable: "原州区"}, {lable: "西吉县"}, {lable: "隆德县"}, {lable: "泾源县"}, {lable: "彭阳县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "中卫",
                      children: [{lable: "请选择"}, {lable: "沙坡头区"}, {lable: "中宁县"}, {lable: "海原县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "青海",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "西宁",
                      children: [{lable: "请选择"}, {lable: "城中区"}, {lable: "城东区"}, {lable: "城西区"}, {lable: "城北区"}, {lable: "湟源县"}, {lable: "湟中县"}, {lable: "大通回族土族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "海东地区",
                      children: [{lable: "请选择"}, {lable: "平安县"}, {lable: "乐都县"}, {lable: "民和回族土族自治县"}, {lable: "互助土族自治县"}, {lable: "化隆回族自治县"}, {lable: "循化撒拉族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "海北藏族自治州",
                      children: [{lable: "请选择"}, {lable: "海晏县"}, {lable: "祁连县"}, {lable: "刚察县"}, {lable: "门源回族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "海南藏族自治州",
                      children: [{lable: "请选择"}, {lable: "共和县"}, {lable: "同德县"}, {lable: "贵德县"}, {lable: "兴海县"}, {lable: "贵南县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "黄南藏族自治州",
                      children: [{lable: "请选择"}, {lable: "同仁县"}, {lable: "尖扎县"}, {lable: "泽库县"}, {lable: "河南蒙古族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "果洛藏族自治州",
                      children: [{lable: "请选择"}, {lable: "玛沁县"}, {lable: "班玛县"}, {lable: "甘德县"}, {lable: "达日县"}, {lable: "久治县"}, {lable: "玛多县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "玉树藏族自治州",
                      children: [{lable: "请选择"}, {lable: "玉树县"}, {lable: "杂多县"}, {lable: "称多县"}, {lable: "治多县"}, {lable: "囊谦县"}, {lable: "曲麻莱县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "海西蒙古族藏族自治州",
                      children: [{lable: "请选择"}, {lable: "德令哈市"}, {lable: "格尔木市"}, {lable: "乌兰县"}, {lable: "都兰县"}, {lable: "天峻县"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "新疆",
                  value:0,
                  children: [{lable: "请选择", children: []},
                    {
                      lable: "乌鲁木齐",
                      children: [{lable: "请选择"}, {lable: "天山区"}, {lable: "沙依巴克区"}, {lable: "新市区"}, {lable: "水磨沟区"}, {lable: "头屯河区"}, {lable: "达坂城区"}, {lable: "东山区"}, {lable: "乌鲁木齐县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "克拉玛依",
                      children: [{lable: "请选择"}, {lable: "克拉玛依区"}, {lable: "独山子区"}, {lable: "白碱滩区"}, {lable: "乌尔禾区"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "吐鲁番地区",
                      children: [{lable: "请选择"}, {lable: "吐鲁番市"}, {lable: "托克逊县"}, {lable: "鄯善县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "哈密地区",
                      children: [{lable: "请选择"}, {lable: "哈密市"}, {lable: "伊吾县"}, {lable: "巴里坤哈萨克自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "和田地区",
                      children: [{lable: "请选择"}, {lable: "和田市"}, {lable: "和田县"}, {lable: "洛浦县"}, {lable: "民丰县"}, {lable: "皮山县"}, {lable: "策勒县"}, {lable: "于田县"}, {lable: "墨玉县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "阿克苏地区",
                      children: [{lable: "请选择"}, {lable: "阿克苏市"}, {lable: "温宿县"}, {lable: "沙雅县"}, {lable: "拜城县"}, {lable: "阿瓦提县"}, {lable: "库车县"}, {lable: "柯坪县"}, {lable: "新和县"}, {lable: "乌什县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "喀什地区",
                      children: [{lable: "请选择"}, {lable: "喀什市"}, {lable: "巴楚县"}, {lable: "泽普县"}, {lable: "伽师县"}, {lable: "叶城县"}, {lable: "岳普湖县"}, {lable: "疏勒县"}, {lable: "麦盖提县"}, {lable: "英吉沙县"}, {lable: "莎车县"}, {lable: "疏附县"}, {lable: "塔什库尔干塔吉克自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "克孜勒苏柯尔克孜自治州",
                      children: [{lable: "请选择"}, {lable: "阿图什市"}, {lable: "阿合奇县"}, {lable: "乌恰县"}, {lable: "阿克陶县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "巴音郭楞蒙古自治州",
                      children: [{lable: "请选择"}, {lable: "库尔勒市"}, {lable: "和静县"}, {lable: "尉犁县"}, {lable: "和硕县"}, {lable: "且末县"}, {lable: "博湖县"}, {lable: "轮台县"}, {lable: "若羌县"}, {lable: "焉耆回族自治县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "昌吉回族自治州",
                      children: [{lable: "请选择"}, {lable: "昌吉市"}, {lable: "阜康市"}, {lable: "奇台县"}, {lable: "玛纳斯县"}, {lable: "吉木萨尔县"}, {lable: "呼图壁县"}, {lable: "木垒哈萨克自治县"}, {lable: "米泉市"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "博尔塔拉蒙古自治州",
                      children: [{lable: "请选择"}, {lable: "博乐市"}, {lable: "精河县"}, {lable: "温泉县"}, {lable: "其他"}],
                      value: 0
                    },
                    {
                      lable: "石河子",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "阿拉尔",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "图木舒克",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "五家渠",
                      children: [],
                      value: 0
                    },
                    {
                      lable: "伊犁哈萨克自治州",
                      children: [{lable: "请选择"}, {lable: "伊宁市"}, {lable: "奎屯市"}, {lable: "伊宁县"}, {lable: "特克斯县"}, {lable: "尼勒克县"}, {lable: "昭苏县"}, {lable: "新源县"}, {lable: "霍城县"}, {lable: "巩留县"}, {lable: "察布查尔锡伯自治县"}, {lable: "塔城地区"}, {lable: "阿勒泰地区"}, {lable: "其他"}],
                      value: 0
                    },
                    {lable: "其他"}],
                },
                {
                  lable: "香港",
                  value:0,
                  children: [{lable: "请选择"}, {lable: "中西区"}, {lable: "湾仔区"}, {lable: "东区"}, {lable: "南区"}, {lable: "深水埗区"}, {lable: "油尖旺区"}, {lable: "九龙城区"}, {lable: "黄大仙区"}, {lable: "观塘区"}, {lable: "北区"}, {lable: "大埔区"}, {lable: "沙田区"}, {lable: "西贡区"}, {lable: "元朗区"}, {lable: "屯门区"}, {lable: "荃湾区"}, {lable: "葵青区"}, {lable: "离岛区"}, {lable: "其他"}],
                },
                {
                  lable: "澳门",
                  value:0,
                  children: [{lable: "请选择"}, {lable: "花地玛堂区"}, {lable: "圣安多尼堂区"}, {lable: "大堂区"}, {lable: "望德堂区"}, {lable: "风顺堂区"}, {lable: "嘉模堂区"}, {lable: "圣方济各堂区"}, {lable: "路凼"}, {lable: "其他"}],
                },
                {
                  lable: "台湾",
                  value:0,
                  children: [{lable: "请选择"}, {lable: "台北市"}, {lable: "高雄市"}, {lable: "台北县"}, {lable: "桃园县"}, {lable: "新竹县"}, {lable: "苗栗县"}, {lable: "台中县"}, {lable: "彰化县"}, {lable: "南投县"}, {lable: "云林县"}, {lable: "嘉义县"}, {lable: "台南县"}, {lable: "高雄县"}, {lable: "屏东县"}, {lable: "宜兰县"}, {lable: "花莲县"}, {lable: "台东县"}, {lable: "澎湖县"}, {lable: "基隆市"}, {lable: "新竹市"}, {lable: "台中市"}, {lable: "嘉义市"}, {lable: "台南市"}, {lable: "其他"}],
                },
                {
                  lable: "海外",
                  value:0,
                  children: [{lable: "请选择"}, {lable: "其他"}],
                },
              ],
              mode:'multiSelector',
              deepLength:3,
//              pickerValueDefault: [1],
              pickerValue: 0,
              pickerText:'',
              name:'',
              gender:'',
              phone:'',
              cardNum:'',
              shop_name:'',
              shop_logo:'',
              shop_phone:'',
              shop_address:'',
              visible: false,
              message:'',
              isTrue:true
            }
        },
        methods: {
          showPicker() {
            this.$refs.mpvuePicker.show();
          },
          pickerConfirm(e) {
            console.log(e);
          },
          onConfirm(e){
            this.pickerValue=e[0];
            this.pickerText=this.pickerValueArray[e[0]]
          },
          submitData(){
            var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if(this.phone==''||this.phone==null){
              this.$mptoast('请输入手机号');
              return;
            }else if(!myreg.test(this.phone)){
              this.$mptoast('手机号输入错误');
              return;
            }
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(this.cardNum==''||this.cardNum==null){
              this.$mptoast('请输入身份证');
              return;
            }else if(!reg.test(this.cardNum)){
              this.$mptoast('身份证输入错误');
              return;
            }
            var data={
              phone:this.phone,
              id_card:this.cardNum
            }
            this.$put('/rs/member/'+this.$store.state.user.userid,data).then(res=>{
              if(res.code == 200){
                this.$mptoast('保存成功');
                setTimeout(function() {
                  wx.navigateBack({     //返回上一页面或多级页面
                    delta: 1
                  })
                },1000);
              }else{
                this.$mptoast('保存失败');
              }
            })
          },
          submitData1(){
            if((this.shop_name).trim()==''){
              this.$mptoast('请输入商家名称');
              return;
            }else if(this.shop_name.length>15){
              this.$mptoast('商家名称输入错误');
              return;
            }
            if(this.shop_logo==''&&this.shop_logo==null){
              this.$mptoast('请上传商家logo');
              return;
            }
            var myreg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if(this.shop_phone==''||this.shop_phone==null){
              this.$mptoast('请输入联系电话');
              return;
            }else if(!myreg.test(this.shop_phone)){
              this.$mptoast('联系电话输入错误');
              return;
            }
            if(this.shop_address==''&&this.shop_address==null){
              this.$mptoast('请输入联系地址');
              return;
            }
            var data={
              nickname:this.shop_name,
              shop_logo:this.shop_logo,
              phone:this.shop_phone,
              address:this.shop_address
            }
            this.$put('/rs/member/'+this.$store.state.user.userid,data).then(res=>{
              if(res.code == 200){
                this.$mptoast('保存成功');
                setTimeout(function() {
                  wx.navigateBack({     //返回上一页面或多级页面
                    delta: 1
                  })
                },1000);
              }else{
                this.$mptoast('保存失败');
              }
            })
          },

          openImg(){
            var that=this;
            this.$uploadImg({
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['album', 'camera'],
            },function (rs) {
              var obj = JSON.parse(rs);
              that.shop_logo=obj[0].url;
            })
          },
          getUserinfo(){
            var that=this;
            this.$get('/rs/member/'+this.$store.state.user.userid,{}).then(res=>{
              if(res.code==200){
                var user=res.rows[0];
                if(user.gender==1){
                   this.gender='男';
                }else if(user.gender==2){
                  this.gender='女';
                }else if(user.gender==3){
                  this.gender='未知';
                }
                that.name=user.nickname;
                that.phone=user.phone;
                that.cardNum=user.id_card;
                that.shop_name=user.nickname;
                that.shop_logo=user.shop_logo;
                that.shop_phone=user.phone;
                that.shop_address=user.address;
              }

            })
          }

        },
        mounted(){
          this.getUserinfo();
          this.rank=1;
        },
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

</style>
