## 简介
### 前言
该项目是一款低代码设计框架，项目开始于2021年12月份，并在2023年4月份第一次在github上发布，与此同时同步到远程maven仓库之中。在经历近一年的迭代后，如今该框架已经趋于成熟，准备从2024年2月份开始在github上更新后续的版本。目前较为稳定的版本为4.4和5.0，4.4版本主要用于java 8以及tomcat9版本以下的项目，5.0则是java 8和tomcat10版本以上的项目，两个版本唯一的差异仅仅是对tomcat以及jdk不同版本的支持。

### 介绍
json-script-rule是一款**低代码设计框架**，之所以说它是设计框架，是因为它更倾向于程序的设计和拆分，**通过将一些通用的程序片段封装成插件，之后再对它们进行调用来实现一些较为复杂的应用场景，封装是在后端实现的，而调用方则不确定，有可能是前端，也有可能是其它应用服务。调用方式为json脚本，在json字符串中输入各种参数指令并发送给后端插件处理，整个调用过程感觉起来有些类似命令式编程，而这也是它与众不同的地方**。不过要实现这种令人耳目一新的开发模式不仅需要借助这款应用框架，还需要开发者拥有一定抽象设计插件的能力，能够将一些代码片段合理的设计并封装起来，最后通过协调多个代码片段来完成各种不同的功能。

要想了解json-script-rule这款应用框架首先需要了解两个重要的思想，如下
- **脚本调用：**是指后端的java代码片段由调用者通过json脚本指令来调用。
- **面向规则：**面向规则编程其实是一种编程思想，开发者需要提前将一些代码片段抽象设计成单独的插件提供给调用者来应对各种不同的需求，最终实现命令式开发的风格。

### 优势
相比较于传统的开发模式，json-script-rule这种应用框架有如下九大优势
1. 跨应用：它独立于项目应用框架，如你的项目orm框架无论采用的是jpa或者mybatis又或者是hibernate相互之间都不会受到任何影响。
2. 低代码：与传统开发不同，它采用的是命令式编程思想，因此开发一个功能往往只需要几秒钟，所以无论是在开发效率上还是使用上都优于传统开发模式，不限于代码的可读性和可扩展性。
3. 免发布：新增或修改功能时只需要调整json字符串指令即可，因此改动是在调用端而非封装插件的服务端，因此也就不需要发布了
4. 跨项目：插件的封装设计通常基于实际的业务场景，因此插件的设计应该是具有通用性的，不拘泥于某一个项目的，借助这款应用框架，任何一个开发者都可以将自己封装的插件开源给其它项目使用，所需要做的仅仅只是写一个java类。
5. 轻量级：因为是低代码开发，因此它不会像传统的开发模式那样生成po vo dto，甚至包括mapper mapstruct等大量的无关紧要的代码，这会让我们的应用程序变得简单以及轻量级。
6. 低耦合：插件不耦合于你项目中的业务代码，你可以把它看作是一个外部插件，因此这些外部插件可随时插拔，且这些插件可以由你来自定义开发。
7. 重设计：json-script-rule是一款程序设计框架，它能够帮助开发者提高代码的质量，简化业务的复杂性，增强开发者的抽象思维，一劳永逸的解决项目上的问题。
8. 功能全：框架内置了很多功能，如查询，修改，增加，删除，导入，导出，加密，签名，数据脱敏，日志国际化，RPC调用，自定义开发组件等等，除此之外，后续还会不断推出新的功能和插件，为开发者提供便捷的开发方式，为企业降本增效。
9. 跨语言：由于插件的调用方可以是任何使用json的应用端，因此不仅是前端开发者，其它语言的应用者也可以使用json脚本去调用，返回的json结果中包含了日志，可以通过日志了解插件的调用情况。如果你是一名前端开发者，利用这些封装好的插件可以减少与后端人员的沟通成本，让一名前端开发者成为一名全栈开发者。

### 缺点
1. 仅支持单数据源，多数据源下只能指定一个数据源
2. 采用空间换时间，项目启动后会占用一少部分的内存空间
3. 自定义插件的设计较为复杂，需要开发者有一定的抽象分析能力

### 说明
为了能够更全面的展示json-script-rule的魅力，接下来用一些常用的内置插件来进行说明，比如crud插件。目前支持的数据库有mysql，oracle，postgresql，**由于这些crud插件的本质是拼装sql语句**，因此支持这些数据库语法的数据库理论上也同样可以得到支持，例如支持mysql语法的tidb，doris等，例如支持postgresql语法的kingbase等

### 依赖
**springboot**
**lombok**

### 安装
1. 引入依赖(jdk8，tomcat10版本以下，对应版本为4.4，jdk8，tomcat10版本以上，对应版本为5.0)
```
<dependency>
    <groupId>io.github.ying1dudu</groupId>
    <artifactId>json-script-rule-spring-boot-starter</artifactId>
    <version>5.0</version>
</dependency>
```
**提示：**如果maven无法下载或想体验抢先版本的则可以直接到插件地址下载jar包并放入本地maven库里，这里面还包括了前端json-script-rule.js文件以及postman测试脚本、导入导出模板参考用例等等
**地址：**：https://gitee.com/ying1dudu/json-script-rule-jar.git
### 配置
1. **如果你不使用框架内置的crud插件功能（包括引用crud插件的导入导出和主子表插件），那么此步可以跳过**
application中配置实体类包的根目录，属性为locations(3.2.4版本以后支持多路径扫描，多个用逗号分割)，如下
```
edi:
  rule:
    locations: package.package
```
**注意：**如果模块不使用数据库，在application没有配置spring.dataSource的情况下，需要排除自动配置类，如
```
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
```
或者
```
spring:
  autoconfigure:
     exclude: org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```
**注意：**locations可以指向一个或多个目录，尽量避免多个根目录下含有相同的包名+类名，如果无法避免直接类名冲突，则需要写上类的全限定名，否则只能使用直接类名，且该根目录下还可以创建子目录，子目录的实体类需要在使用时加上包名的前缀，如下。

```
{
    ......
    "relation":{
        "classes":["包名.ZsTestPO"]
    }
}
```
**提示：如果当前配置文件中配置了spring.profiles.active属性，则子application将会覆盖父application属性**
### 使用
为了演示说明，因此在下面的例子中故意加了很多不规范的代码命名，例如多加了几个空格，下划线等
1. 配置两个实体类，示例如下
```
@JSRuleTable(name= "zs_test")
public class ZsTestPO {
	@JSRuleField(pk=true)
	private String id;
	private String name;
	@JSRuleField(name= " create_date ")
	private Date create_date;
	@JSRuleField(name= "birth_day")
	private Date birthDay;
	@JSRuleField(name= "salary",alias="dian")
	private double salary;
}
```
```
@JSRuleTable(name="zs_test_son2")
public class ZsTestSon2 {
	@JSRuleField(pk=true)
	public String id;
	@JSRuleField(name= "zs_test_id",fk="ZsTestPO")
	public String zs_test_id;
}
```
**提示：进行crud操作时所有的json脚本所面向的均是后端的java类而非数据库表**，因此尽管表里有10个字段，但在实体类里只配置了8个字段，那么最终就只能使用这8个字段。此外允许冗余字段存在，不参与crud操作的字段可通过JSRuleCrudField注解中的ignore属性来对其忽略处理

