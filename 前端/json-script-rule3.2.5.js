/******************************************************************** */
/* the start arguments for example
const jsr_all_args = {
    params:{}                          //所有启动参数都支持的属性，表示业务参数，非插件模型参数，当有多个请求action时，会合并所有action里的params属性
}
const jsr_get_args = [{                //查询插件的启动参数例子
    plugin:'get'                       //插件类型，get表示查询插件
    name:'get action name',            //该属性必须要有，随便起一个返回结果的名字
    classes:['ClassA','ClassB'],       //表示查询的哪些实体类，"直接类名"（直接类名是以loactions配置为根节点，有包名则加包名，详情参见简介说明）
    isGroupShow:false,                 //是否将结果分组，多表查询时用于区分字段是哪个表下面的
    profile:{},                        //表示返回结果以主子表的层级关系展现，详情查看查询篇的属性说明
    fields:['name','id'],              //表示查询的字段，返回哪些字段，不写时默认全部，多表时会有class前缀，不为空时如果两个类字段名不冲突则不会有前缀
    relations:{                        //表示类和类之间的关系(表和表之间的关系)
        where:{                        //表示类和类之间的关系的条件，如果不写则默认后台po实体类配置的主外键关系
            equal:{"ClassA.companyCode":['#&ClassB.companyCode']}
        }
    }
    type:'or',                         //查询条件(非上面的类之间的关系条件)的关联类型，不写则默认是and
    eq:{"ClassA.companyCode":['#&ClassB.companyCode']},
    ne:{name:['asd','qweewq']},
    li:{name:['张三','李四'],remark:['他是隔壁老张']},            //配置方式时like里面是不需要加%百分号的
    nl:{},                                                      //原始json方式时like里面是需要加%百分号的，可以灵活配置走不走索引
    in:{name:['张三','李四']},                 //表示字段name的值满足为张三或者李四时的条件
    ni:{},                                    //与上面的相反，表示字段name的值不是张三或者李四时的条件
    gt:{salary:89,bonus:'72'},                //表示salary>89，bonus>'72'，这里字符串和数字都可以，条件和条件之间看上面的type属性来确定是否为and或者or
    ge:{salary:88,bonus:'71'},                //表示>=大于等于
    lt:{createDate:'2023-06-30 10:20:30'},    //表示<小于
    le:{salary:100,bonus:'100'},              //表示<=小于等于
    joins:[{                                  //外连接查询，包括左、右（3.2.5版本以后）、内连接查询，详情参考高级查询
        class:'ClassB',                       //joins是个数组，因此多个外连接的类需要写多个对象来表示
        type:"left",
        condition:{where:{equal:{"ClassB.id":["#&ClassA.b_id"]}}}
    }]
    page:{pageNum:1,pageSize:12}              //分页对象，不写则默认是pageNum:1,pageSize:10
}]
const jsr_add_args = [{                       //添加插件的启动参数例子
    plugin:'add',                             //插件类型，表示添加数据的插件
    name:'add action name',                   //该属性必须要有，随便起一个返回结果的名字
    class:'ClassA',                           //所要插入数据的实体类的"直接类名"
    uuid:['id'],                              //表示哪些字段采用uuid的方式自动生成
    calculate:["salary=-<salary>+0.5*(-10*10)","bonus=<bonus>-100"],   //表示对哪些字段进行计算处理，如salary的值为自身值+0.5*(-10*10)，最终将计算的结果入库
    ternary"["remark==oiu?tiu:"],             //三元表达式，表示哪些字段需要经过三元达表达式计算，为空时则什么都不写，remark的值如果为oiu，则变成tiu，否则设置为空
    def:{remark:'字段为空时默认的备注信息'},    //表示哪些字段设有默认值
    datas:[{name:'王五',salary:'88'},{name:'赵六',salary:'10'}]         //要插入的数据数组，mysql数据库时需要每一个对象的属性个数相同，否则需要后台到application配置文件中配置edi.rule.open.replenishColumns为true
}]
const jsr_edit_args = [{                      //修改插件的启动参数例子
    plugin:'edit',                            //插件类型，表示修改数据的插件
    name:'edit action name',                  //该属性必须要有，随便起一个返回结果的名字
    class:'ClassB',                           //所要修改数据的实体类的"直接类名"
    set:{name:'修改后的值',remark:'修改后的值'},//所要修改的字段有哪些，修改后的值是什么
    type:'or',
    eq:{},
    ne:{},
    li:{},
    nl:{},
    in:{},
    ni:{},
    gt:{},
    ge:{},
    lt:{},
    le:{}
}]
const jsr_delete_args = [{                    //删除插件的启动参数例子
    plugin:'delete',                          //插件类型，表示删除数据的插件
    name:'delete action name',                //该属性必须要有，随便起一个返回结果的名字
    class:'ClassB',                           //所要删除数据的实体类的"直接类名"
    isDeleteAll:false,                        //是否在没有设置删除条件的情况下删除全部数据，默认为false
    type:'or',
    eq:{},
    ne:{},
    li:{},
    nl:{},
    in:{},
    ni:{},
    gt:{},
    ge:{},
    lt:{},
    le:{}
}]

ajax request for example!!!!!!!!!!!

function jsr_start_body(body){
    $.ajax({
        url:jsr_configs.url,
        method:"post",
        data:JSON.stringify(body),
        dataType: "json",
        contentType:"application/json;charset=utf-8",
        success:function(res){
            jsr_result(res);
        },
        error:function(error){
            console.log(error);
            throw new Error("json script rule exception:you can check the background of the logs!");
        }
    })
}
*/

