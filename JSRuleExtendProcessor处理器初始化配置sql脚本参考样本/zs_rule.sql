INSERT INTO "zs_rule"("rule_name", "json") VALUES ('export', '{
        "name": "export",
        "actions": [
        	{
        		"name":"test_export",
        		"export":{
        			"word":{
        				"outFilePath":"D:/asddsa/laimi.docx",
						"fileName":"word导出一下试试",
						"relativePath":"/导出模板.docx",
						"data":{"suo":"联防大队","sBillNo":"no.11232","dCreatetime":"2020-10-21 10:11:11","sRepairexcuseDesc":"不知道啥原因"}
					},
					"excel":{
						"fileName":"excel导出一下试试",
						"absolutePath":"D:/jar/导出模板.xlsx",
						"sheets":[
							{
								"get": {
				        			"classes":["ZsImport"],
				        			"page":{"pageSize":0}
				        		},
								"template":"lanliya",
								"name":"sheetNameNo.1",
								"dataLine":5,
								"params":{"asd":"2020-10-20 10:10:10"}
							},{
								"get": {
				        			"classes":["ZsImport2"],
				        			"page":{"pageSize":0}
				        		},
								"name":"sheetNameNo.2",
								"dataLine":4,
								"params":{"asd":"2020-10-20 10:10:10"}
							}
						]
					}
				}
        	}
        ]
    }');
INSERT INTO "zs_rule"("rule_name", "json") VALUES ('function', '{
        "name": "function",
        "actions": [
        	{
                "name": "test_function",
                "define":{"viewParams":{"view.ZsTestView":["kkk","%1%"]},
                	"function":{
                    	"length":["name"],"concat":{"ZsTestPO.name":["#","vnvn","kook"]},
                    	"substr":{"ZsTestPO.name":["#","1","3"],"ZsTestPO.name@2asd":["#","1","2"],"view.ZsTestView.test_field":["#","1","3"],"ZsTestPO.test_field":["#","1","4"]}
                    }
                },
                "get": {
                	"classes":["ZsTestPO","view.ZsTestView"],
                	"andOr":"or",
                	"matches":{
                		"bracket":[
                			{"bracket":[{"in":{"substr->ZsTestPO.name":["qqq"]},"like":{"substr->ZsTestPO.name@2asd":["%x%","%p%"]}}]},
                			{"bracket":[{"equal":{"substr->view.ZsTestView.test_field":["zzz"],"view.ZsTestView.test_field":["sss"]}}]}
                		]
                	},
                    "fields": ["length->name","view.ZsTestView.test_field","substr->ZsTestPO.name","substr->ZsTestPO.name@2asd","substr->ZsTestPO.test_field"]
                }
            }
        ]
    }');
INSERT INTO "zs_rule"("rule_name", "json") VALUES ('import', '{
        "name": "import",
        "actions": [
            {
                "name": "test_import",
                "imports": {
                    "excel": {
                    	"aPath":"D:/response.xlsx",
                    	"add": {
                    		"class":"ZsImport2",
				            "required":["name"]
				        },
                        "sheets": [
                            {
                                "head": 3,
                                "start": 5,
                                "add": {
                                	"class":"ZsImport",
				                    "uuid": ["id"],
				            		"required":["id","name"]
				                }
                            },{
                            	"head": 2,
                                "start": 4
                            }
                        ]
                    }
                }
            }
        ]
    }');
INSERT INTO "zs_rule"("rule_name", "json") VALUES ('relation', '{
        "name": "relation",
        "actions": [
            {
                "name": "test_relation",
                "define":{"viewParams":{"view.ZsTestView":["kkk","%1%"]}},
                "get": {
                	"classes":["view.ZsTestView","ZsTestPO","ZsTestSon2"],
                	"relations": {"type":"left","main":"ZsTestPO"},
                	"isGroupShow":false,"page":{"pageSize":0},
                    "matches":{"notEqual":{"ZsTestPO.test_field":["null"],
                        "birthDay":["2021-10-08 00:00:01"],"remark":[null]},
                        "bracket":[
                            {"bracket":[
                                    {"gt":{"ZsTestPO.bonus":"19"},"lteq":{"ZsTestPO.salary":"10.5"}}
                                ]
                            },
                            {"in":{"ZsTestPO.name":["qqq","xxx"]}},
                            {"bracket":[
                                    {"like":{"view.ZsTestView.ohNo":["%v%"],"view.ZsTestView.test_field":["%zzz%"]}}
                                ]
                            }
                        ]
                    },
                    "fields": [
                        "ZsTestSon2.zs_test_son1_id2",
                        "view.ZsTestView.test_field",
                        "ZsTestPO.test_field",
                        "birthDay",
                        "create_date",
                        "ZsTestSon2.ohYes",
                        "ZsTestPO.id"
                    ]
                }
            }
        ]
    }');