**从4.0版本开始要求开发者考虑插件权限的控制**，这里为了演示直接重写插件权限方法并返回true，如下(详情可参考自定义开发篇以及权限篇的说明)
```
public class JSRuleGetCustomModel extends JSRuleGet<MyActions>{
	@Override
	public boolean isOwner(Map<String,Object> params,Set<String> roles) {
		return true;
	}
}
```
最后还需要定义一个Action仓库，用于装载所有自定义的插件，这里需要在仓库类上加@Component注解将其注册成spring bean，代码如下
```
@Component
public class MyActions extends JSRuleAction<MyActions>{
	public JSRuleGetCustomModel get;
}
```
这里需要重写父类的get字段用来代替框架内置的get插件
### 配置参数说明
####JSRuleTable
- **name：**数据库表名
- **view：**视图的sql语句，该属性存在时name属性表示当前视图的别名
- **permit：**当前类所对应的表允许哪种crud操作，默认为允许全部操作
- **roles：**当前类所对应的表允许哪些角色进行crud操作，默认为允许所有角色
####JSRuleCrudField
- **pk：**设置主键，不支持复合主键，用于默认的表关联操作，非必要的
- **fk：**设置外键，值为**直接类名**，也就是**locations**属性所配置的根路径下的类名
- **name：**数据库表的字段名,默认为java字段名
- **alias：**数据库表字段的别名，如果设置了别名则字段会以别名返回
- **ignore：**忽略对该字段的crud缓存处理
- **imports：**使用导入插件时，设置默认的导入模板文件的标题行对应哪些表的字段名
- **exports：**使用导出插件时，在没有模板的情况下设置默认导出哪些列
- **dependent：**用于设置主子表的依赖关系，使用主子表时子表的字段值将从主表对应的字段中获得
2. 启动本地应用，并使用postman进行测试```http://localhost:port/context-path/json/script/start```
```
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,42] - action=test.rule.MyActions
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,47] - mapper=edi.rule.frame.mybatis.dao.MapperForMysql
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,49] - fields=test.rule.MyFields
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,50] - functions=test.rule.MyFunctions
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,51] - result=test.rule.TestJSResult
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,52] - handler=test.rule.RuleExtend
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,53] - locations=test.dao.po
18:57:57.683 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,54] - rootPath=/Users/jsrelandwind/Desktop/workspace/json-script-rule-testjsrelandwind/Desktop/workspace/json-script-rule-test
```
3. 通过postman请求接口，json如下  
```
{
    "actions": [
        {
            "name": "test_get",
            "get": {
                "relation": {
                    "classes":["ZsTestPO"]
                },
                "groupShow":true,
                "fields":["name","salary"],
                "condition":{
                    "where":{
                        "eq":{"name":["field value"]}
                    }
                }
            }
        }
    ]
}
```
### 请求参数说明
- **classes：**直接类名，表示访问哪些数据库表
- **name：**action的唯一标识，用于区分action执行后的返回结果，多个action之间不能重名
- **get：**框架内置的查询插件名称
- **where：**matches属性的别名，表示查询条件
- **fields：**表示所要查询的字段名数组，这些字段名是java类的字段名
- **groupShow：**多表联合查询时可通过该属性将两个表的数据分开显示，默认为false
返回结果如下
```
{
    "code": 200,
    "msg": "operation successfully",
    "result": {
        "test_get": {
            "pageNum": 1,
            "pageSize": 10,
            "dataSize": 1,
            "totalPage": 1,
            "totalCount": 1,
            "data": [
                {
                    "ZsTestPO": {
                        "name": "ccc",
                        "salary": 2200.00
                    }
                }
            ]
        }
    },
    "log": null
}
```
所解析的sql为
```
select name as "name" ,salary as "salary" from  zs_test  where zs_test.name='ccc'
```
****
**提示1：**json中的每一个属性都对应着edi.rule.model包下的类，如果你不清楚一些内置插件的指令，那么你可以通过这些对象来找到答案
**提示2：**由于orm采用的是mybatis，因此可以通过配置mybatis来打印sql，具体操作可以参考配置篇的说明。除此之外还可以通过将execute属性设置为false将sql返回到结果集中，也可以通过重写beforeSql方法来自定义逻辑
## 增，删，改
### add插件
下面是使用add插件进行插入数据的操作，第二个action使用查询插件查询是否插入成功
```
{
    "actions":[
        {
            "name":"addaction",
            "add":{
                "className":"ZsTestPO",
                "uuid":["id","remark"],
                "defaults":{"test_field":"nnnnnn"},
                "required":["test_field","create_date"],
                "calculate":{"salary:-<salary>+0.5*(-10*10)","bonus:<bonus>-100"},
                "data":[
                    {"name":"ccc","salary":22.50,"bonus":"110","birthDay":"2021/10/08","create_date":"2021-10-08"},
                    {"name":"mmm","salary":11.50,"bonus":120,"birthDay":"2021-02-03","create_date":"2021-02-03"}]
            }
        },{
            "name":"and query",
            "get":{
                "relation":{
                    "classes":["ZsTestPO"]
                },
		"condition":{
		    "type":"or",
                    "where":{
                        "eq":{"name":["ccc","mmm"]}
                    }
                }

            }
        }
    ]
}
```
这里为了演示因此json字符串看上去十分的复杂，但实际上这里只需要用到class属性以及data属性就可以完成一个简单的插入操作
#### 参数说明
- **class：**对应的实体类名，DML类型的操作只能针对一个表
- **uuid：**为哪些列生成uuid值
- **snowFlake：**雪花id
- **defaults：**数据列的默认值
- **required：**校验字段值是否存在，在defaults属性后执行
- **calculate：**计算字符串里的数学公式，<>符号里的字段为引用的字段变量值
###修改插件edit
下面是json用例，将ZsTestPO类对应的表字段name值更改为ppp，查询条件是name为aaa或mmm的数据
```
{
    "actions": [
        {
            "name": "editName",
            "edit": {
                "class":"ZsTestPO",
                "set": {
                    "name": "ppp"
                },
                "condition":{
                    "type": "or",
                    "matches": {
                        "eq": {
                            "name": ["aaa","mmm"]
                        }
                    }
                }
            }
        }
    ]
}
```
#### 参数说明
- **set：**和update语句中的set含义相同，其中key是列名，value是要修改的值
- **editAll：**是否忽略条件限制，允许修改全部数据，默认为false，为false时condition属性不能为空
json脚本在后台生成的sql如下
```
update zs_test set name='ppp' where name='aaa' or name='mmm'
```
返回的结果
```
{
    "code": 200,
    "msg": "operation successfully",
    "result": {
        "editName": 2
    },
    "log": null
}
```
### 删除插件delete
json用例
```
{
    "actions":[{
        "name":"deleteAction",
        "delete":{
            "class":"TestBank",
            "condition":{
                "where":{
                    "in":{"id":[303,306]}
                }
            }
        }
    }]
}
```
json指令在后台生成的sql如下
```
delete from t_bank where id in  ('303','306') 
```
返回的结果
```
{
    "code": 200,
    "msg": "operation successfully",
    "result": {
        "deleteAction": 0
    },
    "log": null
}
```
#### 参数说明
- **deleteAll：**是否忽略条件限制，允许删除全部数据，默认为false，为false时condition属性不能为空
## 普通查询
### get插件中的参数说明
#### condition
- **matches：**别名where，表示查询的具体条件
- **type：**表示多个条件之间的并和或关系，只允许and值或or值，默认为and
#### matches说明
所有的匹配条件属性均是有序的
- **eq：**表示等于（equal），代表"="符号
- **ne：**表示不等于（not equal），代表"!="符号
- **in：**表示in关键字，例如name in ('qqq','xxx')
- **ni：**表示not in
- **li：**表示like，可以手动将%符号加在前面或是后面
- **nl：**表示not like
- **gt：**表示大于，gt对应的字段值应该是最小的
- **ge：**表示大于等于
- **lt：**表示小于，lt对应的字段值应该是最大的
- **le：**表示小于等于
- **to：**用于子查询，视图等，例如in (select ......)
- **br：**bracket,用于处理条件之间并和或关系的转换
#### bracket说明
当and与or并行存在时会发生歧义，如A and B or C，它可以是(A and B) or C，或者A and (B or C)，为了支持这种sql场景的存在，这里可以使用bracket进行反转，bracket里面的条件之间的与或逻辑应该是相同的，而其外面的条件之间的与或逻辑应该全部是刚好相反的，以此类推，通过这种方式可以有效解决复杂条件之间的与或逻辑
#### relation
关联关系对象，单表或多表联查时均需要此对象，它表示表和表之间的关联关系，其中包含了如下3个属性
- **classes：**对应java类的名称，它是一个数组，允许查询多个表
- **joins：**表示此次查询采用join方式进行关联，是一个join对象数组，数组中每一个join对象表示一个要加入join查询的表，值得注意的是当该属性存在时，classes属性数组中理应只有1个class对象表示主表，如A left join B，A即是主表
**join**：该对象里的class属性表示待加入外连接查询的子表。type属性的值仅可为inner、left、right，表示A和B之间采用的是inner join、left join还是right join进行外连接查询，默认为left。conditions属性表示A和B之间的关联条件，例如left join on ......，如果该属性不存在，则默认A和B之间采用实体类中配置的主外键进行关联
- **condition：**该属性为relation对象中的属性而非join对象中的属性，如果该属性为空则默认为实体类中配置的主外键进行关联，如果存在则以该对象作为关联条件对表进行关联，它等同于where后面的条件语句，它与joins属性中的condition属性不发生冲突，joins中的condition表示on，而relation中的condition则表示where，具体的关系可参考edi.rule.model.JSRuleRelations对象
**注意：**relation对象中的condition仅表示表和表之间的关联条件，它与get插件中的condition不发生冲突，get插件中的condition属性可以替代relation对象中的condition属性
#### union
对应数据库关键字union，它在get插件中是一个数组，表示可以union多个查询结果
- **type：**分为union和all两个属性，前者表示union，后者表示union all，默认为all属性
- **pointer：**表示一个点，这个点既可以是一个表，也可以是一个子查询，还可以是一个动态视图，总而言之它表示一个查询结果，在这里它表示的是所要union的一个查询结果，即A union B
**注意：**oracle数据库在使用union的时候如A union all B，如果A或B的结尾处有排序order语法，数据库便会抛出缺失右括号的bug
#### pointer
该属性表示一个查询结果集
- **class：**表示该结果集是一张表，对应的值为实体类的名字
- **action：**表示该结果集是一个sql语句，是在它前面执行过的action解析后的一个sql，该属性对应的是action的名字
- **view：**表示该结果集是一个视图，对应的值为视图的名字，即JSRuleTable注解中的name的值
#### profile对象
该属性用于一对多或多对一的查询，它有些类似mybatis的collection标签，通过它可以描述所查询的多个表之间的主子关系，其主子关系可以反转
- **cClass：**主表的类名，别名c，不可以为空
- **mClasses：**当前主表对应的子表的集合，别名m，为空时表示当前表在层级结构中为叶子结点
#### get中的其它属性
- **fields：**表示所要查询的字段，此参数为空时表示查询所有字段，如果一次请求中两个类含有相同的字段名，则需要加上类的前缀名加以区分
- **group：**分组对象，其中包含having和by两个属性，有序
- **order：**排序对象，包含排序字段以及排序方式（asc和desc），有序
- **convertSql：**是否根据json脚本来生成sql语句，默认是启用的，当你不需要系统来解析json脚本并生成sql语句时可将改属性设置为false
- **execute：**根据请求json生成的sql语句是否执行，默认为true，为false时将返回生成的sql语句，该属性通常用于子查询等不需要执行sql语句的场景
- **page：**分页对象，其属性有pageSize，dataSize(当前页数据数量)，pageNum，totalPage，totalCount
- **groupShow：**是否以分组的形式进行显示，默认为false，通常用于多表查询时区分字段属于哪个表
#### 用例1
```
{
    "actions": [
        {
            "name": "test_relation2",
            "get": {
                "relation": {
                    "classes":["bao.ZsTestMinor","ZsTestPO","ZsTestMinorSon"],
                    "condition":{
                        "type":"and",
                        "where":{
                            "eq":{"ZsTestPO.id":["#&bao.ZsTestMinor.zs_test_id"],"bao.ZsTestMinor.id":["#& ZsTestMinorSon.zs_test_minor_id"]}
                        }
                    }
                },
                "page":{"pageNum":1,"pageSize":4},
                "profile":{
                    "c":"ZsTestPO",
                    "m":[{
                        "c":"bao.ZsTestMinor",
                        "m":[{
                            "c":"ZsTestMinorSon"
                        }]
                    }]
                },
                "fields":["ZsTestMinorSon.id","ZsTestPO.id","bao.ZsTestMinor.id","bao.ZsTestMinor.zs_test_id","ZsTestPO.name"]
            }
        }
    ]
}
```
**注意：**使用profile对象时，fields属性中必须要包含**带前缀的类的主键字段**
#### 用例2
```
{
    "actions": [
        {
            "name": "test_relation",
            "define":{"viewParams":{"view.ZsTestView":["son1_1","%1%"]}},
            "get": {
                "relation": {
                    "classes":["ZsTestPO"],
                    "joins":[{
                        "class":"view.ZsTestView",
                        "type":"left",
                        "condition":{"where":{"eq":{"ZsTestPO.id":["#&view.ZsTestView.zs_test_id"]}}}
                    }]
                },
                "condition":{
                    "where":{
                        "eq":{"ZsTestPO.name":["ccc"]},
                        "gt":{"birthDay":"2021-02-02"}
                    }
                },
                "groupShow":true,
                "page":{"pageSize":0},
                "fields": ["#$sysdate()@asd","currentDate","view.ZsTestView.test_field","ZsTestPO.test_field","birthDay","create_date","ZsTestPO.id"]
            }
        }
    ]
}
```
后台生成出来的sql，如下
```
select sysdate() as "asd" ,current_date as "current_date" ,suibian.test_field as "view_ZsTestView-test_field" ,zs_test.test_field as "ZsTestPO-sum_test_field" ,birth_day as "birthDay" ,create_date as "create_date" ,zs_test.id as "ZsTestPO-id"  from  zs_test  left join  (select * from zs_test_son1 where oh_no='son1_1' and id like '%1%') suibian on zs_test.id=suibian.zs_test_id where zs_test.name='ccc' and birth_day>'2021-02-02'
```
**提示：**关于union，pointer等对象的使用将在高级查询的篇章中进行说明
## 高级查询
### 说明
json-script-rule内置的查询插件支持绝大部分的sql场景，包括left join，视图，函数，union，where，子查询，分组，排序等
下面列举一个用例，展示如何使用一个复杂的json查询指令，开发者可以通过对比解析后的sql来更好的理解它的使用
```
{
    "actions": [
        {
            "name": "test_function",
            "get": {
                "relation":{"classes":["ZsTestPO","ZsTestSon2"],
                    "condition":{
                        "where":{"eq":{"ZsTestPO.id":["#&ZsTestSon2.zs_test_id"]}}
                    }
                },
                "condition":{
                    "type":"or",
                    "matches":{
                        "br":[
                            {"br":[
                                    {"ge":{"ZsTestPO.bonus":"#$abs(&ZsTestPO.bonus)"}},
                                    {"eq":{"#$now()":["#&ZsTestPO.birthDay"],"#$substr(aaazzzb,3,3)":["zzz"],"test_field_a":["sss"]}}
                                ]
                            }
                        ]
                    }
                },
                "groupShow":true,
                "fields": ["#$substr(&ZsTestSon2.name,1,5)@qwe","#&currentDate@kkks","#$now()@now","#kow@ZsTestPO-id=mkjk",
                    "ZsTestPO.id","#&ZsTestPO.name@bieming"]
            }
        }
    ]
}
```
解析后的sql
```
select substr(zs_test_son2.name,'1','5') as "qwe" ,current_date as "kkks" ,now() as "now" ,'kow' as "ZsTestPO-id=mkjk" ,zs_test.id as "ZsTestPO-id" ,zs_test.name as "bieming"  from  zs_test_son2 , zs_test  where zs_test.id=zs_test_son2.zs_test_id and (((zs_test.bonus>=abs(zs_test.bonus) or now()=zs_test.birth_day  or  substr('aaazzzb','3','3')='zzz'  or  test_field_a='sss')))
```
### 查询表达式(R表达式)
3.0版本发布以后支持查询表达式语法，它使得开发者在进行复杂查询时更加容易的使用常量、字段、函数和别名，简化json指令的复杂性，目前查询表达式总共分为4种类型
- **常量：**语法为#xx，这里的xx为常量，解析时会在常量两边分别加上单引号
- **字段：**语法为#&xx，，这里的xx为字段名，字段应为实体类里所定义的字段，或是数据库函数字段
- **函数：**语法为#$xx(yy,zz,......)，xx为函数名，语法遵循数据库函数的语法，可嵌套使用，可自定义函数名称
- **别名：**语法为#......@xx，xx为别名，用于对常量、字段以及函数进行别名的处理
### 视图
视图是一个sql语句，可通过实体类上的@JSRuleTable注解中的view属性来实现，通常用于一个实体类映射多个表以及多个列的应用场景。当@JSRuleTable注解中的view属性不为空时表示当前实体类是一个视图类，此时name属性定义的是这个视图的别名而不是表的名字。
```
@JSRuleTable(name="view_test",view="select v.pid,c.name as cname,v.detail as name2 from json_test_category c,json_test_category_detail v " +
        "where c.id=v.pid and length(v.name) = ? and v.id = ?")
public class CategoryView {
    @JSRuleCrudField(fk="Category")
    private Long pid;
    @JSRuleCrudField(name="cname")
    private String name1;
    private String name2;
}
```
通过上面的例子可以看到view其实就是一个sql语句，上面的实体类中"view"属性里用到了?符号，它表示查询条件是不确定的，这个时候需要在json脚本中声明"vp"参数来对?符号的条件进行替换。
- **注意：**"view"属性中的字段的别名必须要与java字段能够对应上，例如上面的"cname"以及"name2"。
接下来用一个简单的例子来看看view是如何使用的
```
{
    "actions":[{
        "name":"get_test",
        "define":{
            "vp":{"CategoryView":["#$length(kkk)","4"]}
        },
        "get":{
            "relation":{
                "classes":["Category","CategoryView"]
            },
            "fields":["Category.id","name1","name2"],"execute":false
        }
    }]
}
```
- **viewParams：**别名是vp，map类型，key为视图的名字，value为要查询的条件，value可以是一个"R"表达式，数组大小需要与?符号数量相等
执行后的sql如下
```
select json_test_category.id as "Category-id" ,cname as "name1" ,name2 as "name2"  from  json_test_category , (select v.pid,c.name as cname,v.detail as name2 from json_test_category c,json_test_category_detail v where c.id=v.pid and length(v.name) = length('kkk') and v.id = '4') view_test where   json_test_category.id=view_test.pid
```
### 子查询
关于子查询可以先了解JSRuleToPointer以及JSRulePointer对象，JSRuleToPointer对象表示查询条件需要连接到某一个点才能完成，这个点就是JSRulePointer对象。JSRulePointer对象表示一个点，这个点可以是一个实体类，也可以是一个子查询的结果集，也就是执行get插件后的结果，又或是一个视图，因此它有如下3种属性
- **className：**该属性是某个实体类的名字，它最终将转化为一个表的名字，它不是一个结果集
- **action：**action的名字，它将获取一个action解析后的sql语句，因此这个action应该是已经执行过的，如果仅仅只是为了生成sql，此get插件中的execute属性应该设置为false，以避免多余的查询操作
- ** view：**视图的名字，也就是@JSRuleTable注解中的name属性，"view"属性可以指向当前"action"中定义的动态视图，也可以指向实体类上面的静态视图
下面看一个复杂的json例子，看看view，join，union是如何一起使用的
```
{
    "actions": [
        {
            "name": "poAction",
            "get": {
                "relation":{
                    "classes":["ZsTestPO"]
                },
                "execute":false,
                "fields":["id"]
            }
        },
        {
            "define":{
                "vp":{"view.ZsTestView":["#$substr(kkk,0,3)","#%1%"]}
            },
            "name": "test_view_left",
            "get": {
                "unions":[{
                    "type":"all","pointer":{"action":"poAction"}
                },{
                    "type":"all","pointer":{"view":"view.ZSTestUpdateSon"}
                }],
                "relation": {
                    "classes":["ZsTestPO"],
                    "joins":[{
                        "class":"view.ZSTestUpdateSon",
                        "condition":{
                            "type":"or",
                            "matches":{
                                "to":{
                                        "in":{
                                        "ZsTestPO.test_field":{"action":"poAction"},
                                        "view.ZSTestUpdateSon.id":{"view":"view.ZSTestSonSonView"}
                                    }
                                }
                            }
                        }
                    },{
                        "class":"view.ZsTestView"
                    }]
                },
                "condition":{
                    "type":"or",
                    "matches":{
                        "to":{
                                "in":{
                                "ZsTestPO.test_field":{"action":"poAction"},
                                "view.ZSTestUpdateSon.id":{"view":"view.ZSTestSonSonView"}
                            }
                        }
                    }
                },
                "fields":["ZsTestPO.id"],
                "page":{"pageNum":"1","pageSize":"10"}
            }
        }
    ]
}
```
生成的sql
```
(select zs_test.id as "ZsTestPO-id" from zs_test left join (select id from zs_test_son1_son1) zs_test_son1_son1 on zs_test.test_field in (select id as "id" from zs_test ) or zs_test_son1_son1.id in (select id from zs_test_son1_son1) left join (select * from zs_test_son1 where oh_no=substr('kkk','0','3') and id like '%1%') suibian on zs_test.id=suibian.zs_test_id where zs_test.test_field in (select id as "id" from zs_test ) or zs_test_son1_son1.id in (select id from zs_test_son1_son1) ) union all (select id as "id" from zs_test ) union all (select id from zs_test_son1_son1)
```
- **具体说明：**借助上面视图的例子，在matches(别名where)属性中有一个to的属性，该属性的类型是JSRuleToPointer，打开这个对象可以看到里面有很多类似matches对象的条件属性。以in属性为例进行说明，其LinkedHashMap的值对应的类型是JSRulePointer，key为字段名，如下
```
"to":{
        "in":{
        "ZsTestPO.test_field":{"action":"poAction"},
        "ZsTestPO.id":{"view":"view.ZsTestView"},
        "view.ZSTestUpdateSon.id":{"view":"view.ZSTestSonSonView"}
      }
}
```
解析后的sql为
```
zs_test.test_field in  (select test_field as "sum_test_field"  from  zs_test )  or zs_test.id in  (select zs_test_id from zs_test_son1 where oh_no=substr('kkk','0','3') and id like '%1%')  or zs_test_son1_son1.id in  (select id from zs_test_son1_son1) 
```
其中子查询是poAction执行后产生的sql语句嵌入到了当前的sql语句之中，可以通过json脚本以及sql的对比来理解内置插件的使用
****
**总结：**关于查询的说明到这里基本就结束了，关于unions的用法可以结合参数的说明以及本篇提到的子查询来理解其用法
## 配置说明
### 简述
本篇主要讲述spring的application文件的配置，与model包类型，配置文件也有一个相对应的类，它就是edi.rule.config.JSRuleProperties
###用例
```
spring:
  profiles:
    #active: mysql
edi:
  rule:
    locations: test.business.po
    #processor: test.myrule.JSRuleDBProcessor
    message: /rule-message/chinese.properties
    mybatis: /META-INF/rule-mybatis-config.xml
    http:
      #connectTimeout: 10000
      readTimeout: 10000
      headArgs: qweewq
      headSign: asddsa
      #engineControllerUrl: http://localhost:8012/api/json/script
    open:
      #replenishColumns: true
    #close:
      #engineController: true
      models: test.rule.JSRuleGetCustomModel
    config:
      dateFormat: yyyy-MM-dd HH:mm:ss,yyyy/MM/dd HH:mm:ss
      calculateScale: 2
      #calculateMode: 2
    #security:
      type: sm2
      publicKey: 04a14dd8d62e90d5cfd7b59ce89e346e0e7def05281361f7ef47676c1e534ca85b3d88839b02e9b57b2818f46beeea4eb88a3e5abe429d0e866ddea9c8c7756f7a
      privateKey: 00f8d5d53f123f1a001403a27acb16b8408dff48f249b2ed7d2429b3394628bc36
      #type: rsa
      #publicKey: MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+h70Xxu9L25Sw8M9nyw4g8d6YLD56RmiCrU4rnGamS9iESl69eSBBF2IR5gN+kBPSiQrq84JBLJ8K79GGrTKqoLjV816khut29tl8VtfUo+YZ8So4of2cGw5McvQ4j/JB4bjsohSjZWBBTCLPbAeu4QoLyvE1jVLleRyAUJxrQwIDAQAB
      #privateKey: MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAL6HvRfG70vblLDwz2fLDiDx3pgsPnpGaIKtTiucZqZL2IRKXr15IEEXYhHmA36QE9KJCurzgkEsnwrv0YatMqqguNXzXqSG63b22XxW19Sj5hnxKjih/ZwbDkxy9DiP8kHhuOyiFKNlYEFMIs9sB67hCgvK8TWNUuV5HIBQnGtDAgMBAAECgYA5p4qVYNn1qv8OIfipEF14o6g3hR/s0VR7wqSmdr/rL4VX1sdfb4FOoRxIjUFecYvGCDk5CrHONgn0fch6B/wN9qBk1Yjs/P0m74tVIL9tITm0l1YFkbU/mmaOQpCPA+qD6Y3EaGmvQfusq3TVKJzbJLuW6g23/NNiLk5/2BStKQJBAPOxDnvnEeMbEsNuqzsDlDVsBXlP+SsFZ88ZyIarxg3LWX04nW/WJ40A1iq7V79lOxJrnibTYz+Okbp+KGiRo7kCQQDIJ02IDtSzmYEdKmFrzfrHyCKW/lKZV2pOFUGdl/OIINsVL/9+yrPzcXnRp2I6JzCXDnsYu4OrZVGPgXVF1jzbAkEA5o7syjNLjBgQP5DUNmhjb8u8vhL5Bkf9+EZHn4qjPmfXSg8nfSkbkF9rQVCwa2fmZL4nCkrTSs2jeNNlfdHVGQJBAKRiazHghF7RJxKOGR8SN/JW89mxHKOmAMAKgy5seu4Flglrt1oqHutE+njvESSTxTt7ACyK7RQajYbgGzH1R1sCQQCylpMLxwL8PIPdlC5r5mwyHy5TsgkaU8Ft7ZBxFLu8cA0XyKfwNto2RrfVpPGvwc75KmOPQYS7fPKY7enYxRt0
      signKey: vvv
    poi:
      excel:
        importFilterEmptyRow: true
```
下面是application-mysql.yml
```
edi:
  rule:
    database: mysql
```
####说明
application-mysql.yml会覆盖掉application.yml已存在的配置
- **locations：**用于设置实体类的根路径，该属性可通过扩展类JSRuleDefaultExtend进行扩展，自3.2.4版本之后允许设置有多个路径，如果多个根路径下有相同的类名，则在使用json时应使用类全限定名
- **processor：**用于设置自定义处理类，可通过直接在类上加@Component注解来替代配置该属性
- **database：**目前支持的数据库分别是postgresql、mysql、oracle，kingbase，可选择对应的数据库类型，默认为mysql
- **mybatis：**框架内置mybatis配置文件的路径，根路径位于resources文件夹下，自定义mybatis-config.xml文件可覆盖框架内置的配置文件，你只需要将自定义文件放在resources路径下，并通过该属性来指向此文件的位置即可，文件内容可参考下面的
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org/DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
<!--        <setting name="logImpl" value="STDOUT_LOGGING"/>-->
        <setting name="callSettersOnNulls" value="true"/>
    </settings>
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
            <property name="pageSizeZero" value="true"/>
        </plugin>
    </plugins>
