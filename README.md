#### 前言
工作了很多年，也去过很多公司，接触到的大部分功能都是与业务相关联的，有的复杂，有的简单，市面上的开源框架也用过很多，但是都没有简单到可以不去写接口的地步，即便是一个简单的查询功能也要在后台去做一个接口，这样不仅低效，而且当接口或代码量增加的时候维护起来也是相当的麻烦，即便是修改些东西也要重新打包部署，一点都不够灵活，于是经过三个多月的努力，架构，设计，开发，最后再到测试，反复的修改并重新设计后，最终开发出了这款利用json格式来进行动态接口开发的插件（感觉有点像elasticsearch）。写此博客一来是决定将这个插件开源，为开源事业贡献出自己的一份力量，二来也是为自己做一个笔记，这里面有大量的spring框架开发参考实例，包括一些自己写的工具类，很多都是很难找到的一看就通透的而且很实用的干货，避免浪费时间再去网上搜索资料。后续我会一点一点的把所有关于插件的用法，配置，二次开发，以及源码一点一点的通过博客发表出来，感兴趣的朋友可以关注一下。
#### 介绍
**json script rule**，是一个可以直接使用json脚本进行后台逻辑操作的插件（jar包），类似一款低码插件包，依赖此插件可在前端请求时在其请求体中使用json格式并按照指定规则或自定义规则进行操作便可达到动态开发接口的目的，这些操作通常是一些crud的操作，通过插件的引擎解析json最终将动态数据返回给前端，只要懂简单的sql便可进行项目的开发，即便你是一个前端的程序员，此外通过插件包还可以提高代码的复用减少程序的代码量，高效开发项目，其优势下面将会提到。
目前插件支持 **mysql,postgresql(包括kingbase),oracle（oracle尚未详测）** 数据库  
此外支持 **可扩展定制规则，sql层支持函数，分组，关联，逻辑和视图查询**等等，可满足绝大部分的场景需要，后续将会上传maven，暂时需要下载插件包支持
插件地址：https://gitee.com/ying1dudu/json-script-rule-jar.git
##### 优点
1. 完全不需要写接口，只要你懂简单的json格式，sql语法，便可以通过引擎解析json进而将数据返回给前端，即使你不是一个后端开发者也可以调出数据
2. 项目上线后可以直接通过更改前端请求的json主体进行功能层面的调整，无需改接口，打包，部署等，非常的灵活
3. 高复用代码结构，可减少项目中代码量，轻量级的实现一个大型项目
3. 依赖于spring的轻量级容器，整个jar包不超过150kb
4. 支持扩展，如模型扩展，处理器扩展，提供多个可实现的接口和继承类，可从各个层面进行切入处理
5. 采用分离式设计，不依赖于主项目的配置，即便你是新建的一个什么都没有的白板项目也能够通过插件获取数据，插件中已经配置好了自己的属性，如mybatis配置sqlSessionFactory，对应插件pagehelper等，插件中的配置属性与主项目的完全分离，互不干扰，例如mybatis的mapperLocation，pagehelper的pageSizeZero属性等(无论是在pom中直接引用starter或是单独的包，或是代码中实现的配置属性，这几种方式均适用)
6. 不会过多的引入新的包，插件会引用主项目上包的版本，如果主项目中未引用依赖，插件会引用自身定义的依赖版本进行依赖，其依赖说明在下面会提到
7. 支持自定义规则，可将一些逻辑代码植入规则中，通过前端传入指定规则标识后触发这些逻辑片段，进而改变单一的引擎所提供的固定功能
8. 日志处理的相对细致，对于操作或代码层面的错误能够快速定位问题
9. 采用以空间换时间的方式对于一些性能做了些相应的处理
10. 支持mysql,postgresql(包括kingbase),oracle数据库，支持函数，分组，关联，逻辑，视图及插件自带的指向性查询等  
11. 提供二次开发自定义所需的注解，工具类，配置信息，接口等，可简单的通过继承，实现，注解，配置等方式快速进行自定义开发
12. 支持加密处理，目前仅支持国密sm2非对称性加密(集成hutool包处理)
13. 有效的安全性处理，杜绝sql注入等
14. 源码中很多实现方式参考了大量网上资料，并最终结合自己的设计以最优雅的方式解决问题，同时也提供了很多网上查找不到的一些通用的完美解决思路
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
![maven.png](https://upload-images.jianshu.io/upload_images/28173801-54f3c841701fdd4b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
**注意：**类似mysql配置数据源的时候，由于版本的差异，早期的driverClassName为com.mysql.jdbc.Driver，这里引用的是8.x的版本，所以driverClassName应为com.mysql.cj.jdbc.Driver，需注意数据源的配置
#### 安装教程
1.  在你的项目中添加此插件的jar包，外部jar包或将jar包放入maven本地仓库中并引用依赖
本地路径：**\edi\zs\rule\0.0.1-SNAPSHOT\rule-0.0.1-SNAPSHOT.jar**
插件地址：https://gitee.com/ying1dudu/json-script-rule-jar.git
```
<dependency>
  <groupId>edi.zs</groupId>
  <artifactId>json-script-rule-spring-boot-starter</artifactId>
  <version>0.0.1-SNAPSHOT</version>
</dependency>
```   
这里引用的是快照版，由于上传到maven远程中心库比较麻烦所以就懒得弄了，后续如果用户量上来了有需要了再去弄，jdbc相关依赖
```
<dependency>
  <groupId>com.oracle</groupId>
  <artifactId>ojdbc6</artifactId>
</dependency>
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
</dependency>
<dependency>
  <groupId>com.kingbase</groupId>
  <artifactId>kingbase8</artifactId>
</dependency>
```
这里为了支持kingbase（postgresql语法），还需要下载kingbase的jdbc包，我会在插件地址中预留这个jar包，下载好放到本地仓库的对应位置即可（com\kingbase\kingbase8\8.6.0\kingbase8-8.6.0.jar）  
2.  在resource目录下创建META-INF文件夹，在其中创建spring.factories文件
(这里是按照spring创建starter的步骤创建插件的starter)  
在文件内容中增加一行代码:**org.springframework.boot.autoconfigure.EnableAutoConfiguration=\edi.rule.config.JSRuleStarterConfig**  
3.  在resource目录下创建rule.properties文件，这个是配置文件，如果你采用的是插件中默认的json处理器则需要在这个配置文件中配置po类的包所在的路径(相对路径) ，如图
js.rule.mapping.classes.location=test.po  
![po配置.png](https://upload-images.jianshu.io/upload_images/28173801-5eb2a8af13a023c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![spring.png](https://upload-images.jianshu.io/upload_images/28173801-a91c8b58b8ea2eb2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\edi.rule.config.JSRuleStarterConfig
```
此处的test.po包下面的类类似于mybatis中的po类，**是与数据库表进行关联映射的类包的位置**，你也可以在原有的po类对象中使用注解JSRuleRelationTabe注解进行标识(前提是要指定上面所示的路径)  

#### 使用说明
由于插件的功能比较多，此处只简单说明最基本的用法，后面将会推出更为详细的文档说明  
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
这里的类名字是随意起的，你可以理解ZsTestPO是第一个表关联的类，ZsTestUpdate 是第二个表关联的类  
####参数说明：  
pk：设置主键（目前仅支持单主键，不支持复合主键，也不提议使用复合主键）  
fk：设置外键，这里的值对应的是**类的名字**,其路径是在 **js.rule.mapping.classes.location** 属性所配置的路径下的位置开始，如果有包名则加上包名(**位置依旧以属性配置的路径开始**)，例如xx.ZsTestPO  
fieldName：表示对应数据库的表字段名,如果没有配置则默认认为java字段名即为数据库表字段名  
alias：表示数据库表字段的别名，如果设置了则会以别名的形式返回给前端  
**注意**：前端以及后端所有的操作规则均面向java对象及字段，对于字段上的关联数据库的注解并不相关
**提示**：配置类中的get/set方法并不是必须存在的  

2. 启动本地项目，用postman进行测试  
```http://localhost:8012/api/js/rule/engine/start```
（注：/api是context-path配置，没有则不写，后面的/js/rule/engine/start是固定的路径，也可以自定义，参考配置文件属性，后面将会说明）  
```
18:05:17.802 [main] INFO  e.r.f.s.s.JSRuleCache - [initCache,75] - init JSRuleCache
18:05:18.007 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,67] - IJSRuleProcessor=edi.rule.processor.JSRuleJsonProcessor
18:05:18.007 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,68] - mapperType=edi.rule.frame.mybatis.dao.MapperForMysql
18:05:18.008 [main] INFO  e.r.f.s.s.JSRuleInit - [printInfomation,69] - mappingClasses=test.po
18:05:19.794 [main] INFO  o.a.c.h.Http11NioProtocol - [log,173] - Starting ProtocolHandler ["http-nio-8012"]
```

3. 通过postman请求接口，json如下  
```
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
```
####参数说明：  

1.  relations：表示关联的类的相关信息
2.  name：rule的name以及action的name均为唯一标识
3.  get：表示此次操作为查询动作

返回结果如下
```
{
    "code": "200",
    "msg": "操作成功",
    "result": {
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
```



