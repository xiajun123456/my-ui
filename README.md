## 安装步骤 ##

	npm install         // 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8080
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

## mock ##

        //执行命令
        npm run mock
## 文件结构

>src  
>>assets  
>>>css  
>>>font  
>>>imgs  
>>>js  

>>components（重要）  
>>>base（基本组件）  
>>>common（公共组件）  
>>>common-business（公共业务模块）    
>>>pre-business（预结算业务模块）  
>>>prepaidFee-business（预收款业务模块）  
>>>system（项目管理及图谱模块）    

>>router(路由)  
>>store（vuex） 

>static  
>>const（常量存放目录主要server.js中存放后台地址）  
>>json（存放json配置文件）  
>>lib（存放插件源文件）