</configuration>
```
它看上去和我们平时使用的mybatis配置文件一模一样，甚至包括pageHelper插件，只不过这里配置的是框架内置的mybatis
- **message：**用于配制国际化文件，应用框架内置两种语言文件，分别为/rule-message/english.properties以及/rule-message/chinese.properties，默认为english，如果需要自定义日志的内容或语言可将后缀名为properties的文件放入resources目录下，并以/符号开头配置该属性指向自定义的国际化文件
- **dataSourceBean：**针对个别特殊情况下多数据源时指定其中一个数据源的场景，该值为最终指定的DataSource的spring bean的名称（4.0版本开始支持）
- **open.superProp：**配置实体类时如果实体类有父类，则是否将父类的字段一起加入到缓存中，默认为false
- **open.replenishColumns：**该配置只针对mysql数据库，它表示是否补全缺失的列为null值，mysql批量插入时如果行数据之间的列数不一致则将会导致数据库报错，配置为true则会保证数据列的一致性，缺失的列会以null的形式加入到行数据中，默认为false
- **close.engineController：**是否关闭内置Controller，默认false，表示开启，该属性可在自定义Controller后进行关闭，避免产生多个处理请求的接口
- **close.models：**用于禁用某些插件，当你认为某些插件不需要使用时可通过该属性来禁用，只需填入插件的全限定类名即可，多个插件可以用逗号进行分割，如下
```
edi:
  rule:
    close:
      models: test.business.rule.model.JSRuleGetCustomModel,edi.rule.model.JSRuleGet
