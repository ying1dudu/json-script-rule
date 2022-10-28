博客地址：https://www.jianshu.com/u/9d71fe6dcbde
#### 前言
目前市面上的开源框架非常的多，也有很多的工具供我们选择，这些框架和工具可以使我们的开发越来越简单化，越来越快速化。然而尽管如此，由于每一款架构设计的不同，所能提供的功能也可能存在一定的片面性或不易用性，且大多数的开源框架都是来自于国外，无论是在学习成本还是在语言的沟通上，亦或者在使用上都或多或少的存在着一些不舒服的地方。除此之外，对于本该复用的组件几乎是每做一个项目便有一套新的代码，公司与公司之间封装好的功能也不能完全的相互复用，这样不仅浪费了大量的人力资源，对于代码本身的性能也是极大的考验。为了能够更直观的看出问题所在，我在这里简单的罗列了一些存在的缺陷
1. 虽然目前有自动生成代码的工具，但其仍然需要配置，且代码虽然生成了，但是也造成了大量代码堆积在项目中，每当你打开一个文件夹都会展示出大量的文件，一旦模块多起来，不仅臃肿而且后续的优化和维护也会变得十分困难
2. 一旦功能有所变动，如仅仅只是更改了一个查询的字段，可能还需要去改动代码才能实现
3. 这个很重要，如公司与公司之间已封装过的功能无法相互复用，举个例子，A公司用的A框架，B公司用的B框架，A公司写了一个导出的功能，到了B公司可能就没法使用了，缺乏一个统一的接口
4. 如果后端的代码发生了更改，可能还需要重新打包重新部署等一系列相对麻烦的操作
5. 框架一旦使用了，对于代码的耦合性就会变得非常强，不能灵活更换
6. 通常完成一个业务功能模块可能不光需要一个代码生成工具，此外可能还需要在项目中导入其它jar包，导致项目依赖过多的jar包，一旦某一个jar包升级或是因为某些原因出现问题，光是排查就要耗费大量的时间，而且还会导致代码的更改，同时还要控制好包的版本，避免出现多个版本导致的方法找不到等常见异常

