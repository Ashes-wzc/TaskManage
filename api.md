# 1. 用户数据
## 1.1 注册
+ *方法描述：* 用于管理员新增人员账号
+ *URL地址：* root-url.com/user/register
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
userName|姓名|String|NAN|是
userNum|工号|String|NAN|是
userPassword|密码|String|NAN|是
userType|工种|String|NAN|否
isAdmin|是否管理员|Boolen|默认为否|是

+ *返回结果：*
```
{
  registerStatus: Number, // 1:注册成功 2:用户已存在 3:注册失败
  errorMsg: String
}
```
## 1.2 登录
+ *方法描述：* 用于用户登录，包括管理员和普通用户
+ *URL地址：* root-url.com/user/login
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
userTag|姓名或工号|String|NAN|是
userPassword|密码|String|NAN|是

+ *返回结果：*
```
{
  loginStatus: Number,  // 1:登录成功 2:账号不存在 3:密码错误
  token: String
}
```
## 1.3 删除用户
+ *方法描述：* 用于管理员删除用户
+ *URL地址：* root-url.com/user/delete-user
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
userTag|姓名或工号|String|NAN|是

+ *返回结果：*
```
{
  deleteUserResult: Boolen
}
```
# 2. 项目和任务
## 2.1 项目
### 2.1.1 项目列表
+ *方法描述：* 数据库中存在的项目列表
+ *URL地址：* root-url.com/projects/list
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
userTag|姓名或工号|String|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  projectsList: [
    {
      projectId: Number,
      projectName: String,
      createDate: String,
      projectManager: String,
      targetDate: String
    },{
      ...
    }
  ]
}
```
### 2.1.2 添加项目
+ *方法描述：* 向数据库添加项目
+ *URL地址：* root-url.com/projects/add
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
userTag|姓名或工号|String|NAN|是
projectInfo|项目信息|Array|包括id，名称，开始结束时间，项目经理等|是

```
// 示例
{
  userTag: 206101111 / EvilGenius,
  projectsList: [
    projectId: Number,
    projectName: String,
    createDate: String,
    projectManager: String,
    targetDate: String
  ]
}
```

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  projectsList: [
    {
      projectId: Number,
      projectName: String,
      createDate: String,
      projectManager: String,
      targetDate: String
    },{
      ...
    }
  ]
}
```
### 2.1.3 删除项目
+ *方法描述：* 删除数据库中的项目
+ *URL地址：* root-url.com/projects/delete
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
userTag|姓名或工号|String|NAN|是
projectId|项目编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  projectsList: [
    {
      projectName: String,
      createDate: String,
      projectManager: String,
      TargetDate: String
    },{
      ...
    }
  ]
}
```
## 2.2 任务
### 2.2.1 任务列表
+ *方法描述：* 根据用户信息和项目编号获取数据库中的任务数据列表
+ *URL地址：* root-url.com/tasks/list
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
userTag|姓名或工号|String|NAN|是
projectId|项目编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  tasksList: [
    {
      taskId: Number,
      taskName: String,
      createDate: String,
      taskPrincipal: String,
      targetDate: String,
      taskStatus: Boolen
    },{
      ...
    }
  ]
}
```
### 2.2.2 添加任务
+ *方法描述：* 向数据库添加任务
+ *URL地址：* root-url.com/tasks/add
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
userTag|姓名或工号|String|NAN|是
projectId|项目编号|Number|NAN|是
taskInfo|任务信息|Array|包括id，名称，开始结束时间，负责人等|是

```
// 示例
{
  userTag: 206101111 / EvilGenius,
  projectId: Number,
  taskInfo: [
    taskId: Number,
    taskName: String,
    createDate: String,
    taskPrincipal: String,
    targetDate: String
  ]
}
```

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  tasksList: [
    {
      taskId: Number,
      taskName: String,
      createDate: String,
      taskPricipal: String,
      targetDate: String,
      taskStatus: Boolen
    },{
      ...
    }
  ]
}
```
### 2.2.3 删除任务
+ *方法描述：* 删除数据库中的任务
+ *URL地址：* root-url.com/tasks/delete
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
userTag|姓名或工号|String|NAN|是
projectId|项目编号|Number|NAN|是
taskId|任务编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  tasksList: [
    {
      taskId: Number,
      taskName: String,
      createDate: String,
      taskPricipal: String,
      targetDate: String,
      taskStatus: Boolen
    },{
      ...
    }
  ]
}
```
# 3. 软硬件标准
## 3.1 软件标准
+ *方法描述：* 获取数据库中对应项目的软件标准
+ *URL地址：* root-url.com/standard/software
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
projectId|项目编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  standardList: [
    {
      standardName: String,
      standardInfo: Array
    },{
      ...
    }
  ]
}
```
## 3.2 硬件标准
+ *方法描述：* 获取数据库中对应项目的硬件标准
+ *URL地址：* root-url.com/standard/hardware
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
projectId|项目编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  standardList: [
    {
      standardName: String,
      standardInfo: Array
    },{
      ...
    }
  ]
}
```
# 4. 测试条目
## 4.1 软件测试条目
+ *方法描述：* 获取数据库中对应项目的软件测试条目
+ *URL地址：* root-url.com/test/software
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
projectId|项目编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  testList: [
    {
      testName: String,
      testInfo: Array,
      passStatus: Boolen
    },{
      ...
    }
  ]
}
```
## 4.2 硬件测试条目
+ *方法描述：* 获取数据库中对应项目的硬件测试条目
+ *URL地址：* root-url.com/test/hardware
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
projectId|项目编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  testList: [
    {
      testName: String,
      testInfo: Array,
      passStatus: Boolen
    },{
      ...
    }
  ]
}
```
# 5. 文件系统
## 5.1 文件列表
+ *方法描述：* 获取数据库中对应项目的全部文件列表
+ *URL地址：* root-url.com/files/list
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
projectId|项目编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  filesList: [
    {
      fileId: Number,
      fileName: String,
      fileInfo: Array,
    },{
      ...
    }
  ]
}
```
## 5.2 上传文件
+ *方法描述：* 上传文件到数据库
+ *URL地址：* root-url.com/files/upload
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
projectId|项目编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  filesList: [
    {
      fileId: Number,
      fileName: String,
      fileInfo: Array,
    },{
      ...
    }
  ]
}
```
## 5.3 下载文件
+ *方法描述：* 获取下载文件Url
+ *URL地址：* root-url.com/files/download
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
projectId|项目编号|Number|NAN|是
fileId|文件编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  downloadUrl: String
}
```
## 5.4 删除文件
+ *方法描述：* 删除数据库中的文件
+ *URL地址：* root-url.com/files/delete
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
projectId|项目编号|Number|NAN|是
fileId|文件编号|Number|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  filesList: [
    {
      fileId: Number,
      fileName: String,
      fileInfo: Array,
    },{
      ...
    }
  ]
}
```
## 5.5 移动文件
+ *方法描述：* 移动文件的位置
+ *URL地址：* root-url.com/files/remove
+ *请求方式：* POST
+ *请求参数：*

字段 | 说明 | 类型 | 备注 | 是否必填
:---:|:--:|:---:|:---:|:---:
projectId|项目编号|Number|NAN|是
fileId|文件编号|Number|NAN|是
newDir|新文件位置|String|NAN|是

+ *返回结果：*
```
{
  requestResult: Boolen,
  requestMsg: String,
  filesList: [
    {
      fileId: Number,
      fileName: String,
      fileInfo: Array,
    },{
      ...
    }
  ]
}
```