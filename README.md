# json-script-rule-jar #

#### 介绍
**json script rule**，是一个可以直接利用json脚本进行后台crud操作的插件，类似一款低码插件，依赖此插件可在前端请求时在其请求体中使用json格式并按照指定规则写法进行描述便可做到免后台接口开发，也就是后端不需要再写任何接口便能将数据直接返回给前端，高效开发项目。
目前插件支持 **mysql,postgresql(包括kingbase),oracle** 数据库  
此外支持 **可扩展定制规则，sql层支持函数，分组，关联，逻辑和视图查询**等等，可满足绝大部分的需要  
目前只有我一个人做架构，设计，开发，测试，因此如果有未想到的功能请及时与我联系或留言
##### 优点
1. 可以不用写接口，直接通过引擎解析json进而将数据返回给前端
2. 项目上线后可以直接通过更改前端请求的json参数进行功能层面的调整，无需改接口，打包，部署等
3. 高复用代码结构，减少项目中代码量，轻量级实现
3. 简易开发，可通过插件提供的注解，接口，工具类，配置信息等快速对插件功能进行自定义开发，配置相关信息可参考edi.rule.config.JSRuleProperties类
4. 支持扩展，如模型扩展，处理器扩展，提供多个可实现的接口和继承类，可从各个层面进行切入处理
5. 采用分离式设计，不依赖于主项目的配置，如mybatis配置sqlSessionFactory，对应插件pagehelper等，插件拥有自己的配置属性，例如mybatis的mapperLocation，pagehelper的pageSizeZero属性等，如果你的主项目上的pagehelper设置了自己的属性，你也可以在插件的rule.properties文件中定义插件的pagehelper属性，两者分离互不影响(无论是在pom中用starter还是单独的包或是代码中实现的配置，几种方式均适用)
6. 插件会引用主项目上包的版本，不会过多的引入新的包，如果主项目中未引用依赖，插件会引用自身定义的依赖，其依赖说明在下面会提到
7. 插件支持自定义规则，可将固定逻辑的代码植入规则中，在前端传入指定标识后将会顺序的触发这些规则
8. 日志处理的相对细致，对于操作或代码层面的错误能够快速定位问题
9. 采用以空间换时间的方式对于一些性能做了些相应的处理
10. 支持mysql,postgresql(包括kingbase),oracle数据库，支持函数，分组，关联，逻辑和视图查询等  
11. 不依赖于主项目的架构，如主项目用的是jpa，插件用的是mybatis，则互不影响
12. 支持加密处理，目前仅支持国密sm2非对称性加密(集成hutool包处理)
13. 有效的安全性处理，杜绝sql注入等
##### 缺点
1. 进阶功能需要花费一定的学习成本，如json脚本的语法规则，自定义模型，自定义处理器，视图，指令操作等
2. 仅支持post请求
3. 仅支持单数据源(目前主流的架构其实也不推荐一个模块多数据源)
4. 目前仅测试了spring-boot-starter-web(webmvc)，对于webflux尚未考虑
#### 关键依赖说明
**spring-boot-dependencies version 2.6.4**  
**mybatis.starter version 2.2.2**  
**mysql.connector versoin 8.0.29**  
**druid-spring-boot-starter version 1.1.22**  
**lombok-maven-plugin version 1.18.12.0**
#### 安装教程

1.  在你的项目中添加此插件的jar包，外部jar包或将jar包放入maven本地仓库中并引用依赖
```
<dependency>
	<groupId>edi.zs</groupId>
	<artifactId>rule</artifactId>
	<version>0.0.1-SNAPSHOT</version>
</dependency>
```  
目前版本仍处于测试阶段，但基本功能已经稳定
2.  在resource目录下创建META-INF文件夹，在其中创建spring.factories文件
(这里是按照spring创建starter的步骤创建插件的starter)  
在文件内容中增加一行代码:**org.springframework.boot.autoconfigure.EnableAutoConfiguration=\edi.rule.config.JSRuleStarterConfig**
3.  在resource目录下创建rule.properties文件，这个是配置文件，需要配置po类的包所在的位置 
js.rule.mapping.classes.location=test.po  
此处的test.po类似于mybatis中的po类，**是与数据库表进行关联映射的类包的位置**
#### 使用说明
由于插件的功能比较多，此处只简单说明最基本的用法，之后将会推出更为详细的文档说明和博客  
1. 配置po类，示例如下  
<pre>
@JSRuleRelationTable(tableName= "zs_test")
@Data
public class ZsTestPO {