INSERT INTO "zs_rule"("rule_name", "json") VALUES ('temp', '{
        "name": "temp",
        "actions": [
        	{
        		"name": "asd",
        		"get": {
        			"classNames":["ZsTestPO"],
        			"fields":[],"page":{"pageSize":10000},"isGroupShow":true
        		}
        	},{
        		"name": "dsa",
        		"get": {
        			"classNames":["ZsTestPO"],
        			"fields":[],"page":{"pageSize":10000},"isGroupShow":true
        		}
        	}
        ]
    }');
INSERT INTO "zs_rule"("rule_name", "json") VALUES ('view', '{
        "name": "view",
        "actions": [
        	{
        		"name": "poAction",
        		"get": {
        			"classes":["ZsTestPO"],
        			"isExecute":false,
        			"fields":["test_field"]
        		}
        	},
        	{
                "define":{
                	"viewParams":{"view.ZsTestView":["kkk","%1%"]},
                	"viewFields":{"view.ZsTestView":[],"view.ZSTestUpdateSon":[],"view.neibu.ZsTestPOView":["name"]}
                },
                "name": "test_view_left",
                "get": {
                	"classes":["view.ZSTestUpdateSon","ZsTestPO","view.ZsTestView"],
                	"relations": {"type":"left","main":"ZsTestPO"},
                	"andOr":"or",
                	"fields":[],
                	"matches":{
                		"in":{"ZsTestPO.name":"view->view.neibu.ZsTestPOView",
                		"ZsTestPO.test_field":"action->poAction"}
                	},
                	"order":{"ZsTestPO.id":"asc"},
                    "page":{"pageNum":"1","pageSize":"10"}
                }
            }
        ]
    }');
INSERT INTO "zs_rule"("rule_name", "json") VALUES ('addtest', '{
		"name": "addtest",
		"actions":[
			{
				"name":"addaction",
				"add":{
					"className":"ZsTestPO",
					"uuid":["id","remark"],
					"defaults":{"test_field":"nnnnnn"},
					"required":["test_field","create_date"],
					"ternary":["test_field==oiu?tiu:ppp"],
					"calculate":["salary=-<salary>+0.5*(-10*10)","bonus=<bonus>-100"],
					"datas":[
						{"name":"ccc","salary":22.50,"bonus":"110","birthDay":"2021/10/08","create_date":"1922-10-08"},
						{"name":"mmm","salary":"11.50","bonus":120,"birthDay":"2021-02-03","create_date":"1922-02-03"}]
				}
			}
		]
	}');
INSERT INTO "zs_rule"("rule_name", "json") VALUES ('group', '{
        "name": "group",
        "actions": [
        	{
                "name": "test_group",
                "define":{"viewParams":{"view.ZsTestView":["kkk","%3%"]},
                	"function":{
                		"sum":["sumSalary"],"substr":{"view.neibu.ZsTestPOView.test_field":["#","1","2"],"view.ZsTestView.test_field":["#","1","3"],
                		"view.neibu.ZsTestPOView.test_field@qweewq":["#","1","8"],"view.ZsTestView.test_field@asddsa":["#","1","5"]},
                		"decode":{"view.neibu.ZsTestPOView.name":["#","xxx","!!!!!!"]},"avg":["view.neibu.ZsTestPOView.qian"]
                	}
                },
                "get": {
                	"classes":["view.ZsTestView","view.neibu.ZsTestPOView"],
                	"relations": {"type":"left","main":"view.neibu.ZsTestPOView"},
                    "fields": ["view.ZsTestView.test_field","view.neibu.ZsTestPOView.test_field","substr->view.neibu.ZsTestPOView.test_field@qweewq","sum->sumSalary","avg->view.neibu.ZsTestPOView.qian"],
                    "order":{"view.neibu.ZsTestPOView.test_field":"asc","substr->view.neibu.ZsTestPOView.test_field":"desc"},
                    "group":{
                    	"by":["substr->view.neibu.ZsTestPOView.test_field@qweewq","view.neibu.ZsTestPOView.test_field","view.ZsTestView.test_field"],
                    	"having":{"in":{"view.neibu.ZsTestPOView.test_field":["tyu"]},"bracket":[{"equal":{"substr->view.ZsTestView.test_field@asddsa":["zzz","sss"]}}]},
                    	"relation":"and"
                    }
                }
            }
        ]
    }');
