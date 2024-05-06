## 简介
### 前言
该项目是一款低代码设计框架，项目开始于2021年12月份，并在2023年4月份第一次在github上发布，与此同时同步到远程maven仓库之中。在经历近一年的迭代后，如今该框架已经趋于成熟，准备从2024年2月份开始在github上更新后续的版本。目前较为稳定的版本为4.4和5.0，4.4版本主要用于java 8以及tomcat9版本以下的项目，5.0则是java 8和tomcat10版本以上的项目，两个版本唯一的差异仅仅是对tomcat以及jdk不同版本的支持。

### 介绍
json-script-rule是一款**低代码设计框架**，之所以说它是设计框架，是因为它更倾向于程序的设计和拆分，**通过将一些通用的程序片段封装成插件，之后再对它们进行调用来实现一些较为复杂的应用场景。封装是在后端实现的，而调用方则不确定，有可能是前端，也有可能是其它应用服务。调用方式为json脚本，在json字符串中输入各种参数指令并发送给后端插件处理，整个调用过程感觉起来有些类似命令式的，后端则通过设计和解析命令的语法最终达到功能的实现，整个开发过程像是脚本命令一样，而这也是它与众不同的地方**。不过要实现这种令人耳目一新的开发模式不仅需要借助这款应用框架，还需要开发者拥有一定抽象设计插件的能力，能够将一些代码片段合理的设计并封装起来，最后通过协调多个代码片段来完成各种不同的功能。

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
	@JSRuleCrudField(pk=true)
	private String id;
	private String name;
	@JSRuleCrudField(name= " create_date ")
	private Date create_date;
	@JSRuleCrudField(name= "birth_day")
	private Date birthDay;
	@JSRuleCrudField(name= "salary",alias="dian")
	private double salary;
}
```
```
@JSRuleTable(name="zs_test_son2")
public class ZsTestSon2 {
	@JSRuleCrudField(pk=true)
	public String id;
	@JSRuleCrudField(name= "zs_test_id",fk="ZsTestPO")
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
@Data
@Component
public class MyActions extends JSRuleAction<MyActions>{
	public JSRuleGetCustomModel get;
}
```
上面表示重写父类的get字段用于代替框架内置的get插件，**注意这里为了子类的model生效，因此还需要用到get和set方法**，我们只需要在类上加上@Data注解就可以了，主要用于json反序列化时取其子类的model
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