```
- **config.dateFormat：**用于配置日期格式，凡是日期格式的字符串会在后端自动转化为日期类型进行处理，这包括插入数据时，查询日期区间时，以及断言里判断时间范围等，配置多个日期格式时需用逗号分割开，未配置该属性时则采用默认格式，系统默认日期格式如下
```
dateFormat: yyyy-MM-dd,yyyy-MM-dd HH:mm:ss
```
- **config.calculateScale：**使用add插件的calculate属性进行除法计算时默认保留的小数位
- **config.calculateMode：**使用add插件的calculate属性进行除法计算时默认的舍入方案，默认四舍五入
- **http.connectTimeout：**连接超时配置，参考SimpleClientHttpRequestFactory
- **http.readTimeout：**读取超时配置，参考SimpleClientHttpRequestFactory
- **http.headSign：**开启安全模式后请求时应携带签名文本，该属性为request请求头中签名文本的属性名，如果security.type属性不为空并且此次请求为request请求，则此时该属性不能为空
- **http.headArgs：**该属性为request请求头中全局参数的属性名，它是一个可转化为JSRuleGlobalArgs对象的json字符串，其中的sign属性代表签名文本，它可代替http.headSign的配置
- **poi.excel.importFilterEmptyRow：**在使用导入插件时是否启用过滤器，默认为false，过滤器只会对空的数据行进行过滤
- **security(since 4.1)：**安全模式，目前框架内置的安全模式分为两种，一种是sm2，另一种是rsa
- **security.type(since 4.1)：**安全模式类型，该属性存在时则表示启动安全模式，可参考JSRuleSecurityEnum枚举，值为sm2时表示启用sm2安全模式
- **security.publicKey(since 4.1)：**公钥，当security.type开启安全模式时有效，公钥和私钥任何一个为空时都将重新自动生成秘钥对儿
- **security.privateKey(since 4.1)：**私钥，当security.type开启安全模式时有效，公钥和私钥任何一个为空时都将重新自动生成秘钥对儿
- **security.signKey(since 4.1)：**开启安全模式后如果还需要后台配置签名秘钥用于加盐处理，此时可配置该属性，该属性可以为空，但不建议为空。验签的过程首先会将json字符串进行加密，之后用加密后的密文再与该签名秘钥组合，最后再与签名文本进行对比验证
###动态定义
动态定义是指请求时在json中临时定义的，并能够临时更改原有框架配置的一种手段，可以参考JSRuleDefinition这个类来查看都有哪些属性可以定义，仅在当前请求时有效。除了viewParams和fieldsDesensitized属性，这里新增加了一个config属性，它对应的是系统可配置的程序参数，该属性后续可能会加入更多可定义的动态配置，这里先以如下几个参数进行说明
- **@calculateScale：**使用add插件并进行除法运算时保留的小数位，int类型
- **@calculateMode：**使用add插件并进行除法运算时小数位的舍入方案，默认为四舍五入
下面展示一个例子
```
"define":{
    "fd":{"imgUrl":{"regex":"[1-9]+","replaced":"!"}},
    "vp":{"CategoryView":["#$length(kkk)","4"]},
    "config":{"calculateScale":4,"calculateMode":4}
}
```
上面的fd是脱敏配置(具体可参考脱敏配置篇章)，vp是视图配置(具体可参考视图配置篇章)，config对应的是edi.rule.config
##exports插件
该插件用于导出数据到excel或者word之中，导出word功能需要手动在pom中添加com.deepoove poi-tl依赖，因为该依赖将导致大量的jar包被引入，所以默认为不依赖。导出的过程为先通过get插件查询出数据，之后再将数据灌入到指定的模板中。exports插件底层采用SXSSFWorkbook技术，因此不会造成内存溢出问题，对比easy poi，该插件不仅支持自定义模板，而且性能也优于easy poi，在同一台机器上反复测试，结论是导出10万条数据，exports插件耗时2.1-2.6秒之间，而使用easy poi则是在4.588秒左右。下面是导出的json用例
```
{
    "actions": [
        {
            "name":"test_export",
            "exports":{
                "word":{
                    "outFilePath":"D:/asddsa/laimi.docx",
                    "responseFileName":"word response file name",
                    "relativePath":"/template1.docx",
                    "data":{"suo":"value","sBillNo":"no.11232","dCreatetime":"2020-10-21 10:11:11"}
                },
                "excel":{
                    "responseFileName":"excel response file name",
                    "absolutePath":"D:/xxxx/asddsa.xlsx",
                    "sheets":[
                        {
                            "action":{
                                "name":"asddsa",
                                "get": {
                                    "relation": {
                                        "classes":["bao.ZsImport"]
                                    },
                                    "page":{"pageSize":0},
                                    "condition":{
                                        "type":"or",
                                        "where":{"eq":{"bao.ZsImport.name":["王小二mysql","李小四mysql"]}}
                                    },
                                    "fields":["#&bao.ZsImport.id","name","birthDay","#&qian@qq","#$ifnull(&remark,&name)@remark"]
                                }
                            },
                            "tsn":"lanliya",
                            "nsn":"sheetNameNo.1",
                            "start":5,
                            "params":{"asd":"2020-10-20 10:10:10"}
                        },{
                            "action":{
                                "name":"qweewq",
                                "get": {
                                    "relation": {
                                        "classes":["test.business.po.bao.ZsImport","ZsImport2"]
                                    },
                                    "page":{"pageSize":0}
                                }
                            },
                            "nsn":"sheetNameNo.2",
                            "start":4
                        }
                    ]
                }
            }
        }
    ]
}
```
###参数说明
- **sheets：**表示所要导出的sheet对象的数组
- **outFilePath：**默认导出路径，值不能是一个目录，应该是一个包含文件名的绝对路径名。别名是"out"，如果不设置该属性则会通过客户端响应弹窗来手动设置导出excel文件的路径
- **responseFileName：**客户端响应后弹出框里默认的文件名，别名是"rfn"，设置该属性时应该包含文件名的后缀名
- **aPath：**模板绝对路径，别名aPath，如果不设置模板的路径将会使用默认模板导出数据
- **rPath：**模板相对路径，别名rPath，如果不设置模板的路径将会使用默认模板导出数据
- **cacheRow：**别名是"cache"，表示达到多少缓存数据行数时将内存数据刷新到硬盘上。合并单元格时如果总数据行大于此值则将无法正确合并单元格，默认是SXSSFWorkbook.DEFAULT_WINDOW_SIZE 100
####sheet Parameter Description
- **action：**此处非数组，可以通过这个属性来调用action动作模型，导出时只能选择get模型
- **defaultValue：**数据为空时单元格的默认值，别名default，不设置则用/符号代替
- **dateFormat：**如果params属性中含有符合日期格式的字符串值，则该属性将指定这些字符串应以哪种格式来展示，别名format，默认为"yyyy-MM-dd HH:mm:ss"
- **mergeCell：**是否合并值相同的两个相邻列单元格，别名merge，使用该属性时需要注意JSRuleExportExcel中的cacheRow缓存行的设置，确保导出的总数据行数不小于该数值，否则将出现意外结果
- **wrapText：**是否允许通过转义字符进行单元格换行操作，别名wrap，通常搭配lineBreakTag属性使用
- **lineBreakTag：**换行操作的转义字符，别名是"lbt"，wrapText为true时有效
- **tsn：**tempSheetName,excel模板中对应的sheet的名称，别名tsn，如果不设置则按照json中sheet的数组序号来查找相应的模板
- **nsn：- **newSheetName,导出的excel文件中的sheet的名称，别名"nsn"，如果不设置则按照sheet+数字的方式来命名
- **dataLine：**别名"start"，数据加载的起始行号，行号与excel中的行号对应，它表示从模板中的哪一行开始加载表的数据，默认为第一行。这一行通常位于模板表头下面的第一行，在这一行中开发者要根据get插件返回的结果对列的名称进行定义，表示excel中的某一列对应数据库表的哪一列，如下
```
Header             Id                     name              birthDay
dataLine  entityName-fieldName      entityName-name         birthDay
```
- **containsHead：**在未设置模板的情况下是否根据实体类信息默认导出一个表头，别名"ich"，默认为true
- **params：**动态参数集合，当前sheet中数据行以上除头行以外的任何一个地方由<>括起来的key都将替换成该参数中的值value
- **data：**待导出的数据集合，如果该属性和action中的get插件同时存在，则优先该属性的数据导出
- **fieldMappings：**设置要导出哪些列，别名为exports，该属性仅在未设置模板时有意义，该属性的顺序表示导出时对应的sheet列的头的顺序
如果此属性未设置，则默认Po配置中的export属性来生成列头(export如果为空默认带前缀的字段名)，同时导出所有的列。这些列是否有值和所查询的字段属性fields相关，fields如果为空表示查询所有字段，如果有值则应是带class前缀的字段(避免多表重复字段)，否则将不会导出此列的数据
如果此属性已设置，则根据该属性的设置来断定所要导出的列都有哪些，此时的key为字段别名，可参考别名表达式的写法，value为对应的列头的名称
##uploads插件
上传插件用于上传文件，其属性如下
- **aPath：**上传文件存放于服务器的绝对路径
- **rPath：**上传文件存放于服务器的相对路径
- **base64Data：**上传文件的数据流，文件字节码采用base64编码
```
"uploads":{
    "base64Data":"UEsDBBQACAgIAFZ1CVUAA......
}
```
##imports插件
导入功能的整个过程为先将excel文件上传到服务器，之后再读取服务器上的excel文件，最后将读取到的数据通过add插件插入到数据库中，先看一个导入的json用例
```
{
    "actions": [
        {
            "name": "test_import",
            "imports": {
                "excel": {
                    "uploads":{
                        "aPath":"D:/response.xlsx"
                    },
                    "sheets": [
                        {
                            "head": 3,
                            "start": 5,
                            "action":{
                                "name":"asddsa",
                                "add": {
                                    "class":"test.business.po.bao.ZsImport",
                                    "uuid": ["id"],
                                    "required":["id"]
                                }
                            }
                        },{
                            "head": 2,
                            "start": 4,
                            "action":{
                                "name":"qweewq",
                                "add": {
                                    "class":"ZsImport2"
                                }
                            }
                        }
                    ]
                }
            }
        }
    ]
}
```
- **aPath：**所要导入的excel文件在服务器上的绝对路径
- **rPath：**所要导入的excel文件在服务器上的相对路径
- **action：**非数组类型，可以通过这个属性来调用action插件，导入时只能选择add插件
- **headLine：**sheet中表头的行号，别名"head"，行号对应excel的行号，默认为第1行，模板中需要在此行处配置列名称
- **dataLine：**表示数据开始从哪一行进行加载，别名为start，默认为headLine+1
- **fieldMappings：**列的名称与java字段名称的映射关系，别名为"imports"，"key"为sheet表格上表头"headLine"那一行的列的名称，允许多个"key"映射同一个java字段。value属性是列名所映射的java字段的名称。默认使用实体类java字段上的imports注解的值作为"key"，value属性则包括带类名称前缀和不带类名称前缀的java字段名。例子：@JSRuleCrudField(imports= {"name","another name"})
**提示：**test.business.po.bao.ZsImport是类的全限定名，只有在"locations"属性路径下存在多个相同的类名时才允许使用类全限定名，否则只能使用直接类名
##shunt插件
shunt插件是一个非常重要的插件，它可以将所有的action插件通过一定的逻辑判断串联起来，可以将它理解为if else语句，通过判断来决定最终执行哪些actions指令，这意味着通过这种方式可以实现一个复杂的递归指令，下面看一个例子
```
{
    "actions": [
        {
            "name": "test_get",
            "get": {
                "relation": {
                    "classes":["ZsTestPO"]
                },
                "groupShow":true,
                "fields":["name","salary","currentDate"],
                "condition":{
                    "where":{
                        "eq":{"ZsTestPO.name":["mmm"]}
                    }
                }
            }
        },{
            "name":"test_shunt",
            "shunt":{
                "ifAnd":true,
                "if":{
                    "name":"test_get",
                    "path":"/data/2/ZsTestPO/salary",
                    "value":300,
                    "asserts":["testAsserts"],
                    "usual":[{
                        "in":[null,true,300.0]
                    },{
                        "name":"test_get",
                        "path":"/data/0/current_date",
                        "lt":"2023-08-20 00:00:00","ge":"2023-08-03 00:00:00"
                    }],
                    "br":[{
                        "usual":[{
                            "le":300,"in":[300.1]
                        }],
                        "br":[{
                            "usual":[{
                                "name":"test_get",
                                "path":"/data/1/ZsTestPO/salary",
                                "le":1100,"in":["zxc",{"name":"test_get","path":"/data/0/ZsTestPO/salary"}]
                            }]
                        }]
                    }]
                },
                "then":[
                    {
                        "name": "shunt_then",
                        "get": {
                            "relation": {
                                "classes":["ZsTestPO"]
                            },
                            "fields":["name"]
                        }
                    }
                ],"else":[
                    {
                        "name":"shunt_else",
                        "get": {
                            "relation": {
                                "classes":["ZsTestPO"]
                            },
                            "fields":["name"]
                        }
                    }
                ]
            }
        }
    ]
}
```
上面的例子看起来非常的复杂，接下来我们逐一进行分解说明
由于shunt插件是对前面action插件执行后的结果进行判断，因此在执行shunt插件之前应该至少有一个action已经执行成功并产生结果。JSRuleAssert对象对应的if判断中有如下几个属性
- **ifAnd：**表示第一层的与或逻辑为and还是or
- **name：**表示从哪一个action的结果中取值
- **path：**jackson node path，用于从结果集中取指定的值，如果node是一个数组，那么可以通过/加数字来指定某一条结果的值，如nodeA/1/nodeB
- **value：**没有获取到值时的默认值，此外无论是通过name，path还是value取得的值类型只能为String,int,Double,Long,Boolean,null
- **asserts：**自定义断言器，数组的值为spring bean的名称，多个断言器之间的与或关系取决于ifAnd以及br属性
- **usual：**框架内置的基本判断功能，它包含in，ni，gt，ge，lt，le，判断时需要注意值的类型，例如从name和path中取到的value值为double类型，那么只有当in的数组中存在300.0时才会为true，300则为false。当字符串的格式为框架定义的时间格式时则会用时间来进行判断，取不到数值时可以用null来进行判断。此外usual对象中还提供了name，path，value属性，它表示将采用这些属性获取到的值作为判断条件而非父属性获取到的值，否则将采用父属性的值作为判断条件。最后，多个usual对象之间的与或关系取决于ifAnd以及br属性。
- **br：**表示bracket，它与get插件中的判断条件逻辑相同，如果ifAnd为true，则第一层的与或逻辑为and，使用br属性可对判断条件进行包裹，此时这些被包裹的条件将进入到第二层，此时与或逻辑发生反转，条件与条件之间的与或关系全部为or，以此类推，可实现复杂的判断。
**提示：**usual对象内部的in，ni，gt，ge，lt，le属性可以是一个map类型，在map中依然可以声明name，path，value属性，表示使用当前属性来重新获取比较值
**注意：**当通过name和path属性没有取到值的时候则不会覆盖默认的value值，因此value为300是Integer类型而非数据库返回的double类型
##自定义开发
###说明
本篇的内容是框架的核心思想，较为重要，所有内置的插件也全都是基于这种开发模式开发出来的。自定义开发主要包括自定义模型，自定义插件，自定义数据库字段及函数。自定义模型包括自定义action，自定义result，自定义controller，自定义模型是实现了IJSRuleCustom接口的bean，有且只能有一个被注册进spring容器中。自定义插件是开发者根据自身业务场景封装的代码片段，它应具有高内聚低耦合的特性，它是脚本代调的基本单位，因此需要一定的抽象设计能力。自定义数据库字段及函数主要用于映射数据库的函数，如substr()，current_date，sum()，开发者可以自定义这些函数的名称，未定义的函数将不可用。
###自定义action
action对应的扩展对象为edi.rule.model.JSRuleAction，通过继承这个类并将此类注册成spring bean开发者可以自定义一个action。这个action好比一个仓库，所有的插件类都会在这个仓库类中被定义成一个实现了edi.rule.extend.interfaces.IJSRuleActionModel接口类型的字段，字段的名字即是插件使用时的属性，如果要重写应用框架内置的插件，只需要重写它内部对应的插件类型的字段就可以了。
```
@Data
@EqualsAndHashCode(callSuper=false)
@Component
public class MyActions extends JSRuleAction<MyActions>{
	@JSRuleModelPermit(join={"role1"})
	public JSRuleGetCustomModel get;
	public JSRuleAddCustomModel add;
	@JsonAlias({"del"})
	public JSRuleDeleteCustomModel delete;
	public JSRuleEditCustomModel edit;
	private MyTestCustom mtc;
}
```
上面的例子重写了父类的get，add，delete，edit插件，因此需要提供get和set方法，当使用json中的get插件时将会直接进入开发者自定义的JSRuleGetCustomModel这个类里的逻辑。除此之外开发者还可以定义其它的插件类型，如上面的MyTestCustom，还可以增加一些可用的注解，例如@JSRuleModelPermit(join={"role1"})，此外由于框架是jackson进行序列化的，这里还可以使用jackson注解，例如@JsonAlias({"del"})，它将插件名称加了一个del的别名，这不会影响重写的机制，例如@JsonIgnore注解，忽略某个字段的反序列化。
###自定义插件
```
public class MyTestCustom implements IJSRuleActionModel<MyActions>{

