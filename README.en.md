## brief description
### Preface
The project is a low-code design framework. The project started in December 2021 and was first released on github in April 2023. At the same time, it was synchronized to the remote maven repository. After nearly a year of iteration, the framework has now matured and is ready to update subsequent versions on github starting in February 2024. Currently, the more stable versions are 4.4 and 5.0. Version 4.4 is mainly used for projects below Java 8 and Tomcat 9, while 5.0 is for projects above Java 8 and tomcat 10. The only difference between the two versions is that they have different versions of Tomcat and JDK. support.

### introduce
json-script-rule is a **low-code design framework**. The reason why it is called a design framework is because it is more inclined to the design and splitting of programs. **By encapsulating some common program fragments into plug-ins , and then call them to implement some more complex application scenarios. The encapsulation is implemented on the backend, but the caller is not sure. It may be the frontend or other application services. The calling method is a json script. Various parameter instructions are entered in the json string and sent to the back-end plug-in for processing. The entire calling process feels somewhat similar to imperative programming, and this is what makes it unique**. However, to realize this refreshing development model not only requires the use of this application framework, but also requires developers to have a certain ability to abstractly design plug-ins, be able to reasonably design and encapsulate some code fragments, and finally coordinate multiple code fragments to complete various functions.

To understand the json-script-rule application framework, you first need to understand two important ideas, as follows:
- **Script call:** refers to the back-end java code snippet that is called by the caller through json script instructions.
- **Rule-oriented: **Rule-oriented programming is actually a programming idea. Developers need to abstractly design some code snippets in advance into separate plug-ins to provide to callers to meet various different needs, and ultimately achieve imperative development style.

### Advantage
Compared with the traditional development model, the json-script-rule application framework has the following nine major advantages:
1. Cross-application: It is independent of the project application framework. For example, whether your project ORM framework uses jpa, mybatis, or hibernate, it will not have any impact on each other.
2. Low code: Different from traditional development, it adopts imperative programming ideas, so it often only takes a few seconds to develop a function, so it is better than the traditional development model in terms of development efficiency and use, not limited to code readability and scalability.
3. Release-free:When adding or modifying functions, you only need to adjust the json string instructions. Therefore, the changes are made on the calling side rather than on the server side that encapsulates the plug-in, so there is no need to publish it.
4. Cross-project: The packaging design of plug-ins is usually based on actual business scenarios, so the design of plug-ins should be universal and not limited to one project. With the help of this application framework, any developer can encapsulate himself The plug-in is open sourced for use by other projects, and all that is needed is to write a java class.
5. Lightweight: Because it is low-code development, it will not generate po vo dto like the traditional development model, or even include a large amount of irrelevant code such as mapper mapstruct, etc. This will make our application simple and Lightweight.
6. Low coupling: The plug-in is not coupled to the business code in your project. You can think of it as an external plug-in, so these external plug-ins can be plugged in and out at any time, and these plug-ins can be customized and developed by you.
7. Pay attention to design: json-script-rule is a programming framework that can help developers improve the quality of code, simplify business complexity, enhance developers' abstract thinking, and solve project problems once and for all.
8. Full functions: The framework has many built-in functions, such as query, modification, addition, deletion, import, export, encryption, signature, data desensitization, log internationalization, RPC calls, custom development components, etc., in addition , new functions and plug-ins will be continuously launched in the future to provide developers with convenient development methods and reduce costs and increase efficiency for enterprises.
9. Cross-language: Since the caller of the plug-in can be any application that uses json, not only front-end developers, but also users of other languages ​​​​can use json scripts to call. The returned json result contains logs, which can be passed Log to understand the calling status of the plug-in. If you are a front-end developer, using these packaged plug-ins can reduce the cost of communication with back-end personnel, allowing a front-end developer to become a full-stack developer.

### shortcoming
1. Only supports single data source. Only one data source can be specified under multiple data sources.
2. Using space for time, a small amount of memory space will be occupied after the project is started.
3. The design of custom plug-ins is relatively complex and requires developers to have certain abstract analysis capabilities.

### illustrate
In order to more fully demonstrate the charm of json-script-rule, some commonly used built-in plug-ins are used to illustrate, such as crud plug-ins. Currently supported databases include mysql, oracle, and postgresql. **Since the essence of these crud plug-ins is to assemble sql statements**, databases that support these database syntax can also be supported in theory, such as tidb, doris, etc. that support mysql syntax. , such as kingbase that supports postgresql syntax, etc.

### Dependencies
**springboot**
**lombok**

### Install
1. Introduce dependencies (jdk8, tomcat10 and below, the corresponding version is 4.4, jdk8, tomcat10 and above, the corresponding version is 5.0)
```
<dependency>
    <groupId>io.github.ying1dudu</groupId>
    <artifactId>json-script-rule-spring-boot-starter</artifactId>
    <version>5.0</version>
</dependency>
```
### Configuration
1. **If you do not use the built-in crud plug-in function of the framework (including the import and export and master-child table plug-in that reference the crud plug-in), then this step can be skipped**
Configure the root directory of the entity class package in the application, and the attribute is locations (version 3.2.4 and later supports multi-path scanning, multiple ones are separated by commas), as follows
```
edi:
  rule:
    locations: package.package
```
**Note:** If the module does not use a database, and the application does not configure spring.dataSource, you need to exclude the automatic configuration class, such as
```
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
```
or
```
spring:
  autoconfigure:
     exclude: org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```
**Note: **locations can point to one or more directories. Try to avoid multiple root directories containing the same package name + class name. If direct class name conflicts cannot be avoided, you need to write the fully qualified name of the class, otherwise Only direct class names can be used, and subdirectories can also be created in the root directory. The entity classes in the subdirectories need to be prefixed with the package name when used, as follows.

```
{
    ......
    "relation":{
        "classes":["package.ZsTestPO"]
    }
}
```
**Tip: If the spring.profiles.active property is configured in the current configuration file, the child application will overwrite the parent application property**
### use
For the sake of demonstration, a lot of non-standard code naming is deliberately added in the following example, such as adding a few extra spaces, underlines, etc.
1. Configure two entity classes, the example is as follows
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
**Tips: When performing crud operations, all json scripts are oriented to the back-end java classes rather than the database tables**, so although there are 10 fields in the table, only 8 fields are configured in the entity class, then In the end, only these 8 fields can be used. In addition, redundant fields are allowed to exist. Fields that do not participate in crud operations can be ignored through the ignore attribute in the JSRuleCrudField annotation.