export{jsr_configs,jsr_build_body};

const jsr_configs = {
    url:"/json/script/start"
}

function jsr_build_body(args){
    if (!jsr_is_empty(args)){
        let body = {
            params:{},
            rule:{
                actions:[]
            }
        };
        for(let i in args) {
            let start = args[i];
            if (!jsr_is_empty(start.params)){
                for (let k in start.params){
                    body.params[k] = start.params[k];
                }
            }
            if ('get'==start.plugin){
                body.rule.actions.push({
                    name:start.name,
                    get:jsr_build_get(start)
                });
            }else if ('add'==start.plugin){
                body.rule.actions.push({
                    name:start.name,
                    add:jsr_build_add(start)
                });
            }else if ('edit'==start.plugin){
                body.rule.actions.push({
                    name:start.name,
                    edit:jsr_build_edit(start)
                });
            }else if ('delete'==start.plugin){
                body.rule.actions.push({
                    name:start.name,
                    delete:jsr_build_delete(start)
                });
            }else {
                throw new Error("unknown plugin");
            }
        }
        return body;
    }else{
        throw new Error("start params is required");
    }
}

function jsr_build_codition_type(type,es,sign){
    for(let k in es) {
        let v = es[k];
        if (!jsr_is_empty(v)){
            if (Array.isArray(v)){
                for(let i in v) {
                    let e = v[i];
                    if (!jsr_is_empty(e)){
                        if (jsr_is_empty(type[k])){
                            type[k]=[];
                        }
                        if (sign=="like"){
                            type[k].push("%"+e+"%");
                        }else{
                            type[k].push(e);
                        }
                    }
                }
            }else {
                type[k] = v;
            }
        }
    }
}

