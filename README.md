博客地址：https://www.jianshu.com/u/9d71fe6dcbde
#### 前言
软件这一行业做了有十多年，从毕业时那会儿流行的jsp一直到现在的前后端分离，这期间经历了太多的技术更新迭代，而每一款技术的出现都极大的简化了我们的开发，让我们能够从容的应对日新月异的需求变化，简化我们开发者对于技术层面的思考，使得我们能够拥有更多的精力去面向业务层面的需求。
然而工作久了你会发现对于日常的工作其实有很多的方法可以提高开发效率，毕竟谁都不想加班，也不想去看别人写的代码，更不想按部就班的去创建那些有时候没什么意义的java简单对象，给自己找那些没有意义的事情来消磨时间，看似工作很努力但实际上却潜移默化的将自己变成了车间里的工人。
于是低代码这一名词慢慢的出现在了我们的视线里，作为一个技术人首先想到的就是用技术手段来解决这些繁琐平庸简单的问题，于是打算利用业余时间自研开发一款低代码开源微框架，**意在解决一些简单的应用场景以及插件化的开发，并同时提供一系列配套的技术解决方案和相关的技术处理**，于是经过数个月的努力，一款开源低代码框架json script rule诞生了。
那么这个东西它究竟能做一些什么，它又与我们平常的开发有什么不同？首先一款新技术的出现一定是能够解决开发者的一些痛点的，那么这就绕不开传统框架里都有哪些痛点的这个话题，以下简单罗列出几个常见的痛点：
1. 生成的文件过多，如上面所言，每当展开一个文件夹时映入眼帘的都是大量的简单对象类，尽管可以通过工具进行查找，但类与类之间，服务与服务之间难免有耦合，即便改动很小的一个地方可能都要同时打开很多文件，来回切换十分麻烦，而且容易出错。
2. 一旦功能有所变动，如仅仅只是更改了一个查询的字段，可能还需要去改动代码才能实现，这就又难免要重复1的步骤了。
3. 每当开发一个新功能，这个功能几乎只能应用于公司内部的某个系统，无法将其代码发布到公网上进行开源，因为不同公司之间即便是业务相同，但所使用的框架也有可能不同，很难将A公司的成果复用给B公司。
4. 如果后端的代码发生了更改，可能还需要重新打包重新部署等一系列相对麻烦的操作
5. 某个框架一旦使用了，如mybatis，几乎是不可能灵活更换的，如jpa或是spring jdbc等
6. 开发一个简单的接口效率非常的低，而且一旦遇到问题还需要时不时的去排查错误，这或许是由于别人的一个疏忽造成的，但买单的一定是你。
7. 主流的框架目前都是横向分层的，如controller层，service层，dao层等，这样能够更好的复用，但如果是一个偏小的功能就很难不让人觉得繁琐了，不如按照功能进行纵向分层来的更直接更舒服更好用，其高内聚的设计也能很好的做到横向分层的复用性。
8. 前后端联调费时费力，如果前端可以直接调数据就极大的降低了和后端沟通的效率

说完了几个痛点接下来便是今天要介绍的开源框架**json-script-rule**了，首先我们通过它的名字简单了解一下，大概是一个json脚本的语法规则，那么它都能做一些什么呢？又是如何做到后端0代码开发的呢？又是如何解决上面所说的这些传统框架的痛点的呢？接下来就是具体的说明了，看看这个东西如何能够增加你的开发效率，目前版本已更新至3.1。
#### 介绍
**json-script-rule**是一个依赖于spring的后端框架，它通过拦截前端传给后端的参数并利用jackson解析成对象装配给全局变量，再通过threadLocal保证线程安全，最后通过安装在框架中的各个插件来执行具体的参数逻辑进而得到最后的结果。框架中内置了8个插件，分别是增删改查、上传、导入、导出和主子表，通过后端spring的application配置以及前端json参数的调整可以达到一个类似**动态接口**的开发效果，它的设计主要依赖于两个重要的概念，一是**前后倒置**，二是**面向规则**。
- **前后倒置：**是指后端的java代码由前端的json脚本来替代，前端通过配置post请求中body里的json来动态请求框架内置的插件，进而得出相应的结果。
- **面向规则：**将一些相同的业务场景封装成一个个规则，通过整理这些规则最终将其封装成一个插件进而达到通过配置来实现各个场景的目的，如框架内置的crud插件。

通过上面所说的不难发现
1.如果你是一个前端开发者，如果你也懂一些sql语法，那么你完全可以通过这些插件来完成某些后端的操作，如查询数据，插入数据，修改数据，删除数据等。
2.封装好后的插件事实上就是一个java的class类，这个类可以在任何使用该框架的地方进行复用，非常方便。
3.采用纵向设计思路，按照通用功能点进行设计，而非传统的横向的controller层，service层，dao层等。