	@JSRuleInject
	@JsonIgnore
	private JSRuleGlobalVariable variable;
	@JSRuleModelField
	public List<String> list;

	@Override
	public Object start(MyActions action) {
		return "这里直接返回结果->";
	}
}
```
上面的例子是一个自定义插件的例子，插件其实就是一个实现了IJSRuleActionModel 接口的class类，其处理逻辑便是重写start方法，这里还有一些自定义开发时需要用到的注解，**这些注解仅对插件内部属性生效，允许递归**
- **@JSRuleInject：**该注解与spring的@Autowired注解类似，用于依赖注入的，**使用该注解时通常需要搭配@JsonIgnore注解，用于忽略某些注入字段的反序列化操作，因为被该注解标识的字段只有为空时才会有效**。其中names属性表示获取指定的bean名称集合，types属性表示获取指定的bean类型集合，这两个属性通常用于注入Collection,Map,Array等集合类型的字段，表示获取多个bean，当用在非集合类型的字段上面时会按照顺序进行获取，当没有找到任何bean并且属性required为true的时候此时会报错，否则只要找到一个bean就会成功注入
**注意：**此注解注入带有@Transactional注解的bean时会报错，因此不能使用该注解注入JSRuleService，为了避免嵌套循环调用，逻辑上在model中也不允许注入JSRuleService，如果需要嵌套执行action，可以参考接口IJSRuleActionModel中的startActions方法
- **@JSRuleModelField：**此注解用于某些字段初始化后的一些后续处理，处理类需要实现IJSRuleModelFieldProcessor扩展接口并注册成spring bean。当此注解标记在一个类型为IJSRuleModel的字段时将会产生向下递归处理，此时该注解的作用将会失效。type属性表示该字段将会被哪个类进行处理，默认不进行任何处理
- **@JSRuleCheck：**该注解用于校验字段值的合法性，如果该字段的类型是IJSRuleModel类型，那么它会向下递归检查。
**注意：**上面3个任何一个注解标记一个IJSRuleModel类型的字段时都将产生向下递归的效果，会递归处理IJSRuleModel类型对象中的字段，如果没有标记则不会递归处理
**提示：**以上3个注解的执行顺序是@JSRuleInject，@JSRuleModelField，@JSRuleCheck
###异常以及国际化处理
异常的处理只需要throw new JSRuleException(msg)即可，如果需要国际化消息，则可以通过JSRuleMessage对象的read方法
例如：throw new JSRuleException(JSRuleMessage.read(key))
国际化文件可在application文件中配置属性edi.rule.config.message，以resources为根目录，以/开头输入国际化文件的位置
###自定义result
自定义result模型需要继承JSResult类，如果需要更改原有的字段名称，可通过重写父类的属性并加上@JsonProperty注解来进行更改，如果需要新增一个属性，可以直接在子类中新增一个字段，如果需要删除原有的字段，可通过重写父类的属性并加上@JsonIgnore注解来进行删除，用例如下
```
@Data
@EqualsAndHashCode(callSuper=false)
@Component
public class TestJSResult extends JSResult{
	@JsonProperty("codeAlias")
	public int code;
	public String msgCustom;
	public LinkedHashMap<String,Object> result;
	@JsonIgnore
	public String log;
	@JsonIgnore
	public Map<String,String> actionSql = new HashMap<String,String>();
	