function jsr_build_condition(args,plugin){
    let matches = {};
    if (!jsr_is_empty(args.eq)){
        matches.eq = {};
        jsr_build_codition_type(matches.eq,args.eq);
    }
    if (!jsr_is_empty(args.ne)){
        matches.ne = {};
        jsr_build_codition_type(matches.ne,args.ne);
    }
    if (!jsr_is_empty(args.li)){
        matches.li = {};
        jsr_build_codition_type(matches.li,args.li,"like");
    }
    if (!jsr_is_empty(args.nl)){
        matches.nl = {};
        jsr_build_codition_type(matches.nl,args.nl,"like");
    }
    if (!jsr_is_empty(args.in)){
        matches.in = {};
        jsr_build_codition_type(matches.in,args.in);
    }
    if (!jsr_is_empty(args.ni)){
        matches.ni = {};
        jsr_build_codition_type(matches.ni,args.ni);
    }
    if (!jsr_is_empty(args.gt)){
        matches.gt = {};
        jsr_build_codition_type(matches.gt,args.gt);
    }
    if (!jsr_is_empty(args.ge)){
        matches.ge = {};
        jsr_build_codition_type(matches.ge,args.ge);
    }
    if (!jsr_is_empty(args.lt)){
        matches.lt = {};
        jsr_build_codition_type(matches.lt,args.lt);
    }
    if (!jsr_is_empty(args.le)){
        matches.le = {};
        jsr_build_codition_type(matches.le,args.le);
    }
    if (!jsr_is_empty(matches)){
        plugin.condition = {};
        if (!jsr_is_empty(args.type)){
            plugin.condition.type = args.type;
        }
        plugin.condition.matches = matches;
    }
    return plugin;
}

function jsr_build_get(jsr_get_args){
    jsr_check_empty(jsr_get_args.classes,"the prop classes is required");
    jsr_check_empty(jsr_get_args.name,"the prop name is required");
    let get = {
        relation:{
            classes:jsr_get_args.classes
        }
    };
    if (!jsr_is_empty(jsr_get_args.fields)){
        get.fields = jsr_get_args.fields;
    }
    if (!jsr_is_empty(jsr_get_args.profile)){
        get.profile = jsr_get_args.profile;
    }
    if (jsr_get_args.isGroupShow){
        get.isGroupShow = jsr_get_args.isGroupShow;
    }
    if (!jsr_is_empty(jsr_get_args.relations)){
        get.relation.condition = {};
        get.relation.condition.matches = jsr_get_args.relations;
    }
    if (!jsr_is_empty(jsr_get_args.joins)){
        get.joins = jsr_get_args.joins;
    }
    if (!jsr_is_empty(jsr_get_args.page)){
        get.page = jsr_get_args.page;
    }
    return jsr_build_condition(jsr_get_args,get);
}

function jsr_build_add(jsr_a_args){
    jsr_check_empty(jsr_a_args.class,"the prop class is required");
    jsr_check_empty(jsr_a_args.name,"the prop name is required");
    let add = {
        class:jsr_a_args.class,
        datas:jsr_a_args.datas
    };
    if (!jsr_is_empty(jsr_a_args.def)){
        add.defaults = jsr_a_args.def;
    }
    if (!jsr_is_empty(jsr_a_args.uuid)){
        add.uuid = jsr_a_args.uuid;
    }
    if (!jsr_is_empty(jsr_a_args.calculate)){
        add.calculate = jsr_a_args.calculate;
    }
    if (!jsr_is_empty(jsr_a_args.ternary)){
        add.ternary = jsr_a_args.ternary;
    }
    return add;
}

function jsr_build_edit(jsr_e_args){
    jsr_check_empty(jsr_e_args.class,"the prop class is required");
    jsr_check_empty(jsr_e_args.name,"the prop name is required");
    let edit = {
        class:jsr_e_args.class,
        set:jsr_e_args.set
    };
    return jsr_build_condition(jsr_e_args,edit);
}

function jsr_build_delete(jsr_d_args){
    jsr_check_empty(jsr_d_args.class,"the prop class is required");
    jsr_check_empty(jsr_d_args.name,"the prop name is required");
    let del = {
        class:jsr_d_args.class
    };
    if (jsr_d_args.isDeleteAll){
        del.isDeleteAll = jsr_d_args.isDeleteAll;
    }
    return jsr_build_condition(jsr_d_args,del);;
}

function jsr_check_empty(required,msg){
    if (jsr_is_empty(required)){
        throw new Error(msg);
    }
}

function jsr_is_empty(v){
    if (v==null){
        return true;
    }
    if (typeof v === 'number'){
        return false;
    }
    if (typeof v === 'string' && v.trim().length===0){
        return true;
    }
    for(let k in v) {
        return false;
    }
    return true;
}