目前crud插件支持 **mysql，postgresql，kingbase，oracle（6,8,10）** 数据库，查询支持**函数，分组，排序、关联，和视图查询**等等，几乎涵盖了90%以上的sql功能。
人懒没有发到maven远程中心仓库里，插件地址：https://gitee.com/ying1dudu/json-script-rule-jar.git
##### 优点
1. 前后端通用的设计，既惠及了后端也惠及了前端，前端可自行通过这些插件来减少后端接口的开发
2. 面向规则开发，强化代码设计，有效规避bug，提升代码复用性，节约开发时间成本。
3. 项目上线后，后端不需要打包重新部署。
4. 轻量级容器，整个jar包大概200kb左右
5. 支持扩展，自定义开发，整个框架的设计几乎可以满足大部分定制化开发需要。
6. 采用分离式设计，不耦合于主项目的bean配置，如mybatis配置sqlSessionFactory，pagehelper配置分页等，插件中的配置属性与主项目的完全分离，互不干扰，无论是在pom中直接引用starter或是单独的包，或是代码中实现的配置属性，均不产生耦合。
7. 日志做的十分细致，对于所发生的错误能够通过日志信息快速定位问题
8. 采用以空间换时间的方式优化性能，源码中优秀的算法竭尽所能的减少不必要的计算
9. 对于多个数据库之间采用不同的方式处理兼容数据，通过判断规避多余的计算
10. 提供自定义所需的注解，工具，配置，接口等
11. 支持加密处理，目前仅支持国密sm2非对称性加密(集成hutool包处理)
12. 获取缓存的同时还能有效的对json进行校验，即便修改了json也依然能够有效杜绝sql的注入
13. 由于是json开发，因此在开发的同时也将给前端的文档一并写出来了，节约了文档的时间
14. 框架本身独立于项目，因此项目的任何变动（如框架变动）都不受影响。
15. 可快速开源发布，在不同公司之间复用
##### 缺点
1. 仅支持http协议
2. 仅支持post请求
3. 仅支持单数据源
4. 不支持webflux
#### 插件主要依赖说明
**jdk8及以上**
**spring框架**
**lombok插件**
mysql，postgresql，kingbase，oracle（6,8,10）其jdbc的包以及版本将由开发者主项目中的pom所提供
#### 安装说明
1. 引入依赖，仅此一步即可
```
<dependency>
    <groupId>io.github.ying1dudu</groupId>
    <artifactId>json-script-rule-spring-boot-starter</artifactId>
    <version>3.2.1</version>
</dependency>
```
**提示：**如果maven无法下载或想体验抢先版本的则可以直接到插件地址下载jar包并放入本地maven库里
插件地址：https://gitee.com/ying1dudu/json-script-rule-jar.git