	public TestJSResult() {
		code = 200;
		msg = "any message";
		result = new LinkedHashMap<String,Object>();
	}
}
```
构造函数中用于定义结果集对象内部属性的默认值，重写父类属性意味着要对父类属性进行更改
###自定义controller
json-script-rule内置的控制器为JSRuleController，它的固定访问路径为/json/script，当你需要更改这个路径的时候可以自定义一个控制器，如下
```
@Data
@RestController
@RequestMapping("/xxx/xxx")
public class MyTestController {
	
	@Autowired
	protected JSRuleService service;
	@Autowired
	protected HttpServletRequest request;
	@Autowired
	protected HttpServletResponse response;

	@PostMapping(value = JSRuleJsonConfig.DEFAULT_REQUEST_START)
	public String start() {
		return service.start(ZSHttp.getJsonStrFromReq(request),ZSHttp.initGlobalArgs(request,response));
	}
}
```
上面的例子还可以通过继承JSRuleController来实现一个自定义控制器，与此同时还应该关闭内置的控制器，可以通过以下方法来关闭
```
edi:
  rule:
    close：
      engineController: true
```
###自定义数据库函数及字段
####自定义函数
所有的扩展类和接口均位于edi.rule.extend包下，其中JSRuleDBFunctions为自定义函数的顶级类，它下面有对应的各种数据库的子类，如JSRuleMysqlFunctions，JSRuleOracleFunctions等，通过继承这些子类来实现一个数据库函数的映射关系
```
public class JSRuleMysqlFunctions extends JSRuleDBFunctions{
	static {
		functions.put("abs", new JSRuleFunctionInfo("abs",1));
		functions.put("concat", new JSRuleFunctionInfo("concat"));
		functions.put("now", new JSRuleFunctionInfo("now",0));
	}
}
```
上面的例子展示了如何定义一个函数映射，其中key "abs"为json中使用的函数名，它可以是任意名称，JSRuleFunctionInfo对象为实际的函数名和参数个数。函数映射定义完成后可以在json中直接通过R表达式来使用，例如：#$now()，这里的now便是key，未定义的函数不能在json中使用
####自定义字段
数据库中存在一些非函数的字段，例如mysql的currentDate，这些字段不同于表字段，它的结果不属于任何一个表的结果，因此要定义这个字段必须要用另外的方式。框架提供了JSRuleDBFields对象用于这些特殊字段的定义，下面有四个子类对应四种不同的数据库类型，下面先以mysql为例
```
public class JSRuleMysqlSysFields extends JSRuleDBFields{
	static {
		fields.put("currentDate", "current_date");
		fields.put("currentTime", "current_time");
	}
}
```
通过上面的例子不难看出，它与自定义函数没有什么太大的区别，因此在这里就不多赘述了
###自定义断言器
在使用shunt插件时，框架内置的JSRuleAssertUsual对象只提供了一些基本的判断功能，对于一些复杂的判断还无法实现，因此这个时候就需要开发者自定义一些断言的逻辑，如下面的例子
```
@Component
public class TestAsserts implements IJSRuleAssert{
	@Override
	public boolean ifTrue(String name, String path, Object value, boolean ifAnd, JSRuleGlobalVariable variable) {
		if (value instanceof Number) {
			return true;
		}
		return false;
	}
}
```
断言器与自定义模型一样需要注册成spring bean，断言器在json调用时可直接写bean的名字，不是java class的名字
###自定义开发需要了解的
####获取json参数
Spring bean中可以通过如下方式获取
```
@Autowired
private JSRuleArgsVessel v
```
插件中可以使用如下方式获取
```
@JSRuleInject
private JSRuleArgsVessel v
```
####上下文对象
上下文对象JSRuleContext，它提供了如下参数
- **properties：**用于获取spring application配置属性
- **beanFactory：**spring bean工厂
- **dataSource：**框架最终使用的数据源，类型为javax.sql.DataSource
- **dbInfo：**框架使用的数据库信息，包含数据库名称、"mapper"类型和function类型等
- **security：**框架目前所采用的安全模式信息
####扩展接口
- **JSRuleDefaultExtend：**该扩展类实现了IJSRequestHandler和IJSRuleRoleHandler以及IJSRuleMappingsInfo接口，因此通过继承该类可以对上述三个接口方法进行自定义扩展，IJSRuleMappingsInfo接口用于处理非实体类映射的场景，如映射信息来自于xml文件或数据库而非java实体类。IJSRequestHandler用于自定义处理每次请求时json中的body对象的初始化，IJSRuleRoleHandler接口用于处理请求方的角色信息，开发者需要手动识别请求方的角色并返回一个请求方角色的set集合。该类需要通过注解@Component注解注册成spring bean或在application中配置edit.rule.processor属性，并输入类的全限定名称，如下
```
edi:
  rule:
    processor: test.myrule.JSRuleDBProcessor
