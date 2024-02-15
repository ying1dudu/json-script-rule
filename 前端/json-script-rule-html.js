/******************************************************************** */
/* the start arguments for example
const jsr_all_args = {
    params:{}                          //所有启动参数都支持的属性，表示业务参数，非插件模型参数，当有多个请求action时，会合并所有action里的params属性
}
const jsr_g_args = [{
    label:'',
    name:'',
    classes:[],
    isGroupShow:false,
    profile:{},
    fields:[],
    type:"and",
    page:{pageNum:1,pageSize:10}
}]
const jsr_a_args = [{
    plugin:'',
    name:'',
    class:'',
    uuid:[],
    def:{},
    datas:[]
}]
const jsr_e_args = [{
    label:'',
    name:'',
    class:'',
    type:"or"
}]
const jsr_d_args = [{
    label:'',
    name:'',
    class:'',
    type:"or",
    isDeleteAll:false
}]
*/

const jsr_base_configs = {
    get_label:"jsr-g",
    add_label:"jsr-a",
    edit_label:"jsr-e",
    delete_label:"jsr-d",
    collect_label:"input"
}

const jsr_condition = {
    eq:"eq",
    ne:"ne",
    li:"li",
    nl:"nl",
    gt:"gt",
    ge:"ge",
    lt:"lt",
    le:"le",
    in:"in",
    ni:"ni"
}

const jsr_configs = {
    url:"/json/script/start",
    get_label:{
        condition:{
            field:jsr_base_configs.get_label+"-c-f",
            type:jsr_base_configs.get_label+"-c-t",
            bracket:jsr_base_configs.get_label+"-c-b",
            level:jsr_base_configs.get_label+"-c-l"
        }
    },
    add_label:{
    },
    edit_label:{
        set:jsr_base_configs.edit_label+"-s",
        condition:{
            field:jsr_base_configs.edit_label+"-c-f",
            type:jsr_base_configs.edit_label+"-c-t",
            bracket:jsr_base_configs.edit_label+"-c-b",
            level:jsr_base_configs.edit_label+"-c-l"
        }
    },
    delete_label:{
        condition:{
            field:jsr_base_configs.delete_label+"-c-f",
            type:jsr_base_configs.delete_label+"-c-t",
            bracket:jsr_base_configs.delete_label+"-c-b",
            level:jsr_base_configs.delete_label+"-c-l"
        }
    }
}

function jsr_start_body(body,baseUrl){
    if ($.isEmptyObject(baseUrl)){
        throw new Error("the baseUrl is required");
    }
    $.ajax({
        url:baseUrl+jsr_configs.url,
        method:"post",
        data:JSON.stringify(body),
        dataType: "json",
        contentType:"application/json;charset=utf-8",
        success:function(res){
            jsr_result(res);
        },
        error:function(error){
            console.log(error);
            throw new Error("json script rule exception:you can also check the background of the logs!");
        }
    })
}

function jsr_start_args(args){
    jsr_start_body(jsr_build_body(args));
}

function jsr_build_body(args){
    if (!$.isEmptyObject(args)){
        let body = {
            params:{},
            rule:{
                actions:[]
            }
        };
        $.each(args,function(i,v){
            if (!$.isEmptyObject(v.params)){
                body.params = v.params;
            }
            if (jsr_base_configs.get_label==v.label){
                body.rule.actions.push({
                    name:v.name,
                    get:jsr_g_collect(v)
                });
            }else if (jsr_base_configs.edit_label==v.label){
                body.rule.actions.push({
                    name:v.name,
                    edit:jsr_e_collect(v)
                });
            }else if (jsr_base_configs.delete_label==v.label){
                body.rule.actions.push({
                    name:v.name,
                    delete:jsr_d_collect(v)
                });
            }else {
                if (!$.isEmptyObject(v.plugin)){
                    if (v.plugin=='add'){
                        body.rule.actions.push({
                            name:v.name,
                            add:jsr_a_collect(v)
                        });
                    }
                }else{
                    throw new Error("unknown plugin");
                }
            }
        });
        return body;
    }else{
        throw new Error("the start params is required");
    }
}