2.  **如果你不使用框架内置的crud功能（包括引用crud插件的导入导出和主子表），那么此步可以跳过**，application（yml和properties等文件类型都可以）中配置了po包路径，这与mybatis的po对象是一个意思，为映射数据库表或视图的java简单对象，属性为location，如下
```  
edi:
  rule:
    location: xx.xx.xx......
```  
**提示：如果在当前配置文件中配置了spring.profiles.active属性并指向了其它配置文件，则子配置文件将会覆盖当前属性**
至此，通过上面的两个步骤，整个框架便安装完成了，这其实和大多数集成在springboot的第三方框架一样
#### 使用说明
由于插件的功能比较多，此处只简单说明查询插件的最基本的用法，后面将会推出更为详细的文档说明。
注：实例中为了配合说明，故意加了很多不规范的命名，如多加了两个空格，如有下划线等，此外还加了很多重复的字段等
1. 配置po类，示例如下  
```
@JSRuleTable(name= "zs_test")
@Data
public class ZsTestPO {
	@JSRuleField(pk=true)
	private String id;
	private String name;
	@JSRuleField(name= " create_date ")
	private Date create_date;
	@JSRuleField(name= "birth_day")
	private Date birthDay;
	private double salary;
	private String remark;
	private Double bonus;
	@JSRuleField(name= "test_field",alias="sum_test_field")
	private String test_field;
	@JSRuleField(name= "sum1_salary",alias="lbv_salary")
	private String sumSalary;
	@JSRuleField(name= "qian",imports= {"qian"})
	private String qian;
}
```
```
@JSRuleTable(name="zs_test_son2")
public class ZsTestSon2 {
	@JSRuleField(pk=true)
	public String id;
	@JSRuleField(name= "zs_test_id",fk="ZsTestPO",dependent= "ZsTestPO.id")
	public String zs_test_id;
	@JSRuleField(name= "zs_test_id",fk="view.neibu.ZsTestPOView",dependent= "view.neibu.ZsTestPOView.id")
	public String zs_test_id2;
	@JSRuleField(name= "zs_test_id",fk="ZsTestPOCopy")
	public String zs_test_id3;
	@JSRuleField(name= "zs_test_son1_id",fk="ZsTestUpdate")
	public String zs_test_son_id;
	@JSRuleField(name="zs_test_son1_id",fk= "view.ZsTestView")
	public String zs_test_son1_id2;
	@JSRuleField(name= "oh_yes")
	public String ohYes;
	public String test_field_a;
	@JSRuleField(dependent= "ZsTestPO.name")
	public String name;
}
```
####参数说明：  
- **pk：**设置主键（目前仅支持单主键，不支持复合主键，也不提议使用复合主键）  
- **fk：**设置外键，这里的值对应的是**类的名字**,其路径是在 **location** 属性所配置的路径下的位置开始，如果有包名则加上包名(**位置依旧以location属性配置的路径开始**)，例如xx.ZsTestPO  
- **name：**表示对应数据库的表字段名,如果没有配置则默认认为java字段名即为数据库表字段名  
- **alias：**表示数据库表字段的别名，如果设置了则会以别名的形式返回给前端  
- **imports：**设置导入时，模板文件头部行对应的某表列的字段名，后续将会在导入规则中详细说明
- **exports：**设置导出时，如果没有设置模板，将会使用此属性进行默认导出列的头
- **dependent：**设置主子表的依赖关系，使用主子表时子表的某个字段值将从主表中获得，如主外键关联
2. 启动开发者自己的本地项目，并用postman进行测试  
```http://localhost:端口号/api/json/script/start```
（注：/api是context-path配置，没有则不写，后面的/json/script/start是固定的路径，**该路径可以自定义**，如果不需要返回值的则可以访问/json/script/end，如导出功能）  
```
11:05:26.901 [main] INFO  e.r.w.s.JSRuleStart - [printInfomation,38] - action=edi.rule.model.JSRuleAction
11:05:26.901 [main] INFO  e.r.w.s.JSRuleStart - [printInfomation,39] - mapper=edi.rule.frame.mybatis.dao.MapperForMysql
11:05:26.901 [main] INFO  e.r.w.s.JSRuleStart - [printInfomation,40] - dbFields=edi.rule.extend.adapter.JSRuleMysqlSysFields
11:05:26.901 [main] INFO  e.r.w.s.JSRuleStart - [printInfomation,41] - dbFunctions=edi.rule.extend.adapter.JSRuleMysqlFunctions
11:05:26.901 [main] INFO  e.r.w.s.JSRuleStart - [printInfomation,42] - handler=edi.rule.work.processor.JSRuleInitByJson
11:05:26.901 [main] INFO  e.r.w.s.JSRuleStart - [printInfomation,43] - location=edi.business.po
11:05:26.901 [main] INFO  e.r.w.s.JSRuleStart - [printInfomation,44] - rootPath=D:\workspace\json-script-rule\rule
```

3. 通过postman请求接口，json如下  
```
{
    "rule": {
        "actions": [
            {
                "name": "test-get",
                "get": {
                	"relation":{
                		"classes":["ZsTestPO","ZsTestSon2"]
                	},
                	"isGroupShow":true,
                	"fields":["ZsTestSon2.id","salary"],
                    "condition":{
                    	"where":{
                    		"equal":{"ZsTestPO.id":["5260c8c5-47f2-4890-aff3-6b4fd5fb62f0"]}
                    	}
                    }
                }
            }
        ]
    }
}
```
####参数说明：  

- **classes：**表示关联的类的相关信息，也就是相关联的表的信息，这里的ZsTestPO是类名而不是表名
- **name：**action作为结果返回的唯一标识
- **get：**表示此次操作为查询动作
- **where：**是matches属性的别名，表示具体的查询条件，这里表示查询ZsTestPO对应的表的id等于"5260c8c5-47f2-4890-aff3-6b4fd5fb62f0"的数据（注意这里的属性是一个数组，用于解决某些条件为某一个值or为null的条件）
- **fields：**表示所要查询的字段
- **isGroupShow：**表示将两个表的数据分开显示（因此这里实际上datas中只有2条数据返回）
返回结果如下
```
{
    "code": "200",
    "msg": "操作成功",
    "result": {
        "action->test-get:": {
            "pageNum": 1,
            "pageSize": 10,
            "totalPage": 1,
            "totalCount": 2,
            "datas": [
                {
                    "ZsTestSon2": {
                        "id": "2d20b69a-6980-4354-8723-8fe922414926"
                    },
                    "ZsTestPO": {
                        "salary": 2200
                    }
                },
                {
                    "ZsTestSon2": {
                        "id": "dba7c159-4442-49dc-a5da-bf5ba28a0d17"
                    },
                    "ZsTestPO": {
                        "salary": 2200
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
select zs_test_son2.id as "ZsTestSon2-id" ,salary as "salary"  from  zs_test_son2 , zs_test  where   zs_test.id=zs_test_son2.zs_test_id and zs_test.id='5260c8c5-47f2-4890-aff3-6b4fd5fb62f0'
```