**since version 4.0, developers are required to consider the control of plug-in permissions**. Here to demonstrate directly rewriting the plug-in permission method and returning true, as follows (for details, please refer to the description of the custom development and permissions chapters)
```
public class JSRuleGetCustomModel extends JSRuleGet<MyActions>{
	@Override
	public boolean isOwner(Map<String,Object> params,Set<String> roles) {
		return true;
	}
}
```
Finally, you need to define an Action warehouse to load all customized plug-ins. Here you need to add the @Component annotation to the warehouse class to register it as a spring bean. The code is as follows
```
@Component
public class MyActions extends JSRuleAction<MyActions>{
	public JSRuleGetCustomModel get;
}
```
Here you need to rewrite the get field of the parent class to replace the framework’s built-in get plug-in.
### Configuration parameter description
####JSRuleTable
- **name：**Database table name
- **view：**The sql statement of the view. When this attribute exists, the name attribute represents the alias of the current view.
- **permit：**Which CRUD operations are allowed on the table corresponding to the current class. The default is to allow all operations.
- **roles：**Which roles are allowed to perform CRUD operations in the table corresponding to the current class. The default is to allow all roles.
####JSRuleCrudField
- **pk：**Set the primary key. Composite primary keys are not supported. They are used for default table association operations and are not necessary.
- **fk：**Set the foreign key, the value is **direct class name**, which is the class name under the root path configured by the **locations** attribute
- **name：**The field name of the database table, the default is java field name
- **alias：**The alias of the database table field. If an alias is set, the field will be returned as an alias.
- **ignore：**Ignore crud cache processing of this field
- **imports：**When using the import plug-in, set the field names of the tables corresponding to the header row of the default import template file.
- **exports：**When using the export plugin, set which columns to export by default without a template
- **dependent：**Used to set the dependency relationship between the master and sub-tables. When using the master-sub table, the field values ​​of the sub-table will be obtained from the corresponding fields of the main table.
2. Start the local application and use postman to test
```http://localhost:port/context-path/json/script/start```
```
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,42] - action=test.rule.MyActions
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,47] - mapper=edi.rule.frame.mybatis.dao.MapperForMysql
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,49] - fields=test.rule.MyFields
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,50] - functions=test.rule.MyFunctions
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,51] - result=test.rule.TestJSResult
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,52] - handler=test.rule.RuleExtend
18:57:57.682 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,53] - locations=test.dao.po
18:57:57.683 [main] INFO  e.r.f.s.c.JSRuleBeanPost - [printInformation,54] - rootPath=/Users/jsrelandwind/Desktop/workspace/json-script-rule-test
```
3. Request the interface through postman, the json is as follows
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
### Request parameter description
- **classes：**Direct class name, indicating which database tables are accessed
- **name：**The unique identifier of the action, used to distinguish the return results after the action is executed. Multiple actions cannot have the same name.
- **get：**The name of the query plug-in built into the framework
- **where：**Alias ​​of matches attribute, indicating query conditions
- **fields：**Represents an array of field names to be queried. These field names are the field names of the Java class.
- **groupShow：**This attribute can be used to display the data of the two tables separately during multi-table joint query. The default is false.
The return result is as follows
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
The parsed sql is
```
select name as "name" ,salary as "salary" from  zs_test  where zs_test.name='ccc'
```
****
**Tip 1: **Each attribute in json corresponds to a class under the edi.rule.model package. If you are unclear about the attributes of some built-in plug-ins, you can find the answer through these objects
**Tip 2:**Since ORM uses mybatis, you can configure mybatis to print sql. For specific operations, please refer to the instructions in the configuration chapter. In addition, you can return sql to the result set by setting the execute attribute to false, or you can customize the logic by overriding the beforeSql method.
## Add, delete, modify
### add plugin
The following is the operation of inserting data using the add plug-in. The second action uses the query plug-in to check whether the insertion is successful.
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
This is for demonstration, so the json string looks very complicated, but in fact, you only need to use the class attribute and data attribute to complete a simple insertion operation.
#### Parameter Description
- **class：**Corresponding entity class name, DML type operations can only target one table
- **uuid：**For which columns uuid values ​​are generated
- **snowFlake：**Snowflake ID
- **defaults：**Default value for data column
- **required：**Verify whether the field value exists, executed after the defaults attribute
- **calculate：**Calculate the mathematical formula in the string, the field in the <> symbol is the referenced field variable value
### edit plugin
The following is a json use case. Change the name value of the table field corresponding to the ZsTestPO class to ppp. The query condition is data whose name is aaa or mmm.
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
#### Parameter Description
- **set：**It has the same meaning as set in the update statement, where key is the column name and value is the value to be modified.
- **editAll：**Whether to ignore conditional restrictions and allow modification of all data. The default is false. When it is false, the condition attribute cannot be empty.
The sql generated by the json script in the background is as follows
```
update zs_test set name='ppp' where name='aaa' or name='mmm'
```
Returned results
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
### delete plugin
json use case
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
The sql generated by the json script in the background is as follows
```
delete from t_bank where id in  ('303','306') 
```
Returned results
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
#### Parameter Description
- **deleteAll：**Whether to ignore conditional restrictions and allow deletion of all data. The default is false. When it is false, the condition attribute cannot be empty.
## Ordinary query
### get plugin Parameter Description
#### condition
- **matches：**Alias ​​where, indicating query conditions
- **type：**Represents the union and or relationship between multiple conditions, only and values ​​or or values ​​are allowed, and the default is and
#### matches description
All matching condition attributes are ordered
- **eq：**equal，Represents "=" symbol
- **ne：**not equal，Represents "!=" symbol
- **in：**in keyword，For example field in ('qqq','xxx')
- **ni：**not in keyword
- **li：**You can manually add the % symbol in front or behind
- **nl：**not like
- **gt：**greater，so the field value corresponding to gt should be the smallest
- **ge：**greater or equal to
- **lt：**less than，so the field value corresponding to lt should be the largest
- **le：**less than or equal to
- **to：**Used for subqueries, views, etc. e.g. in (select ......)
- **br：**brackets， are used to handle the conversion of unions and or relationships between conditions.
#### bracket illustrate
Ambiguity occurs when and and or exist in parallel, such as A and B or C, it can be (A and B) or C, or A and (B or C). In order to support the existence of this SQL scenario, you can use The bracket is reversed. The AND or logic between the conditions inside the bracket should be the same, while the AND or logic between the conditions outside the bracket should be exactly the opposite, and so on. In this way, complex problems can be effectively solved. AND or logic between conditions
#### relation
Association relationship object, this object is required for single table or multi-table joint query. It represents the association between tables and contains the following three attributes.
- **classes：**Corresponding to the name of the java class, it is an array that allows querying multiple tables
- **joins：**Indicates that this query is related using the join method. It is an array of join objects. Each join object in the array represents a table to be added to the join query. It is worth noting that when this attribute exists, there should be only 1 class in the classes attribute array. The object represents the main table, such as A left join B, A is the main table
**join**：The class attribute in this object represents the subtable to be added to the outer join query. The value of the type attribute can only be inner, left, and right, indicating whether inner join, left join, or right join is used for outer join query between A and B. The default is left. The conditions attribute represents the association conditions between A and B, such as left join on..., if this attribute does not exist, by default, the primary foreign key configured in the entity class is used to associate A and B.
- **condition：**This attribute is an attribute in the relation object rather than the attribute in the join object. If the attribute is empty, it defaults to the primary foreign key configured in the entity class for association. If it exists, the object is used as the association condition to associate the table. It It is equivalent to the conditional statement after where. It does not conflict with the condition attribute in the joins attribute. The condition in joins means on, and the condition in relation means where. For the specific relationship, please refer to the edi.rule.model.JSRuleRelations object.
**Note: **The condition in the relationship object only represents the association condition between tables. It does not conflict with the condition in the get plug-in. The condition attribute in the get plug-in can replace the condition attribute in the relation object.
#### union
Corresponding to the database keyword union, it is an array in the get plug-in, indicating that multiple query results can be "union"
- **type：**It is divided into two attributes: union and all. The former represents union and the latter represents union all. The default is all attribute.
- **pointer：**Represents a point. This point can be a table, a subquery, or a dynamic view. In short, it represents a query result. Here it represents a query result of the desired union, that is, A union B
#### pointer
This attribute represents a query result set
- **class：**Indicates that the result set is a table, and the corresponding value is the name of the entity class
- **action：**Indicates that the result set is a SQL statement, which is a SQL statement parsed by the previously executed action. The value of this attribute is the name of "action"
- **view：**Indicates that the result set is a view, and the value is the name of the view, which is the value of name in the JSRuleTable annotation.
#### profile
This attribute is used for one-to-many or many-to-one queries. It is somewhat similar to the collection tag of mybatis. It can describe the master-child relationship between the multiple tables being queried, and the master-child relationship can be reversed.
- **cClass：**The class name of the main table, alias c, cannot be empty
- **mClasses：**The set of sub-tables of the main table, alias m, when empty, indicates that the current table is a leaf node in the hierarchical structure
#### get plugin Attributes
- **fields：**Indicates the field to be queried. When this parameter is empty, it means to query all fields. If two classes in a request contain the same field name, the prefix name of the class needs to be added to distinguish it.
- **group：**Group object, which contains two attributes: having and by
- **order：**Sorting object, including sorting fields and sorting methods (asc or desc)
- **convertSql：**Whether to generate sql statements based on json scripts. It is enabled by default. When you do not need the system to parse json scripts and generate sql statements, you can set the property to false.
- **execute：**Whether to execute the sql statement generated by the json script. The default is true. If it is false, the generated sql statement will be returned. It is usually used for subqueries or viewing sql statements.
- **page：**Paging object, its properties include pageSize, dataSize (number of data on the current page), pageNum, totalPage, totalCount
- **groupShow：**Whether to display in grouped form, the default is false, usually used to distinguish which table a field belongs to when querying multiple tables
#### Use case 1
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
**Note:** When using the profile object, the fields attribute must contain **the primary key field with the prefixed class name**
#### Use case 2
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
The sql generated in the background is as follows
```
select sysdate() as "asd" ,current_date as "current_date" ,suibian.test_field as "view_ZsTestView-test_field" ,zs_test.test_field as "ZsTestPO-sum_test_field" ,birth_day as "birthDay" ,create_date as "create_date" ,zs_test.id as "ZsTestPO-id"  from  zs_test  left join  (select * from zs_test_son1 where oh_no='son1_1' and id like '%1%') suibian on zs_test.id=suibian.zs_test_id where zs_test.name='ccc' and birth_day>'2021-02-02'
```
**Tips:** The use of union, pointer and other objects will be explained in the chapter of advanced query
## Advanced Search
### illustrate
The built-in query plug-in of json-script-rule supports most SQL scenarios, including left join, view, function, union, where, subquery, grouping, sorting, etc.
The following is a use case to show how to use a complex json query command. Developers can better understand its usage by comparing the parsed sql.
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
Parsed sql
```
select substr(zs_test_son2.name,'1','5') as "qwe" ,current_date as "kkks" ,now() as "now" ,'kow' as "ZsTestPO-id=mkjk" ,zs_test.id as "ZsTestPO-id" ,zs_test.name as "bieming"  from  zs_test_son2 , zs_test  where zs_test.id=zs_test_son2.zs_test_id and (((zs_test.bonus>=abs(zs_test.bonus) or now()=zs_test.birth_day  or  substr('aaazzzb','3','3')='zzz'  or  test_field_a='sss')))
```
###query expression(R expression)
After the release of version 3.0, query expression syntax is supported, which makes it easier for developers to use constants, fields, functions and aliases when conducting complex queries, and simplifies the complexity of json instructions. Currently, query expressions are divided into 4 types.
- ** constant：**The syntax is #xx, where xx is a constant. Single quotes will be added on both sides of the constant during parsing.
- **field：**The syntax is #&xx, where xx is the field name. The field should be a field defined in the entity class, or a database function field, such as current_date
- **function：**The syntax is #$xx(yy,zz,...), xx is the function name, yy, zz, etc. are parameters. The syntax follows the syntax of database functions. It can be nested and the function name can be customized.
- **alias：**The syntax is #...@xx, xx is an alias, which is used to give an alias to constants, fields and functions. It has the same meaning as the alias attribute in the JSRuleCrudField
### view
A view is a SQL statement that can be implemented through the view attribute in the @JSRuleTable annotation on the entity class. It is usually used in application scenarios where one entity class maps multiple tables and multiple columns. When the view attribute in the @JSRuleTable annotation is not empty, it means that the current entity class is a view class. At this time, the name attribute defines the alias of the view instead of the name of the table.
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
From the above example, you can see that view is actually a SQL statement. The "?" symbol is used in the "view" attribute, which indicates that the query conditions are uncertain. At this time, you need to declare "vp" in the json script for Replace the condition represented by the "?" symbol.
- **Note:** The alias of the field in the "view" attribute must correspond to the java field, such as "cname" and "name2" above.
Next, let’s use a simple example to see how view is used.
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
- **viewParams：**The alias is vp, map type, key is the name of the view, value is the condition to be queried, value can be an "R" expression, and the array size needs to be equal to the number of ? symbols
The parsed sql is
```
select json_test_category.id as "Category-id" ,cname as "name1" ,name2 as "name2"  from  json_test_category , (select v.pid,c.name as cname,v.detail as name2 from json_test_category c,json_test_category_detail v where c.id=v.pid and length(v.name) = length('kkk') and v.id = '4') view_test where   json_test_category.id=view_test.pid
```
### subquery
Regarding subqueries, you can first understand JSRuleToPointer and JSRulePointer objects. The JSRuleToPointer object indicates that the query conditions need to be connected to a certain point to complete. This point is the JSRulePointer object. The JSRulePointer object represents a point. This point can be an entity class, or the result set of a subquery, that is, the result after executing the get plug-in, or a view, so it has the following three attributes
- **className：**This attribute is the name of an entity class. It will eventually be converted into the name of a table. It is not a result set.
- **action：**The name of the action, it will get a SQL statement parsed by the action, so this action should have already been executed. If it is just to generate SQL, the execute attribute in this get plug-in should be set to false to avoid redundant query operations.
- ** view：**The name of the view, that is, the name attribute in the @JSRuleTable annotation. The "view" attribute can point to the dynamic view defined in the current "action" or to the static view on the entity class.
Let’s look at a complex json example to see how view, join, and union are used together.
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
The parsed sql is
```
(select zs_test.id as "ZsTestPO-id" from zs_test left join (select id from zs_test_son1_son1) zs_test_son1_son1 on zs_test.test_field in (select id as "id" from zs_test ) or zs_test_son1_son1.id in (select id from zs_test_son1_son1) left join (select * from zs_test_son1 where oh_no=substr('kkk','0','3') and id like '%1%') suibian on zs_test.id=suibian.zs_test_id where zs_test.test_field in (select id as "id" from zs_test ) or zs_test_son1_son1.id in (select id from zs_test_son1_son1) ) union all (select id as "id" from zs_test ) union all (select id from zs_test_son1_son1)
```
- **Specific instructions: **With the example of the above view, there is a to attribute in the matches (alias where) attribute. The type of this attribute is JSRuleToPointer. When you open this object, you can see that there are many conditional attributes similar to the matches object. Take the in attribute as an example to illustrate. The type corresponding to the LinkedHashMap value is JSRulePointer, and the key is the field name, as follows
```
"to":{
        "in":{
        "ZsTestPO.test_field":{"action":"poAction"},
        "ZsTestPO.id":{"view":"view.ZsTestView"},
        "view.ZSTestUpdateSon.id":{"view":"view.ZSTestSonSonView"}
      }
}
```
The parsed sql is
```
zs_test.test_field in  (select test_field as "sum_test_field"  from  zs_test )  or zs_test.id in  (select zs_test_id from zs_test_son1 where oh_no=substr('kkk','0','3') and id like '%1%')  or zs_test_son1_son1.id in  (select id from zs_test_son1_son1) 
```
The subquery is the sql statement generated after the execution of poAction and is embedded into the current sql statement. You can understand the use of the built-in plug-in through the comparison of json script and sql.
****
**Summary: **The explanation about the query basically ends here. The usage of unions can be understood by combining the description of the parameters and the subquery mentioned in this article.
## Configuration instructions
### Parsed sql
This article mainly talks about the configuration of springboot application files and the corresponding java class edi.rule.config.JSRuleProperties
### example
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
application-mysql.yml
```
edi:
  rule:
    database: mysql
```
#### illustrate
application-mysql.yml will overwrite the existing configuration of application.yml
- **locations：**Used to set the root path of the entity class that maps the database table. The entity class can also be extended through the extension class JSRuleDefaultExtend. Since version 3.2.4, multiple paths are allowed to be set. If there are the same class names under multiple root paths, then When using json, you need to use the fully qualified name of the java class
- **processor：**Used to set the subclass of JSRuleDefaultExtend. The configuration of this attribute can also be replaced by adding @Component annotation to the subclass.
- **database：**The currently supported databases are postgresql, mysql, oracle, and kingbase. You can select the corresponding database type. The default is mysql.
- **mybatis：**The path to the framework's built-in mybatis configuration file. The root path is located in the resources folder. Customizing the mybatis-config.xml file can overwrite the framework's built-in configuration file. You only need to place the custom file under the resources path and use this attribute to Just point to the location of this file. Please refer to the following for the file content.
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
It looks exactly like the mybatis configuration file we usually use, even including the pageHelper plug-in, but what is configured here is the mybatis built into the framework.
- **message：**Used to set the file path of internationalized messages. The json-script-rule framework has two built-in language files. The default is English and the value is /rule-message/english.properties. If you want to use Chinese, you can set this property Set to /rule-message/chinese.properties. If you want to customize the language, you can put the file with the suffix properties into the resources directory and configure the location of the file starting with the / symbol.
- **dataSourceBean：**Used to specify one of the data sources as the data source of the framework in the case of multiple data sources. The value is the name of the spring bean of the DataSource (supported since version 4.0)
- **open.superProp：**When creating an entity class, if the entity class has a parent class, whether to add the fields of the parent class to the cache. The default is false.
- **open.replenishColumns：**This configuration is only for the MySQL database. When inserting data in batches, check whether the number of columns in all data rows is consistent. Inconsistency may cause an error. When this attribute is true, the missing column will be automatically completed and set to null. The default is false. At this time, the developer needs to consider how to ensure that the number of columns is consistent.
- **close.engineController：**Whether to close the framework's built-in Controller. The default is false, which means the Controller is turned on. This property can be closed after customizing the Controller to avoid generating multiple Controllers that handle requests.
- **close.models：**Used to disable certain plug-ins. When you think some plug-ins do not need to be used, you can disable them through this attribute. Just fill in the fully qualified name of the plug-in class. Multiple plug-ins can be separated by commas. Overriding the isOwner method will cause this attribute to become invalid, as follows
```
edi:
  rule:
    close:
      models: test.business.rule.model.JSRuleGetCustomModel,edi.rule.model.JSRuleGet
```
- **config.dateFormat：**Used to configure the date format. All date format strings will be automatically converted to date types in the backend for processing, including inserting data, querying date ranges, and judging time ranges in assertions. When configuring multiple date formats, they need to be separated by commas. When this attribute is not configured, the default format is used. The system default date format is as follows
```
dateFormat: yyyy-MM-dd,yyyy-MM-dd HH:mm:ss
```
- **config.calculateScale：**The decimal places retained by default when performing division calculations using the calculate attribute of the add plug-in
- **config.calculateMode：**The default rounding scheme when using the calculate attribute of the add plug-in for division calculations. The default is rounding.
- **http.connectTimeout：**The framework has a built-in http calling method. The method is postJSBody of ZSHttp. The connection timeout is configured here.
- **http.readTimeout：**The framework has a built-in http calling method. The method is ZSHttp's postJSBody. The read timeout is configured here.
- **http.headSign：**After the security mode is turned on, the caller should carry the signature text when sending an http request. This attribute is the attribute name of the signature text in the request header. If the security.type attribute is not empty, the attribute cannot be empty at this time.
- **http.headArgs：**This attribute is the attribute name of the global parameter in the request header. It is a json string that can be converted into a JSRuleGlobalArgs object. The sign attribute in the JSRuleGlobalArgs object represents the signature text, which can replace http.headSign.
- **poi.excel.importFilterEmptyRow：**Whether to enable the filter when using the import plug-in, the default is false, the filter will only filter empty data rows
- **security(since 4.1)：**Security mode. Currently, there are two security modes built into the framework, one is sm2 and the other is rsa.
- **security.type(since 4.1)：**Security mode type. When this attribute exists, it indicates that the security mode is enabled. The value can only be sm2 or rsa. Please refer to the JSRuleSecurityEnum enumeration.
- **security.publicKey(since 4.1)：**Public key, valid when security.type turns on security mode. If either public key or private key is empty, the key pair will be automatically regenerated.
- **security.privateKey(since 4.1)：**Private key, valid when security.type turns on security mode. If either public key or private key is empty, the key pair will be automatically regenerated.
- **security.signKey(since 4.1)：**After turning on the safe mode, if you still need to configure the signature key in the background for salt processing, you can configure this attribute at this time. This attribute can be empty, but it is not recommended to be empty. The signature verification process will first encrypt the json string, then use the encrypted ciphertext to combine it with the signature key, and finally compare it with the signature text for verification.
###dynamic definition
Dynamic definition refers to a method that is temporarily defined in json during a request and can temporarily change the original framework configuration. You can refer to the JSRuleDefinition class to see what attributes can be defined. It is only valid during the current request.In addition to the viewParams and fieldsDesensitized attributes, a new config attribute is added here, which corresponds to the system configurable program parameters. More definable dynamic configurations may be added to this attribute in the future. For now, the following parameters will be explained.
- **@calculateScale：**The decimal places reserved when using the add plug-in and performing division operations, int type
- **@calculateMode：**The decimal place rounding scheme when using the add plug-in and performing division operations, the default is rounding
An example is shown below
```
"define":{
    "fd":{"imgUrl":{"regex":"[1-9]+","replaced":"!"}},
    "vp":{"CategoryView":["#$length(kkk)","4"]},
    "config":{"calculateScale":4,"calculateMode":4}
}
```
The fd above is the desensitization configuration (for details, please refer to the desensitization configuration chapter), vp is the view configuration (for details, please refer to the view configuration chapter), and config corresponds to edi.rule.config
## exports plugin
This plug-in is used to export data to excel or word. The word export function requires manually adding the com.deepoove poi-tl dependency in the pom. Because this dependency will cause a large number of jar packages to be introduced, it is not dependent by default. The export process is to first query the data through the get plug-in, and then pour the data into the specified template. The bottom layer of the exports plug-in uses SXSSFWorkbook technology, so it will not cause memory overflow problems. Compared with easy poi, this plug-in not only supports custom templates, but also has better performance than easy poi. After repeated testing on the same machine, the conclusion is that 100,000 pieces of data are exported. the exports plug-in takes between 2.1-2.6 seconds, while using easy poi takes about 4.588 seconds. The following is the exported json use case
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
                                        "where":{"eq":{"bao.ZsImport.name":["some one","some two"]}}
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
### Parameter Description
- **sheets：**An array representing the sheet objects to be exported
- **outFilePath：**Default export path, the value cannot be a directory, it should be an absolute path name including the file name. The alias is "out". If this attribute is not set, the path to export the excel file will be manually set through the client response pop-up window.
- **responseFileName：**The default file name in the pop-up box after the client responds. The alias is "rfn". When setting this attribute, the suffix of the file name should be included.
- **aPath：**The absolute path of the template. The alias is "aPath". If the path of the template is not set, the default template will be used to export data.
- **rPath：**Relative path to the template, the alias is "rPath". If the path to the template is not set, the default template will be used to export data.
- **cacheRow：**The alias is "cache", which indicates that the memory data will be flushed to the hard disk when the number of cached data lines is reached. When merging cells, if the total data rows are greater than this value, the cells will not be merged correctly. The default is SXSSFWorkbook.DEFAULT_WINDOW_SIZE 100.
#### sheet Parameter Description
- **action：**Non-array, you can call the action plugin through this attribute, you can only choose the get plugin
- **defaultValue：**The default value of the cell when the data is empty. The alias is "default". The / symbol is used by default to replace the empty value.
- **dateFormat：**If the params attribute contains strings that conform to the date format, this attribute will specify the format in which these strings should be displayed. The alias is "format" and the default is "yyyy-MM-dd HH:mm:ss"
- **mergeCell：**Whether to merge two adjacent column cells with the same value. The alias is "merge". When using this property, you need to pay attention to the setting of the cacheRow property in JSRuleExportExcel to ensure that the total number of exported data rows is not less than this value, otherwise unexpected results may occur. extraneous results
- **wrapText：**Whether to allow cell line wrapping through escape characters. The alias is "wrap" and the default is false. This attribute is usually used together with the lineBreakTag attribute.
- **lineBreakTag：**The escape character for newline operation. The alias is "lbt". It is valid when wrapText is true.
- **tsn：**tempSheetName, the name of the corresponding sheet in the excel template, alias "tsn", if not set, the corresponding template will be found according to the array sequence number of the sheet in json
- **nsn：- **newSheetName, the name of the sheet in the exported excel file, alias "nsn", if not set, it will be named according to sheet + number.
- **dataLine：**Alias ​​"start", the starting row number for data loading. The row number corresponds to the row number in excel. It indicates which row in the template starts loading table data. The default is the first row. This line is usually located in the first line below the template header. In this line, the developer needs to define the name of the column based on the results returned by the get plug-in, indicating which column of the database table a certain column in excel corresponds to, as follows
```
Header             Id                     name              birthDay
dataLine  entityName-fieldName      entityName-name         birthDay
```
Reference address：https://www.jianshu.com/p/caf0ad93dd65
- **containsHead：**Whether to export a header by default based on entity class information when no template is set, with the alias "ich", the default is true
- **params：**Dynamic parameters, variables enclosed by <> anywhere outside the data area in the current sheet will be replaced with the value in the parameter
- **data：**The data set to be exported. If this attribute and the get plug-in in the action exist at the same time, the data of this attribute will be used first for export.
- **fieldMappings：**Set which columns to export. The alias is "exports". This property is only meaningful when no template is set. The order of this property indicates the column order of the header when exporting the sheet.If not set, the export attribute in the entity class will be used to generate header columns (if export is empty, it will default to prefixed field names), and all columns will be exported at the same time. Whether these columns have values ​​is related to the field attribute fields being queried. If fields is empty, it means querying all fields. If there is a value, it should be a field with a class prefix (to avoid repeated fields in multiple tables), otherwise this column data will not be exported.If this attribute has been set, the columns to be exported will be determined based on the setting of this attribute. At this time, the key is the field alias and the value is the name of the corresponding column header. You can refer to the writing method of alias expression.
## uploads plugin
Property description
- **aPath：**absolutePath，The absolute path where the uploaded file is stored on the server
- **rPath：**relativePath，The relative path where the uploaded file is stored on the server
- **base64Data：**The data stream of the uploaded file, the file bytecode is encoded in base64
```
"uploads":{
    "base64Data":"UEsDBBQACAgIAFZ1CVUAA......
}
```
## imports plugin
The whole process of the import function is to first upload the excel file to the server, then read the excel file on the server, and finally insert the read data into the database through the add plug-in. Let's first look at a json use case for importing the plug-in.
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
- **aPath：**The absolute path of the excel file to be imported on the server
- **rPath：**The relative path of the excel file to be imported on the server
- **action：**Non-array, this attribute is used to call the add plug-in. When using the import function, only the add plug-in can be selected.
- **headLine：**The row number of the header in the sheet, alias "head", the row number corresponds to the row number of excel, the default is row 1, the column name needs to be configured in the template at this row
- **dataLine：**Indicates which line to start loading data from, the alias is "start", and the default is headLine+1
- **fieldMappings：**The mapping relationship between column names and java field names is aliased as "imports". "key" is the name of the column in the header "headLine" row of the sheet. Multiple "keys" are allowed to map the same java field. The value attribute is the name of the java field mapped by the column name. By default, the value of the imports annotation on the java field of the entity class is used as the "key", and the value attribute includes the java field name with the class name prefix and without the class name prefix. example:@JSRuleCrudField(imports= {"name","another name"})
**Tips: **test.business.po.bao.ZsImport is the fully qualified name of the class. The fully qualified name of the class is only allowed when there are multiple identical class names under the "locations" attribute path. Otherwise, it can only be used direct class name
## shunt plugin
The shunt plug-in is a very important plug-in. It can connect all action plug-ins together through certain logical judgments. You can understand it as an if else statement and use judgment to determine which actions instructions are ultimately executed. This means that through this This method can implement a complex recursive instruction. Let’s look at an example.
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
The above example looks very complicated, let’s break it down one by one.
Since the shunt plug-in judges the results after the execution of the previous action plug-in, at least one action should have been successfully executed and produced a result before the shunt plug-in is executed. The if judgment corresponding to the JSRuleAssert object has the following attributes:
- **ifAnd：**Indicates the first-level condition and the logical relationship between the conditions, and the value is only "and" or "or"
- **name：**The name of the action, indicating which action result the value is taken from
- **path：**jackson node path，Used to get the specified value from the result set. If node is an array, you can specify the value of a certain result by /adding numbers, such as nodeA/1/nodeB
- **value：**The default value when the result value is not obtained. Whether it is the value obtained through the name attribute, path attribute or value attribute, its type can only be String,int,Double,Long,Boolean,null
- **asserts：**Custom assertor, the value of the array is the name of the spring bean, the relationship between multiple assertors depends on the ifAnd attribute and the br attribute
- **usual：**The framework's built-in judgment function includes in, ni, gt, ge, lt, and le. When judging, you need to pay attention to the type of the value. If the value obtained by combining the name attribute and the path attribute is a double type, then only when the in attribute It will be true when 300.0 exists in the array, and 300 will be false. When the format of the string is the time format defined by the framework, time will be used for judgment. If the value cannot be obtained, null can be used for judgment. In addition, the usual object also provides name attributes, path attributes, and value attributes, which indicate that the values ​​obtained from these attributes are used as the judgment conditions instead of the attributes of the parent object. Otherwise, the values ​​of the parent object attributes are used as the judgment conditions. Finally, the logical relationship between multiple usual objects depends on the ifAnd attribute and the br attribute.
- **br：**Represents bracket, which is the same as the judgment condition logic in the get plug-in. If the ifAnd attribute is true, the logical relationship between all conditions at the first level is "and". The judgment condition can be wrapped using the br attribute. At this time, these The wrapped conditions will enter the second level. At this time, the logical relationship between conditions is reversed, and the logical relationships between conditions all become "or". By analogy, complex judgments can be realized.
**Tips:** The in, ni, gt, ge, lt, le and other attributes inside the "usual" object can be of a "map" type, and the name, path, and value attributes can still be declared in "map" to indicate use current property to get the value to be compared
**Note:** If the name and path attributes do not get a value, the default value will not be overwritten at this time, so "value" is 300, which is an Integer type rather than the double type returned by the database.
## Custom development
### illustrate
The content of this article is the core of the framework and a relatively important part. All built-in plug-ins are developed based on this development model. Custom development mainly includes custom models, custom plug-ins, custom database fields and functions. Custom models include custom "action", custom "result", and custom "controller". Custom models are beans that implement the IJSRuleCustom interface. Only one of these bean types can exist in the spring container. A custom plug-in is a code fragment encapsulated by developers based on their own business scenarios. It should have the characteristics of high cohesion and low coupling. It is the basic unit of script calling, so it requires a certain abstract design. Custom database fields and functions are mainly used to map database functions, such as substr(), current_date, sum(). Developers can customize the names of these functions, and undefined functions will not be available.
### Custom action
edi.rule.model.JSRuleAction，Custom "action" can be achieved by inheriting this class and registering this class as a spring bean. This "action" is like a warehouse. All plug-ins will be defined as fields in this warehouse class. The field type implements edi. A subclass of the rule.extend.interfaces.IJSRuleActionModel interface. The name of the field is the attribute of the plug-in when it is used. If you want to override the plug-in built into the framework, you only need to rewrite the fields in the plug-in parent class in the custom "action" That's it.
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
The above example rewrites the get, add, delete, and edit plug-ins of the parent class, so it is necessary to provide get and set methods. When using the get plug-in in json, it will directly enter the logic in the developer-defined JSRuleGetCustomModel class. In addition, developers can also define other plug-in types, such as MyTestCustom above, and add some available annotations to these plug-ins, such as @JSRuleModelPermit(join={"role1"}). In addition, since the framework is implemented by jackson For serialization, you can also use jackson annotations here, such as @JsonAlias({"del"}), which means that the plug-in adds an alias for del, such as @JsonIgnore annotation, which ignores the deserialization of a certain field. These annotations will not affect The effect of rewriting.
### Custom plugin
```
public class MyTestCustom implements IJSRuleActionModel<MyActions>{

	@JSRuleInject
	@JsonIgnore
	private JSRuleGlobalVariable variable;
	@JSRuleModelField
	public List<String> list;

	@Override
	public Object start(MyActions action) {
		return "result->";
	}
}
```
The above example is an example of a custom plug-in. The plug-in is actually a java class that implements the IJSRuleActionModel interface. Its processing logic is the start method. There are also some annotations that need to be used in custom development. **These annotations are only Takes effect on plug-in internal properties, allowing recursion**
- **@JSRuleInject：**This annotation is similar to spring's @Autowired annotation and is used for dependency injection. **When using this annotation, you usually need to match it with the @JsonIgnore annotation, which is used to ignore the deserialization operation of certain injected fields, because the fields identified by this annotation are only It will be valid only when it is empty**. The names attribute indicates obtaining the specified bean name collection, and the types attribute indicates obtaining the specified bean type collection. These two attributes are usually used to inject fields of collection types such as Collection, Map, and Array to obtain multiple beans. When used in non- The fields of the collection type will be obtained in order. When no bean is found and the attribute required is true, an error will be reported. Otherwise, as long as a bean is found, it will be injected.
**Note:** This annotation will report an error when injecting a bean with @Transactional annotation. Therefore, this annotation cannot be used to inject JSRuleService. In order to avoid nested loop calls, JSRuleService is not logically allowed to be injected in the model. If nesting is required To execute action, you can refer to the startActions method in the interface IJSRuleActionModel.
- **@JSRuleModelField：**This annotation is used for some subsequent processing after initialization of certain fields. The processing class needs to implement the IJSRuleModelFieldProcessor extended interface and register it as a spring bean. When this annotation is marked on a field of type IJSRuleModel, downward recursive processing will occur, and the effect of this annotation will be invalid. The type attribute indicates which class the field will be processed by. By default, no processing is performed.
- **@JSRuleCheck：**This annotation is used to verify the legality of the field value. If the field type is an IJSRuleModel type, then it will recursively check downwards.
**Note:** When any of the above three annotations mark a field of IJSRuleModel type, it will produce a downward recursion effect, and the fields in the IJSRuleModel type object will be recursively processed. If there is no mark, it will not be recursively processed.
**Tips:** The execution order of the above three annotations is @JSRuleInject, @JSRuleModelField, @JSRuleCheck
### Exception and internationalization handling
To handle exceptions, you only need to throw new JSRuleException(msg). If you need internationalized messages, you can use the read method of the JSRuleMessage object.
For example: throw new JSRuleException(JSRuleMessage.read(key))
Internationalization files can be specified by configuring the property edi.rule.config.message in "application", with resources as the root directory and starting with /
### Custom result
The custom result model needs to inherit the JSResult class. If you need to change the original field name, you can change it by rewriting the properties of the parent class and adding the @JsonProperty annotation. If you need to delete the original field, you can delete it by rewriting the properties of the parent class and adding the @JsonIgnore annotation. The example is as follows
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
The constructor is used to define the default values ​​​​of the internal properties of the result set model. Overriding the parent class properties means making changes to the parent class properties.
### Custom controller
The built-in controller of json-script-rule is JSRuleController, and its fixed access path is /json/script. When you need to change this path, you can customize a controller, as follows
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
The above example can also implement a custom controller by inheriting JSRuleController. At the same time, the built-in controller should also be closed. It can be closed by the following method
```
edi:
  rule:
    close：
      engineController: true
```
### Custom database functions and fields
#### Custom function
All extension classes and interfaces are located under the edi.rule.extend package. JSRuleDBFunctions is the top class of custom functions. The subclasses below it correspond to various database types, such as JSRuleMysqlFunctions, JSRuleOracleFunctions, etc., by inheriting these subclasses. Implement mapping relationships of database functions
```
public class JSRuleMysqlFunctions extends JSRuleDBFunctions{
	static {
		functions.put("abs", new JSRuleFunctionInfo("abs",1));
		functions.put("concat", new JSRuleFunctionInfo("concat"));
		functions.put("now", new JSRuleFunctionInfo("now",0));
	}
}
```
The above example shows how to define a function mapping, where key "abs" is the function name used in json, which can be any name, and the JSRuleFunctionInfo object is the actual function name and number of parameters. After the function mapping is defined, it can be used directly through R expressions in json, for example: #$now(), where "now" is the key in the above example. Undefined function cannot be used in json
#### Custom fields
There are some fields with non-function syntax in the database, such as current_date in mysql. These fields are different from table fields, and their results do not belong to the results of any table. Therefore, you must use another way to define this field. The framework provides JSRuleDBFields for the definition of these special fields. There are four subclasses below corresponding to four different database types. The following uses mysql as an example.
```
public class JSRuleMysqlSysFields extends JSRuleDBFields{
	static {
		fields.put("currentDate", "current_date");
		fields.put("currentTime", "current_time");
	}
}
```
It is not difficult to see from the above example that it is not much different from the custom function above.
### Custom assertor
When using the shunt plug-in, the JSRuleAssertUsual object built into the framework only provides some basic judgment functions, and some complex judgments cannot be implemented. Therefore, at this time, developers need to customize some assertion logic, such as the following example
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
The asserter needs to be registered as a spring bean like the custom model. The asserter can directly write the name of the bean when calling json, not the name of the java class.
### What you need to know about custom development
#### Get json parameters
Spring beans can be obtained in the following ways
```
@Autowired
private JSRuleArgsVessel v
```
The plug-in can be obtained in the following ways
```
@JSRuleInject
private JSRuleArgsVessel v
```
#### context object
Context object JSRuleContext, which provides the following parameters
- **properties：**Used to get spring application configuration properties
- **beanFactory：**spring bean factory
- **dataSource：**The data source ultimately used by the framework. The type is javax.sql.DataSource
- **dbInfo：**Database information used by the framework, including database name, "mapper" type, function type, etc.
- **security：**Information about the security model currently used by the framework
#### Extension interface
- **JSRuleDefaultExtend：**This extension class implements the IJSRequestHandler, IJSRuleRoleHandler and IJSRuleMappingsInfo interfaces. Therefore, by inheriting this class, you can customize the above three interface methods. The IJSRuleMappingsInfo interface is used to handle non-entity class mapping scenarios, such as mapping information from xml files or databases. Rather than java entity class. IJSRequestHandler is used to customize the initialization of the body object in json for each request. The IJSRuleRoleHandler interface is used to process the role information of the requester. Developers need to manually identify the role of the requester and return a set collection of the requester's role. This class needs to be registered as a spring bean through the annotation @Component or configure the edit.rule.processor attribute in the application, and enter the fully qualified name of the class, as follows
```
edi:
  rule:
    processor: test.myrule.JSRuleDBProcessor
```
- **IJSRuleModel：**The top-level interface for all object attributes in json. If your custom class is an attribute in json, then in theory it should implement this interface
- **IJSRuleModelFieldProcessor：**The processing class that implements this interface can process the annotation @JSRuleModelField, and the processing class can reassign the value after the field is deserialized. There can be multiple processing classes that implement this interface. Overriding the order method will implement sorting.
- **IJSRuleActionModel：**The top-level interface of all plug-ins. Custom plug-ins must implement this interface, and its start method is used to process action logic.
- **IJSRuleAssert：**The spring bean that implements this interface can be called in the shunt plug-in
- **IJSRulePostLaunch：**The class that implements this interface will be automatically called after the framework is loaded. Multiple implementation classes are allowed to exist. Overriding the order method will implement sorting.
- **IJSRuleRoleAuthority：**This interface is used to initialize framework permissions, and its internal method will return a "Map" collection, where "key" is the role name and "value" is the permission object. Permission objects include crud permissions and plug-in permissions. crud permissions are the association between tables and roles. The initialized crud permissions are restricted by the permit and roles attributes in the annotation @JSRuleTable
## Permissions
### illustrate
Since version 4.0, the framework introduces the concept of permissions, and the priority of permissions from strong to weak is as follows:
- **Plugin disabled：**Disabled plug-ins configured in "application" have the highest priority. Disabled plug-ins will be absolutely unavailable unless the plug-in overrides the check method.
- **Plug-in permissions：**Configure the association between the role and the plug-in by implementing the IJSRuleRoleAuthority interface. In addition, you can add plug-in permissions to the role by using the @JSRuleModelPermit annotation in the custom "action" object. Annotations can be annotated not only on the plug-in fields in the custom "action" object, but also on the plug-in classes. If both appear at the same time, the annotation attributes of the fields in the custom "action" object will be used first.Overriding the isOwner method will cause the plug-in permissions to become invalid.
- **Entity crud permissions：**After the plug-in permissions are verified, if the request is a CRUD type plug-in, the entity permissions will be verified next. The permit attribute in the @JSRuleTable annotation on the entity class is used to control which CRUD operations are allowed by the entity class. The default is allowed All operations.Overriding the checkCrudPermit method will cause the "crud" permission to become invalid.
- **Entity role permissions：**After verifying the entity crud permissions, the roles attribute in the @JSRuleTable annotation will be judged. It indicates which roles are restricted to the entity class, and other roles are not allowed to access.Overriding the checkCrudPermit method will cause the entity role permissions to become invalid.
- **Role Permissions：**Configure role permissions by implementing the IJSRuleRoleAuthority interface, which includes plug-in permissions and crud access permissions between roles and entity classes. This method is constrained by other permissions.Overriding the checkCrudPermit method will cause role permissions to become invalid.
### Permission initialization
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
In the above example, "admin" and "skk" are the names of the roles. The JSRuleRolePermit object corresponding to the role name indicates what permissions the role has, such as plug-in permissions and crud permissions for entities.
### Requester role initialization
You need to inherit the JSRuleDefaultExtend class or implement the IJSRuleRoleHandler interface and rewrite the corresponding "handle" method. In this method, the developer needs to return the role set collection of the current requester. In the end, the framework will determine whether the current user has permission to execute based on the initialized role information.
**Tips:** In addition, developers can customize the logic of plug-in permissions by overriding the isOwner method in the IJSRuleActionModel interface. Rewriting its "check" method can also customize the plug-in's checking logic. You can also customize the logic of crud permissions by rewriting the "checkCrudPermit" method in the IJSRuleCrudModel interface. In short, you can customize development by rewriting the methods of the parent class interface.
## RPC illustrate
since version 4.0, the framework begins to support rpc calls. Generally speaking, both the api layer and the provider layer need to introduce the package of the interface layer, so developers can introduce json-script-rule in the pom of the interface layer. After introduction, it can be added to the interface layer Define a method with the following code
```
public interface IJSRuleStartService {
    JSResult start(String body, Map<String,Object> globalArgs) throws BusinessException, JSRuleException;
}
```
BusinessException is a custom exception in the developer project. Taking dubbo as an example, the provider layer code is as follows
```
@DubboService
public class JSRuleStartService implements IJSRuleStartService {

    @Autowired
    protected JSRuleService service;

    @Override
    public TestJSResult start(String body,  JSRuleGlobalArgs args) throws BusinessException，JSRuleException{
        return service.start(body,args);
    }
}
```
TestJSResult is a subclass of JSResult and is a custom "result" model. JSRuleService is the engine built into the framework. Here you only need to call its "start" method. The api layer code is as follows
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
The parameters in startService are of type String, so the JSBody<A> body object in /start needs to be converted into String through the ZSRule.modelToJson method before it can be called. In addition, it is also shown in /start2 that you can also directly write a json string to send the request.
## Front-end development call instructions
The parameters passed by either party when calling json-script-rule are all json strings, so the front end only needs to piece together the json string when calling. Taking a simple json as an example, the following is the vue simulation request query name: Sam's json request string
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
From the above example, we can see that the json string is spliced ​​into a dataName variable, which represents the name of the person to be queried. It should be noted that the query condition is empty and null have different meanings. When it is null, do not write the condition field into the json string.
##Data desensitization
Starting from version 4.4, the framework adds a data desensitization function. The desensitization configuration needs to be completed in the entity class. The code is as follows
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
The results are as follows
email = zhangsan@163.com，z*******@163.com
password = abcd#1234，*********
mobile = 13212346789，132****6789
url = http://localhost:8080/api/json，http://*********************json
It is easy to understand the role of parameters by comparing the results. type=JSRuleDesensitizedEmail.class indicates that the desensitized type is a custom type. The JSRuleDesensitizedEmail here is the desensitized type built into the framework and does not require developers to implement it.
### Custom desensitization rule class
The custom data desensitization rule class needs to implement the IJSRuleDesensitizedInfo interface. Here, JSRuleDesensitizedEmail is quoted as an example. The code is as follows
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
The above example defines the startIndex and endToken attributes. The two attributes can be used together. The following is a detailed description of each parameter.
#### Parameter Description
- **replaced：**Replace this character when desensitizing, the default is * symbol
- **startIndex：**Counting from front to back indicates how many characters to retain. The remaining characters will be desensitized. The default is -1, indicating that this attribute is not used.
- **endIndex：**Calculate from the back to the front to indicate how many characters to retain. The remaining characters will be desensitized. The default is -1, which means this attribute is not used.
- **startToken：**Valid when startIndex does not exist.Starting from the first character, search for the string matching this attribute from front to back, record its position subscript and assign it to the startIndex attribute. The default is empty. When it is empty, the value of startIndex is the subscript of the first matching element.
- **endToken：**Valid when endIndex does not exist.Starting from the last character, search for the string matching this attribute from back to front, record its position and subscript and assign it to the endIndex attribute. The default is empty. When it is empty, the value of endIndex is the subscript of the last matching element.
- **isFirst：**Valid when startToken is valid.Match from front to back, whether it is the first matched string and record the subscript of the element. The default is true. If it is false, it means the element subscript of the last matched value from front to back.
- **isLast：**Valid when endToken is valid.Match from back to front, whether it is the first matched string and record the subscript of the element. The default is true. If it is false, it means the element subscript of the last matched value from back to front.
- **isKeepSt：**Valid when startToken is valid.Whether startToken should be desensitized, the default is false
- **isKeepEd：**Valid when endToken is valid.Whether endToken is desensitized, the default is false
- **regex：** Regular expression, the matched string will be replaced with the value of the "replaced" attribute. When both startIndex and endIndex exist, this attribute will be ignored, otherwise this attribute will be executed first.
#### Dynamic desensitization configuration
If you want more flexible configuration, you can define it dynamically, refer to the object JSRuleDefinition. For example, a field has been configured with desensitization rules in the entity class, but the field does not need to be desensitized during a certain request, or the desensitization rule needs to be redefined for the field during a certain request. , then at this time you only need to add the name of this field in the "fd" attribute under the JSRuleDefinition object, and redefine the desensitization rule for this field, as follows
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
In the above example, "fd" is a mapping set of fields and masking rules, and it is an alias. "imgUrl" is the field name, and the "value" corresponding to "key" is a JSRuleDesensitizedInfo object. The properties of this object will replace the annotation properties of the entity class. If you do not need to desensitize the "imgUrl" field, you can define it as null, as follows
```
"define":{
    "fd":{
	"imgUrl":null
    }
}
```
**Note:** The "key" in the "fd" attribute is the name of the java field, and aliases cannot be used here. In addition, if the "define" or "fd" attribute is null, the configuration of the default entity class