```
- **IJSRuleModel：**json中所有对象属性的顶级接口，如果你自定义的类是json中的一个属性，那么理论上来说应该实现这个接口
- **IJSRuleModelFieldProcessor：**注解@JSRuleModelField所标识字段的处理接口，实现该接口的处理类可以在字段反序列化后重新赋值，该接口可以存在多个，重写order方法将实现排序
- **IJSRuleActionModel：**所有插件的顶级接口，自定义插件必须实现该接口，其start方法用于对action逻辑的处理
- **IJSRuleAssert：**实现该接口的spring bean可以在shunt插件中进行调用
- **IJSRulePostLaunch：**实现该接口的类在框架加载完成后会自动被调用，允许存在多个实现类，重写order方法将实现排序
- **IJSRuleRoleAuthority：**该接口用于初始化框架权限，其内部方法将返回一个"Map"集合，"key"为角色名称，"value"为权限对象。权限对象包含crud权限以及插件权限，crud权限为表与角色之间的关联关系。初始化的crud权限受注解@JSRuleTable中的permit以及roles属性制约
##权限
###说明
从4.0版本开始，框架引入了权限的概念，其权限优先级由强至弱如下
- **插件禁用：**在"application"中配置禁用的插件优先级最高，禁用的插件将绝对不可用，除非插件重写check方法
- **插件权限：**通过实现IJSRuleRoleAuthority接口来配置角色和插件之间的关系，此外还可以通过在自定义action对象中使用@JSRuleModelPermit注解来给角色添加插件的权限，此外该注解还可以标注在插件class上，同时出现时将优先采用action对象中的注解属性。重写isOwner方法将会导致插件权限失效
- **实体crud权限：**插件权限校验过后如果此次请求是crud类型的插件，那么接下来还会校验实体权限，通过在实体类上的@JSRuleTable注解中的permit属性来控制实体类允许哪些crud操作，默认为允许所有操作。重写checkCrudPermit方法将会导致crud权限失效
- **实体角色权限：**实体crud权限之后会判断@JSRuleTable注解中的roles属性，它表示该实体类限定哪些角色访问，除此之外的其它角色不允许访问。重写checkCrudPermit方法将会导致实体角色权限失效
- **角色权限：**通过实现IJSRuleRoleAuthority接口来配置角色的权限，它包括插件的权限以及角色与实体类之间的crud访问权限，该方式受制于上述权限。重写checkCrudPermit方法将会导致角色权限失效
###权限初始化
下面展示一个自定义权限类的例子
```
@Component
public class RuleCrudRole implements IJSRuleRoleAuthority {
    @Override
    public Map<String, JSRuleRolePermit> initRolesPermit() {
        ConcurrentHashSet<Class<?>> models = new ConcurrentHashSet<>();
        models.add(JSRuleGetCustomModel.class);
        models.add(JSRuleDeleteCustomModel.class);
        models.add(JSRuleEditCustomModel.class);

        ConcurrentHashMap<String,JSRuleCrudPermitEnum> crud = new ConcurrentHashMap<>();
        crud.put("TestBank",JSRuleCrudPermitEnum.RU);
        crud.put("TestBankAccount",JSRuleCrudPermitEnum.CRU);

        JSRuleRolePermit permit = new JSRuleRolePermit(crud,models);
        JSRuleRolePermit permit2 = new JSRuleRolePermit(null,models);

        Map<String, JSRuleRolePermit> result = new HashMap<>();
        result.put("admin",permit);
        result.put("skk",null);
        return result;
    }
}
```
上面的例子中admin和skk为角色的名称，角色名称对应的JSRuleRolePermit对象则表示该角色拥有哪些权限，包括但不限于插件权限以及实体对象的crud权限
### 请求方角色初始化
需要继承JSRuleDefaultExtend类或者实现IJSRuleRoleHandler接口并重写对应的"handle"方法，开发者需要在这个方法中返回当前请求方的角色set集合，最终框架会根据初始化的角色信息来判断当前用户是否有权限执行。
**提示：**此外开发者可以通过重写IJSRuleActionModel接口中的isOwner方法来自定义插件权限的逻辑，重写其check方法还可以自定义某一个插件的检查逻辑，还可以通过重写IJSRuleCrudModel中的checkCrudPermit方法来自定义crud权限的逻辑，总而言之，通过重写父类接口的方法均可以自定义开发
## RPC使用说明
从4.0版本开始，框架开始支持rpc调用，api层以及provider层均需要引入interface包，因此开发者可以在interface层pom中引入json-script-rule，引入后可以在interface层定义一个方法，代码如下
```
public interface IJSRuleStartService {
    JSResult start(String body, JSRuleGlobalArgs args) throws BusinessException, JSRuleException;
}
```
BusinessException为开发者项目中自定义的异常，以dubbo为例provider层代码如下
```
@DubboService
public class JSRuleStartService implements IJSRuleStartService {