function jsr_collect(label,name){
    let collects = $(jsr_base_configs.collect_label+"["+label+"='"+name+"']");
    if (collects.length==0){
        throw new Error("no elements->label:"+label+"name:"+name);
    }
    return collects;
}

function jsr_build_condition(label,name,plugin,type,field,level,bracket,relation){
    let matches = [];
    $.each(jsr_collect(label,name),function(i,e){
        jsr_crud_check(this);
        if (!jsr_crud_filter(this)){
            return true;
        }
        let c_field = this.getAttribute(field);
        if ($.isEmptyObject(c_field)){
            return true;
        }
        let c_type = this.getAttribute(type);
        if ($.isEmptyObject(c_type)){
            c_type = jsr_condition.eq;
        }
        let matcher = {};
        let b_num = 0;
        let c_level = this.getAttribute(level);
        if (!$.isEmptyObject(c_level)){
            b_num = c_level-1;
        }
        if ($.isEmptyObject(matches[b_num])){
            matches[b_num] = {};
        }
        let c_bracket = this.getAttribute(bracket);
        if (!$.isEmptyObject(c_bracket)){
            if ($.isEmptyObject(matches[b_num].bracket)){
                matches[b_num].bracket = [];
            }
            if ($.isEmptyObject(matches[b_num].bracket[c_bracket-1])){
                matches[b_num].bracket[c_bracket-1] = {};
            }
            matcher = matches[b_num].bracket[c_bracket-1];
        }else{
            matcher = matches[b_num];
        }
        if (jsr_condition.eq==c_type){
            if ($.isEmptyObject(matcher.equal)){
                matcher.equal = {};
            }
            if ($.isEmptyObject(matcher.equal[c_field])){
                matcher.equal[c_field] = [];
            }
            matcher.equal[c_field].push(this.value);
        }else if (jsr_condition.ne==c_type){
            if ($.isEmptyObject(matcher.notEqual)){
                matcher.notEqual = {};
            }
            if ($.isEmptyObject(matcher.notEqual[c_field])){
                matcher.notEqual[c_field] = [];
            }
            matcher.notEqual[c_field].push(this.value);
        }else if (jsr_condition.li==c_type){
            if ($.isEmptyObject(matcher.like)){
                matcher.like = {};
            }
            if ($.isEmptyObject(matcher.like[c_field])){
                matcher.like[c_field] = [];
            }
            matcher.like[c_field].push(this.value);
        }else if (jsr_condition.nl==c_type){
            if ($.isEmptyObject(matcher.notLike)){
                matcher.notLike = {};
            }
            if ($.isEmptyObject(matcher.notLike[c_field])){
                matcher.notLike[c_field] = [];
            }
            matcher.notLike[c_field].push(this.value);
        }else if (jsr_condition.in==c_type){
            if ($.isEmptyObject(matcher.in)){
                matcher.in = {};
            }
            if ($.isEmptyObject(matcher.in[c_field])){
                matcher.in[c_field] = [];
            }
            matcher.in[c_field].push(this.value);
        }else if (jsr_condition.ni==c_type){
            if ($.isEmptyObject(matcher.notIn)){
                matcher.notIn = {};
            }
            if ($.isEmptyObject(matcher.notIn[c_field])){
                matcher.notIn[c_field] = [];
            }
            matcher.notIn[c_field].push(this.value);
        }else if (jsr_condition.gt==c_type){
            if ($.isEmptyObject(matcher.gt)){
                matcher.gt = {};
            }
            matcher.gt[c_field] = this.value;
        }else if (jsr_condition.ge==c_type){
            if ($.isEmptyObject(matcher.ge)){
                matcher.ge = {};
            }
            matcher.ge[c_field] = this.value;
        }else if (jsr_condition.lt==c_type){
            if ($.isEmptyObject(matcher.lt)){
                matcher.lt = {};
            }
            matcher.lt[c_field] = this.value;
        }else if (jsr_condition.le==c_type){
            if ($.isEmptyObject(matcher.le)){
                matcher.le = {};
            }
            matcher.le[c_field] = this.value;
        }else{
            throw new Error("unknown condition type->"+type);
        }
    });
    if (!$.isEmptyObject(matches)){
        plugin.condition = {};
        plugin.condition.type = $.isEmptyObject(relation)?"and":relation;
        let new_matches = {};
        let size = matches.length;
        for (let i=size;i>0;i--){
            if (!$.isEmptyObject(new_matches)){
                if ($.isEmptyObject(matches[i-1].bracket)){
                    matches[i-1].bracket = [];
                }
                matches[i-1].bracket.push(new_matches);
            }
            new_matches = matches[i-1];
        }
        plugin.condition.matches = new_matches;
    }
}