**json-script-rule**是一个低码框架，它比较突出的一个特点是**可以通过自定义json脚本的语法来动态的实现后端的功能，与此同时随着框架的不断升级，框架内置的功能也会提供给使用者一些脚本，如增删改查，上传，导入导出，主子表等等**。开发者可以通过这些脚本，直接实现一个功能，且是动态的功能，如更改一个查询的字段，可以直接在json的脚本上更改就可以了，不需要去动后台的代码，此外，**作为前端开发的朋友，如果你也懂一些sql语句，也是可以调动后台数据库的，省去了前后端联调的麻烦**。
其实任何后台接口的开发无外乎都是两个东西，一个是前端传递过来的参数，而另一个则是后台的程序逻辑，json-script-rule的本质实际上是将参数对象化后再通过框架提供的扩展接口对程序的逻辑进行封装，将其打包成一个个可以通过json脚本来控制程序逻辑的动态规则，后续我们只需要通过json参数的调整便可以快速的开发功能了，这样一来不仅可以有效的提高程序的质量以及复用性等，而且框架内置的一些功能作为开发者可以直接使用。除此之外，源码里面有大量的spring框架开发参考实例，包括一些自己写的工具类，很多都是强迫症似的代码设计，注重实用以及性能，可以节约大量时间去网上搜索那些转载的或不靠谱的资料，因此基于以上所说的，感兴趣的朋友可以关注一下。
#### 介绍
**json-script-rule**，是一个可以直接使用json脚本进行**动态接口**开发的框架（jar包），它的设计依赖于两个重要的概念，一是前后倒置，二是面向规则，**其原理无外乎就是将参数封装成一个复杂的对象，在处理逻辑中去处理这个复杂对象的各个参数，最终封装成一个类，这个类就是代表一个规则场景的插件，譬如说查询插件就是一个名为JSRuleGet类，这个类插件被集成在了JSRuleAction这个动作库之中。**这个插件是框架内置的功能插件，后续将会介绍如何自定义开发一个自己的插件。
- **前后倒置：**是指后端的java代码由前端的json脚本来替代，前端通过json的body来动态的请求框架的功能模块，进而得出相应的结果，因此可以说只需要简单的几秒钟便能开发出一个简单的功能，也正因为如此，即便你是一个前端开发人员依然也能构建出一个相对复杂的crud的执行结果
- **面向规则：**将一些相同的业务场景封装成一个个规则，通过这些规则来达到一个通用性和复用性的效果，如框架内置的crud操作便是基于此开发出来的，将其打包成一个个规则插件放入库中，后续只需在json脚本中操作即可，此外框架除了内置的功能规则插件外也提供自定义开发脚本的接口，以便于开发者自己定义插件，也就是说如果我们愿意，后续可以不断的增加类似这些规则的功能，不断的扩大json脚本的语法，这些语法可以基于同一个接口，因此**如果您基于此接口开发出的功能可以上传至互联网供其他人所使用**。
目前插件支持 **mysql，postgresql，kingbase，oracle（6,8,10）** 数据库，如果你是kingbase数据库，这里还提供了其jdbc的包
crud操作支持函数，分组，关联，逻辑和视图查询**等等，可满足绝大部分的场景需要。
插件地址：https://gitee.com/ying1dudu/json-script-rule-jar.git
##### 优点
1. 开发一个后台功能不需要在spring里创建接口，不需要写任何java代码，只要你懂简单的json格式，sql语法，便可以通过引擎解析json结构来开发接口，即使你不是一个后端开发者也可以做到这一点
2. 面向规则开发，可以通过该框架约束你的代码，将一些凌乱的代码组织成一个个具有相同规则的业务逻辑封装起来，后续进行复用，这种方式能够有效的提高代码复用性，规避bug风险，节约开发时间成本。
3. 项目即便是上线后，也可以通过脚本动态的调整功能，不需要打包重新部署。
4. 轻量级容器，当前版本整个jar包不超过200kb
5. 支持扩展，如模型扩展，处理器扩展，且提供多个可实现的接口和继承类，可从各个层面进行切入处理
6. 采用分离式设计，不耦合于主项目的bean配置，例如mybatis配置sqlSessionFactory，pagehelper配置分页等，插件中的配置属性与主项目的完全分离，互不干扰，无论是在pom中直接引用starter或是单独的包，或是代码中去实现的配置属性，均不产生耦合
7. 对于包的管理依赖于主项目的pom配置，插件不会引入新的包及版本，除非是必要的包且主项目中没有的情况
8. 日志做的十分细致，对于操作或代码层面的错误能够通过日志信息快速定位问题
9. 采用以空间换时间的方式优化性能，对于一些常用对象进行了缓存处理，且每次请求都有二级缓存处理，在自定义开发过程中可以直接使用
10. 支持mysql,postgresql(包括kingbase),oracle数据库，支持函数，分组，关联，逻辑，视图及插件自带的指向性查询等，功能非常健全
11. 提供二次开发自定义所需的注解，工具类，配置信息，接口等，可简单的通过继承，实现，注解，配置等方式快速进行自定义开发
12. 支持加密处理，目前仅支持国密sm2非对称性加密(集成hutool包处理)
13. 有效的安全性处理，杜绝sql注入等
14. 源码中很多实现方式参考了大量网上资料，并最终结合自己的设计以最优雅的方式解决问题，同时也提供了很多网上查找不到的一些通用的完美解决思路
15. 由于是通过json进行开发，因此在开发的同时也会将参数文档一并写出来，节约了大量的时间
16. 由于插件本身就是容器，因此不依赖于主项目的框架，更换框架也可以正常使用（但依赖于主项目配置的数据源），简单来说就是跨框架的，只要你的项目中用的是spring，其它的框架与该插件是完全解耦的
17. 全新的开发思想，将开发的主导权释放给使用此框架的人，每个开发者都可以定义自己的json脚本，框架提供各种参数以及缓存方法来支持自定义开发
18. 国人自主研发，本地化做的比较好，关键的是通过框架可以有效的屏蔽其它框架的复杂性，比如mybatis，而且后续框架内置的功能会不断的增加，有效的减少了自定义开发的成本
19. 通过自定义模型（实现IJSRuleActionModel的类），最终可打包成一个插件类，该插件类可以在任何框架任何公司之间相互复用，可发布到网上，并说明其json语法的使用
##### 缺点
1. 可能存在一些未知的问题
2. 仅支持post请求
3. 仅支持单数据源
4. 不支持webflux
#### 插件主要依赖说明
**jdk版本：jdk8及以上**
**强依赖：spring框架，lombok插件**
**注意：mysql，postgresql，kingbase，oracle（6,8,10）** 其jdbc的包以及版本将由开发者主项目中的pom所提供
#### 安装说明（将jar包引入即可）
1. 由于目前没有发版到maven远程仓库，因此需要下载jar包并放入本地maven库里，之后在maven中引用该jar包的依赖
插件地址：https://gitee.com/ying1dudu/json-script-rule-jar.git
```
<dependency>
  <groupId>edi.zs</groupId>
  <artifactId>json-script-rule-spring-boot-starter</artifactId>
  <version>0.0.1-SNAPSHOT</version>
</dependency>
```   
2.  **如果你不使用框架内置的crud功能，那么此步可以跳过**，这里为了演示，所以在application.yml（yml和properties等文件类型都可以）中配置了po包路径，这里的po你可以理解为orm框架中java映射数据库表的对象，属性为location，如下
```  
edi:
  script:
    location: edi.business.po
```  
po包我这里测试的时候路径为edi.business.po，关于其它可用的配置属性将会在后面详细说明，**可以使用active指向其它配置文件，属性以继承的方式将两个配置属性合并为一，冲突的属性以后者为主**