    @Autowired
    protected JSRuleService service;

    @Override
    public TestJSResult start(String body, JSRuleGlobalArgs args) throws BusinessException，JSRuleException{
        return service.start(body,args);
    }
}
```
TestJSResult为JSResult的子类，是自定义result模型，JSRuleService是框架内置的启动类，这里只需要调用start方法即可，api层代码如下
```
@RestController
public class ApiTestController {

    @DubboReference(timeout = 10000)
    private IJSRuleStartService startService;

    @PostMapping("/start")
    public JSResult start(@RequestBody JSBody<?> body){
        return startService.start(ZSRule.modelToJson(body),null);
    }

    @PostMapping("/start2")
    public Object start2(){
        return startService.start("{\n" +
                "    \"params\":{\"roles\":[\"skk\"]},\n" +
                "    \"actions\":[{\n" +
                "        \"name\":\"asddsa\",\n" +
                "        \"get\":{\n" +
                "            \"relation\":{\n" +
                "                \"classes\":[\"TestBank\"]\n" +
                "            },\n" +
                "            \"fields\":[\"id\"]\n" +
                "        }\n" +
                "    }]\n" +
                "}",null);
    }
}
```
startService中的参数为String类型，因此/start中JSBody<?> body对象需要通过ZSRule.modelToJson方法将其转化为String才能进行调用。此外/start2中也展示了，这里还可以直接写一个json字符串来发送请求
## 前端使用说明
任何一方调用json-script-rule所传递的参数均为json字符串，因此前端在调用时只需要拼凑好json字符串即可，以一个简单的json为例，下面是vue模拟请求查询名称为山姆的json请求字符串
```
let dataName = "sam";
let data = {
    "actions": [
        {
            "name": "get_a",
            "get": {
                "relation": {
                    "classes":["classA","classB"],
                    "condition":{
                        "where":{
                            "eq":{"classA.name":[dataName]}
                        }
                    }
                },
                "page":{"pageNum":1,"pageSize":4},
                "fields":["classA.name","classB.salary"]
            }
        }
    ]
}
axios.post(/xxx/xxx/json/script/rule, data).then((response) => {})
```
通过上面的例子能够看出来json字符串拼接了一个dataName变量，这个变量表示所要查询的人物名字。需要注意的是查询条件为空和为null是不同的含义，为null时不要将条件字段写进json字符串中
## 数据脱敏
从4.4版本开始，框架增加数据脱敏功能，脱敏配置需要在实体类中完成，代码如下
```
@JSRuleTable(name= "xxxx")
public class DesensitizedPO {
	@JSRuleDesensitized(type=JSRuleDesensitizedEmail.class)
	private String email;
	@JSRuleDesensitized
	private Double password;
	@JSRuleCrudField(alias="mobile_phone")
	@JSRuleDesensitized(startIndex=3,endIndex=4)
	private String mobile;
	@JSRuleDesensitized(startToken="http://",endIndex=4)
	private String url;
}
```
最终结果如下：
email = zhangsan@163.com，z*******@163.com
password = abcd#1234，*********
mobile = 13212346789，132****6789
url = http://localhost:8080/api/json，http://*********************json
通过结果的对比很容易理解参数的作用，type=JSRuleDesensitizedEmail.class表示脱敏类型为自定义类型，这里的JSRuleDesensitizedEmail为框架内置的脱敏类型，不需要开发者去实现。
### 自定义脱敏规则类
需要开发者实现IJSRuleDesensitizedInfo接口，这里引用框架内部定义的JSRuleDesensitizedEmail类来举例说明，代码如下
```
public class JSRuleDesensitizedEmail implements IJSRuleDesensitizedInfo{
    @Override
    public int startIndex() {
        return 1;
    }
    @Override
    public String endToken() {
        return "@";
    }
}
```
上面的例子定义了startIndex以及endToken属性，两个属性可以搭配着使用，下面是关于各个参数的具体说明
####参数说明
- **replaced：**脱敏时替换该字符，默认为*符号
- **startIndex：**从前往后开始计算表示保留多少位字符，其余字符将进行脱敏处理，默认为-1，表示不使用该属性
- **endIndex：**从后往前开始计算表示保留多少位字符，其余字符将进行脱敏处理，默认为-1，表示不使用该属性
- **startToken：** startIndex不存在时有效，从第一个字符开始，从前往后查找匹配该属性的字符串，并记录其位置下标赋值给startIndex属性，默认为空，为空时startIndex值为第一个匹配元素的下标
- **endToken：** endIndex不存在时有效，从最后一个字符开始，从后往前查找匹配该属性的字符串，并记录其位置下标赋值给endIndex属性，默认为空，为空时endIndex值为最后一个匹配元素的下标
- **isFirst：** startToken存在时有效，从前往后匹配是否是第一个匹配到的字符串并开始记录元素的下标，默认true，为false时表示从前往后最后一个匹配到的值的元素的下标
- **isLast：** endToken存在时有效，从后往前匹配是否是第一个匹配到的字符串并开始记录元素的下标，默认true，为false时表示从后往前最后一个匹配到的值的元素的下标
- **isKeepSt：**startToken存在时有效，当匹配到startToken字符串时是否对匹配的字符串同时进行脱敏处理，默认为false
- **isKeepEd：**endToken存在时有效，当匹配到endToken字符串时是否对匹配的字符串同时进行脱敏处理，默认为false
- **regex：** 正则表达式，匹配到的字符串将被替换为{@link #replaced()}，当startIndex以及endIndex都有值的时候，该属性将被忽略，否则将优先执行该属性
####动态脱敏配置
如果你想要更灵活的配置，那么可以动态的定义，参考对象JSRuleDefinition。比如某一个字段在实体类中已经配置了脱敏规则，但是在某一次请求的时候不需要对该字段进行脱敏处理，又或者在某一次请求的时候需要对该字段重新定义脱敏的规则，那么这个时候你只需要在JSRuleDefinition对象下的"fd"属性中增加这个字段，并对该字段重新定义脱敏规则就可以了，如下
```
{
    "actions":[{
        "name":"get_test",
        "define":{
            "fd":{
		"imgUrl":{"regex":"[1-9]+","replaced":"!"}
            }
        },
        "get":{
            "relation":{
                "classes":["Category"]
            },
            "fields":["id","name","#&imgUrl@asd"]
        }
    }]
}
```
上面的例子中，"fd"是字段和脱敏规则的映射集合，它是一个别名。"imgUrl"是字段名称，"key"对应的"value"是一个JSRuleDesensitizedInfo对象，该对象的属性将会取代实体类的注解属性。如果不需要对"imgUrl"字段进行脱敏处理，可以将其定义为null，如下
```
"define":{
    "fd":{
	"imgUrl":null
    }
}
```
**注意：**"fd"属性中的"key"是java字段的名称，这里不可以使用别名。除此之外，如果"define"或者"fd"属性为null，则默认实体类的配置