function jsr_g_collect(jsr_g_args){
    jsr_check_empty(jsr_g_args.classes,"the prop classes is required");
    let get = {
        relation:{
            classes:jsr_g_args.classes
        }
    };
    jsr_build_condition(jsr_base_configs.get_label,jsr_g_args.name,get,jsr_configs.get_label.condition.type,
        jsr_configs.get_label.condition.field,jsr_configs.get_label.condition.level,
        jsr_configs.get_label.condition.bracket,jsr_g_args.type);
    if (!$.isEmptyObject(jsr_g_args.fields)){
        get.fields = jsr_g_args.fields;
    }
    if (!$.isEmptyObject(jsr_g_args.page)){
        get.page = jsr_g_args.page;
    }
    return get;
}

function jsr_a_collect(jsr_a_args){
    jsr_check_empty(jsr_a_args.class,"the prop class is required");
    jsr_check_empty(jsr_a_args.datas,"the prop datas is required");
    let add = {
        class:jsr_a_args.class,
        datas:jsr_a_args.datas
    };
    if (!$.isEmptyObject(jsr_a_args.def)){
        add.defaults = jsr_a_args.def;
    }
    if (!$.isEmptyObject(jsr_a_args.uuid)){
        add.uuid = jsr_a_args.uuid;
    }
    return add;
}

function jsr_e_collect(jsr_e_args){
    jsr_check_empty(jsr_e_args.class,"the prop class is required");
    let edit = {
        class:jsr_e_args.class,
        set:{}
    };
    jsr_build_condition(jsr_base_configs.edit_label,jsr_e_args.name,edit,jsr_configs.edit_label.condition.type,
        jsr_configs.edit_label.condition.field,jsr_configs.edit_label.condition.level,
        jsr_configs.edit_label.condition.bracket,jsr_e_args.type);
    $(jsr_base_configs.collect_label+"["+jsr_base_configs.edit_label+"='"+jsr_e_args.name+"']["+jsr_configs.edit_label.set+"]").each(
        function(i,e){
        let setField = this.getAttribute(jsr_configs.edit_label.set);
        edit.set[setField] = this.value;
    });
    return edit;
}

function jsr_d_collect(jsr_d_args){
    jsr_check_empty(jsr_d_args.class,"the prop class is required");
    let dele = {
        class:jsr_d_args.class
    };
    jsr_build_condition(jsr_base_configs.delete_label,jsr_d_args.name,dele,jsr_configs.delete_label.condition.type,
        jsr_configs.delete_label.condition.field,jsr_configs.delete_label.condition.level,
        jsr_configs.delete_label.condition.bracket,jsr_d_args.type);
    if (jsr_d_args.isDeleteAll){
        dele.isDeleteAll = jsr_d_args.isDeleteAll
    }
    return dele;
}

function jsr_crud_check(ele,labels){
    if (ele.value.indexOf("'")!=-1){
        throw new Error("Illegal character->'");
    }
    $.each(labels,function(i,e){
        if ($.isEmptyObject(ele.getAttribute(e))){
            throw new Error(e+" is required");
        }
    });
}

function jsr_crud_filter(ele){
    if ($.isEmptyObject(ele.value) || (ele.getAttribute("type")=="radio" && ele.checked==false)){
        return false;
    }
    return true;
}

function jsr_check_empty(required,msg){
    if ($.isEmptyObject(required)){
        throw new Error(msg);
    }
}

function jsr_test(args){
    console.log(jsr_build_body(args));
}