**至此，插件的安装就结束了，非常简单，其实只需要依赖一下jar包就可以了**

**提示**：po包里面的类都是映射数据库表的类，这和普通的orm框架里的映射对象并没有什么区别，你可以在mybatis自动生成的po对象上去加插件的注解，其使用方式也是非常简单

#### 使用说明
由于插件的功能比较多，此处只简单说明最基本的用法，后面将会推出更为详细的文档说明，实例中为了配合说明，有很多都是不规范的命名，如多加了两个空格，如有下划线等  
1. 配置po类，示例如下  
```
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
```
```
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
```
这里的类名字是随意起的，注解里的属性也是最基本的属性，你可以理解ZsTestPO是第一个表关联的类，ZsTestUpdate 是第二个表关联的类  
####参数说明：  
- **pk：**设置主键（目前仅支持单主键，不支持复合主键，也不提议使用复合主键）  
- **fk：**设置外键，这里的值对应的是**类的名字**,其路径是在 **location** 属性所配置的路径下的位置开始，如果有包名则加上包名(**位置依旧以location属性配置的路径开始**)，例如xx.ZsTestPO  
- **fieldName：**表示对应数据库的表字段名,如果没有配置则默认认为java字段名即为数据库表字段名  
- **alias：**表示数据库表字段的别名，如果设置了则会以别名的形式返回给前端  
- **imports：**设置导入时，模板文件头部行对应的列的字段名，后续将会在导入规则中详细说明
- **exports：**设置导出时，如果没有设置模板，将会使用此属性进行默认导出列的头
2. 启动开发者自己的本地项目，并用postman进行测试  
```http://localhost:8012/api/json/rule/start```
（注：/api是context-path配置，没有则不写，后面的/json/rule/start是固定的路径，该路径也可以自定义，如果不需要返回值的则可以访问/json/rule/end）  
```
16:19:49.950 [main] INFO  e.r.f.s.s.JSRuleCache - [initCache,78] - init JSRuleCache
16:19:50.002 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,70] - IJSRuleProcessor=edi.rule.processor.JSRuleJsonProcessor
16:19:50.002 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,71] - mapperType=edi.rule.frame.mybatis.dao.MapperForMysql
16:19:50.002 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,72] - mappingClasses=edi.business.po
16:19:50.003 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,73] - rootPath=D:\workspace\json-script-rule\rule
16:19:50.638 [main] INFO  o.a.c.h.Http11NioProtocol - [log,173] - Starting ProtocolHandler ["http-nio-8014"]
```

3. 通过postman请求接口，json如下  
```
{
    "rule": {
        "actions": [
        	{
        		"name": "asd",
        		"get": {
        			"classes":["ZsTestPO"],
        			"matches":{
        				"equal":{"id":["1"]}
        			}
        		}
        	}
        ]
    }
}
```
####参数说明：  

- **classes：**表示关联的类的相关信息，也就是相关联的表的信息，这里的ZsTestPO是类名而不是表名
- **name：**rule的name以及action的name均为唯一标识
- **get：**表示此次操作为查询动作
- **matches：**表示条件，查询id等于1的数据

返回结果如下
```
{
    "code": "200",
    "msg": "操作成功",
    "result": {
        "action->asd:": {
            "pageNum": 1,
            "pageSize": 10,
            "totalPage": 1,
            "totalCount": 1,
            "datas": [
                {
                    "ZsTestPO": {
                        "sum_test_field": "asddsa",
                        "birthDay": "2020-11-18 00:00:00",
                        "name": "bbb",
                        "id": "1"
                    }
                }
            ]
        }
    },
    "log": "startWithTimeRes耗时：14毫秒"
}
```