	@JSRuleRelationField(pk=true)
	private String id;
	private String name;
	@JSRuleRelationField(fieldName= " create_date ")
	private Date create_date;
	@JSRuleRelationField(fieldName= "birth_day")
	private Date birthDay;
	private double salary;
	private String remark;
	private double bonus;
	@JSRuleRelationField(fieldName= "test_field",alias="asddsa")
	private String test_field;
	@JSRuleRelationField(fieldName= "sum1_salary",alias="lbv_salary")
	private String sumSalary;
	@JSRuleRelationField(fieldName= "qian")
	private String qian;
}
</pre>
<pre>
@JSRuleRelationTable(tableName="zs_test_son1")
public class ZsTestUpdate {

	@JSRuleRelationField(pk=true)
	public String id;
	@JSRuleRelationField(fieldName= "zs_test_id",fk="ZsTestPO")
	public String zs_test_id;
	@JSRuleRelationField(fieldName= "oh_no")
	public String ohNo;
	public double qian;
	public String test_field;
	@JSRuleRelationField(fieldName= "zs_test_son2_id")
	public String zs_test_son2_id;
}
</pre>
####参数说明：  
pk：设置主键  
fk：设置外键，这里的值对应的是**类的名字**,其路径是在 **js.rule.mapping.classes.location** 属性所配置的路径下的位置开始，如果有包名则加上包名(**位置依旧以属性配置的路径开始**)，例如xx.ZsTestPO  
fieldName：表示对应数据库的表字段名,如果没有配置则默认认为java字段名即为数据库表字段名  
alias：表示数据库表字段的别名，如果设置了则会以别名的形式返回给前端  
**备注**：配置类中不需要get/set方法  
2. 启动本地项目，用postman进行测试  
<pre>http://localhost:8012/api/js/rule/engine/start</pre>
（注：/api是context-path配置，没有则不写，后面的/js/rule/engine/start是固定的路径，也可以自定义，参考配置文件属性）  
<pre>
18:05:17.802 [main] INFO  e.r.f.s.s.JSRuleCache - [initCache,75] - init JSRuleCache
18:05:18.007 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,67] - IJSRuleProcessor=edi.rule.processor.JSRuleJsonProcessor
18:05:18.007 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,68] - mapperType=edi.rule.frame.mybatis.dao.MapperForMysql
18:05:18.008 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,69] - mappingClasses=test.po
18:05:19.794 [main] INFO  o.a.c.h.Http11NioProtocol - [log,173] - Starting ProtocolHandler ["http-nio-8012"]
</pre>
3. 通过postman请求接口，json如下  
<pre>
{
    "rule": {
        "name": "zssz",
        "actions": [
        	{
                "relations": {"classNames":[
                   "ZsTestPO","ZsTestUpdate"
                ]},
                "name": "test_db",
                "get": {
                	"page":{"pageNum":"1","pageSize":"0"}
                }
            }
        ]
    }
}
</pre>
<pre>
{
    "code": "200",
    "msg": "操作成功",
    "result": {
        "num": 0,
        "engineResult": {
            "action->test_db": {
                "pageNum": 1,
                "pageSize": 0,
                "totalPage": 0,
                "totalCount": 1,
                "datas": [
                    {
                        "ZsTestPO": {
                            "birthDay": "2021-10-07T16:00:00.000+0000",
                            "bonus": 110,
                            "name": "xxx",
                            "asddsa": "oiu",
                            "remark": "07d25ab8d87642839ebfb0265974f558",
                            "id": "2d634363d5ac40d18ab6af1188b624f5",
                            "create_date": "2021-10-07T16:00:00.000+0000",
                            "salary": 23
                        },
                        "ZsTestUpdate": {
                            "qian": 11,
                            "test_field": "aa",
                            "zs_test_son2_id": "dd",
                            "zs_test_id": "2d634363d5ac40d18ab6af1188b624f5",
                            "id": "asddsa",
                            "ohNo": "www"
                        }
                    }
                ]
            }
        }
    },
    "log": null
}
</pre>
####参数说明：  

1.  relations：表示关联的类的相关信息
2.  name：rule的name以及action的name均为唯一标识
3.  get：表示此次操作为查询动作


